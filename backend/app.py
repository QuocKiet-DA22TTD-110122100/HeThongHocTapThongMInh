from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime
import json

from config import Config
from models import db, User, Subject, Lesson, Exercise, Assessment, Progress, ExerciseSubmission, ChatHistory
from ai_engine import AIEngine
from chatbot import Chatbot

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
db.init_app(app)
jwt = JWTManager(app)

ai_engine = AIEngine()
chatbot = Chatbot()

# Khởi tạo database
with app.app_context():
    db.create_all()
    # Thêm dữ liệu mẫu nếu chưa có
    if Subject.query.count() == 0:
        subjects = [
            Subject(name='Toán học', description='Môn Toán THPT'),
            Subject(name='Vật lý', description='Môn Vật lý THPT'),
            Subject(name='Hóa học', description='Môn Hóa học THPT'),
            Subject(name='Sinh học', description='Môn Sinh học THPT'),
            Subject(name='Ngữ văn', description='Môn Ngữ văn THPT'),
            Subject(name='Tiếng Anh', description='Môn Tiếng Anh THPT')
        ]
        db.session.add_all(subjects)
        db.session.commit()

# Authentication Routes
@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json
    
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'error': 'Tên đăng nhập đã tồn tại'}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email đã được sử dụng'}), 400
    
    user = User(
        username=data['username'],
        email=data['email'],
        full_name=data.get('full_name'),
        grade=data.get('grade', 10)
    )
    user.set_password(data['password'])
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'message': 'Đăng ký thành công', 'user_id': user.id}), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    
    if not user or not user.check_password(data['password']):
        return jsonify({'error': 'Tên đăng nhập hoặc mật khẩu không đúng'}), 401
    
    access_token = create_access_token(identity=user.id)
    return jsonify({
        'access_token': access_token,
        'user': {
            'id': user.id,
            'username': user.username,
            'full_name': user.full_name,
            'grade': user.grade
        }
    })

# Assessment Routes
@app.route('/api/assessment/start', methods=['POST'])
@jwt_required()
def start_assessment():
    user_id = get_jwt_identity()
    data = request.json
    subject_id = data.get('subject_id')
    
    # Lấy câu hỏi đánh giá (mix các mức độ)
    exercises = Exercise.query.join(Lesson).filter(
        Lesson.subject_id == subject_id
    ).order_by(Exercise.difficulty).limit(20).all()
    
    questions = [{
        'id': ex.id,
        'question': ex.question,
        'type': ex.question_type,
        'options': json.loads(ex.options) if ex.options else None,
        'difficulty': ex.difficulty
    } for ex in exercises]
    
    return jsonify({'questions': questions})

@app.route('/api/assessment/submit', methods=['POST'])
@jwt_required()
def submit_assessment():
    user_id = get_jwt_identity()
    data = request.json
    
    results = []
    for answer in data['answers']:
        exercise = Exercise.query.get(answer['exercise_id'])
        is_correct = str(answer['answer']).strip().lower() == str(exercise.correct_answer).strip().lower()
        
        results.append({
            'exercise_id': exercise.id,
            'is_correct': is_correct,
            'difficulty': exercise.difficulty,
            'topic': answer.get('topic', 'general')
        })
    
    # Phân tích kết quả bằng AI
    analysis = ai_engine.assess_initial_level(results)
    
    # Lưu kết quả đánh giá
    assessment = Assessment(
        user_id=user_id,
        subject_id=data['subject_id'],
        score=analysis['score'],
        level=analysis['level'],
        results=json.dumps(analysis)
    )
    db.session.add(assessment)
    db.session.commit()
    
    return jsonify(analysis)

# Lesson Routes
@app.route('/api/lessons/recommended', methods=['GET'])
@jwt_required()
def get_recommended_lessons():
    user_id = get_jwt_identity()
    subject_id = request.args.get('subject_id', type=int)
    
    # Lấy đánh giá gần nhất
    assessment = Assessment.query.filter_by(
        user_id=user_id,
        subject_id=subject_id
    ).order_by(Assessment.completed_at.desc()).first()
    
    user_level = assessment.level if assessment else 'beginner'
    
    # Lấy bài học đã hoàn thành
    completed = Progress.query.filter_by(
        user_id=user_id,
        status='completed'
    ).all()
    completed_ids = [p.lesson_id for p in completed]
    
    # Đề xuất bài học
    recommendations = ai_engine.recommend_lessons(user_level, completed_ids, subject_id)
    
    # Lấy bài học phù hợp
    lessons = Lesson.query.filter(
        Lesson.subject_id == subject_id,
        Lesson.difficulty_level.in_(recommendations['recommended_difficulties']),
        ~Lesson.id.in_(completed_ids)
    ).limit(10).all()
    
    return jsonify({
        'lessons': [{
            'id': l.id,
            'title': l.title,
            'difficulty': l.difficulty_level,
            'content': l.content
        } for l in lessons],
        'user_level': user_level
    })

@app.route('/api/lessons/<int:lesson_id>', methods=['GET'])
@jwt_required()
def get_lesson(lesson_id):
    lesson = Lesson.query.get_or_404(lesson_id)
    exercises = Exercise.query.filter_by(lesson_id=lesson_id).all()
    
    return jsonify({
        'lesson': {
            'id': lesson.id,
            'title': lesson.title,
            'content': lesson.content,
            'difficulty': lesson.difficulty_level
        },
        'exercises': [{
            'id': ex.id,
            'question': ex.question,
            'type': ex.question_type,
            'options': json.loads(ex.options) if ex.options else None,
            'points': ex.points
        } for ex in exercises]
    })

