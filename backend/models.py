from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    full_name = db.Column(db.String(120))
    grade = db.Column(db.Integer)  # Lớp 10, 11, 12
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    assessments = db.relationship('Assessment', backref='user', lazy=True)
    progress = db.relationship('Progress', backref='user', lazy=True)
    exercise_submissions = db.relationship('ExerciseSubmission', backref='user', lazy=True)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Subject(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)  # Toán, Lý, Hóa, etc.
    description = db.Column(db.Text)
    
    lessons = db.relationship('Lesson', backref='subject', lazy=True)

class Lesson(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    subject_id = db.Column(db.Integer, db.ForeignKey('subject.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text)
    difficulty_level = db.Column(db.Integer)  # 1-5
    prerequisites = db.Column(db.Text)  # JSON list of lesson IDs
    order_index = db.Column(db.Integer)
    
    exercises = db.relationship('Exercise', backref='lesson', lazy=True)

class Exercise(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    lesson_id = db.Column(db.Integer, db.ForeignKey('lesson.id'), nullable=False)
    question = db.Column(db.Text, nullable=False)
    question_type = db.Column(db.String(50))  # multiple_choice, essay, true_false
    options = db.Column(db.Text)  # JSON for multiple choice
    correct_answer = db.Column(db.Text)
    explanation = db.Column(db.Text)
    difficulty = db.Column(db.Integer)  # 1-5
    points = db.Column(db.Integer, default=10)

class Assessment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    subject_id = db.Column(db.Integer, db.ForeignKey('subject.id'), nullable=False)
    score = db.Column(db.Float)
    level = db.Column(db.String(50))  # beginner, intermediate, advanced
    completed_at = db.Column(db.DateTime, default=datetime.utcnow)
    results = db.Column(db.Text)  # JSON detailed results

class Progress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    lesson_id = db.Column(db.Integer, db.ForeignKey('lesson.id'), nullable=False)
    status = db.Column(db.String(50))  # not_started, in_progress, completed
    completion_percentage = db.Column(db.Float, default=0.0)
    time_spent = db.Column(db.Integer, default=0)  # minutes
    last_accessed = db.Column(db.DateTime, default=datetime.utcnow)

class ExerciseSubmission(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercise.id'), nullable=False)
    answer = db.Column(db.Text)
    is_correct = db.Column(db.Boolean)
    score = db.Column(db.Float)
    submitted_at = db.Column(db.DateTime, default=datetime.utcnow)
    time_taken = db.Column(db.Integer)  # seconds

class ChatHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    response = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