# Progress Routes
@app.route('/api/progress', methods=['GET'])
@jwt_required()
def get_progress():
    user_id = get_jwt_identity()
    subject_id = request.args.get('subject_id', type=int)
    
    query = Progress.query.filter_by(user_id=user_id)
    if subject_id:
        query = query.join(Lesson).filter(Lesson.subject_id == subject_id)
    
    progress_records = query.all()
    
    total_lessons = Lesson.query.filter_by(subject_id=subject_id).count() if subject_id else 0
    completed = sum(1 for p in progress_records if p.status == 'completed')
    
    return jsonify({
        'progress': [{
            'lesson_id': p.lesson_id,
            'lesson_title': p.lesson.title if p.lesson else None,
            'status': p.status,
            'completion': p.completion_percentage,
            'time_spent': p.time_spent,
            'last_accessed': p.last_accessed.isoformat()
        } for p in progress_records],
        'summary': {
            'total_lessons': total_lessons,
            'completed': completed,
            'in_progress': sum(1 for p in progress_records if p.status == 'in_progress'),
            'completion_rate': (completed / total_lessons * 100) if total_lessons > 0 else 0
        }
    })

@app.route('/api/progress/update', methods=['POST'])
@jwt_required()
def update_progress():
    user_id = get_jwt_identity()
    data = request.json
    
    progress = Progress.query.filter_by(
        user_id=user_id,
        lesson_id=data['lesson_id']
    ).first()
    
    if not progress:
        progress = Progress(user_id=user_id, lesson_id=data['lesson_id'])
        db.session.add(progress)
    
    progress.status = data.get('status', progress.status)
    progress.completion_percentage = data.get('completion', progress.completion_percentage)
    progress.time_spent += data.get('time_spent', 0)
    progress.last_accessed = datetime.utcnow()
    
    db.session.commit()
    
    return jsonify({'message': 'Cập nhật tiến độ thành công'})

# Exercise Routes
@app.route('/api/exercises/submit', methods=['POST'])
@jwt_required()
def submit_exercise():
    user_id = get_jwt_identity()
    data = request.json
    
    exercise = Exercise.query.get_or_404(data['exercise_id'])
    is_correct = str(data['answer']).strip().lower() == str(exercise.correct_answer).strip().lower()
    score = exercise.points if is_correct else 0
    
    submission = ExerciseSubmission(
        user_id=user_id,
        exercise_id=exercise.id,
        answer=data['answer'],
        is_correct=is_correct,
        score=score,
        time_taken=data.get('time_taken', 0)
    )
    db.session.add(submission)
    db.session.commit()
    
    return jsonify({
        'is_correct': is_correct,
        'score': score,
        'explanation': exercise.explanation if not is_correct else None,
        'correct_answer': exercise.correct_answer if not is_correct else None
    })

# Analytics Routes
@app.route('/api/analytics/strengths', methods=['GET'])
@jwt_required()
def get_strengths_weaknesses():
    user_id = get_jwt_identity()
    
    submissions = ExerciseSubmission.query.filter_by(user_id=user_id).all()
    submission_data = [{
        'is_correct': s.is_correct,
        'topic': s.exercise.lesson.title if s.exercise and s.exercise.lesson else 'general',
        'difficulty': s.exercise.difficulty if s.exercise else 1
    } for s in submissions]
    
    analysis = ai_engine.analyze_strengths_weaknesses(submission_data)
    
    return jsonify(analysis)

# Prediction Routes
@app.route('/api/prediction/results', methods=['GET'])
@jwt_required()
def predict_results():
    user_id = get_jwt_identity()
    subject_id = request.args.get('subject_id', type=int)
    
    # Lấy lịch sử điểm
    assessments = Assessment.query.filter_by(
        user_id=user_id,
        subject_id=subject_id
    ).order_by(Assessment.completed_at).all()
    
    history = [{'score': a.score, 'date': a.completed_at.isoformat()} for a in assessments]
    
    prediction = ai_engine.predict_performance(history)
    
    return jsonify(prediction)

# Chatbot Routes
@app.route('/api/chatbot/ask', methods=['POST'])
@jwt_required()
def ask_chatbot():
    user_id = get_jwt_identity()
    data = request.json
    
    response = chatbot.get_response(data['message'])
    
    # Lưu lịch sử chat
    chat = ChatHistory(
        user_id=user_id,
        message=data['message'],
        response=response['response']
    )
    db.session.add(chat)
    db.session.commit()
    
    return jsonify(response)

@app.route('/api/chatbot/history', methods=['GET'])
@jwt_required()
def get_chat_history():
    user_id = get_jwt_identity()
    limit = request.args.get('limit', 50, type=int)
    
    history = ChatHistory.query.filter_by(user_id=user_id).order_by(
        ChatHistory.created_at.desc()
    ).limit(limit).all()
    
    return jsonify({
        'history': [{
            'message': h.message,
            'response': h.response,
            'timestamp': h.created_at.isoformat()
        } for h in reversed(history)]
    })

# Subject Routes
@app.route('/api/subjects', methods=['GET'])
def get_subjects():
    subjects = Subject.query.all()
    return jsonify({
        'subjects': [{
            'id': s.id,
            'name': s.name,
            'description': s.description
        } for s in subjects]
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
