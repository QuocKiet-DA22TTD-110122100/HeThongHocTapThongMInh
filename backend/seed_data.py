"""Script để thêm dữ liệu mẫu vào database"""
from app import app, db
from models import Subject, Lesson, Exercise
import json

def seed_database():
    with app.app_context():
        # Kiểm tra xem đã có dữ liệu chưa
        if Lesson.query.count() > 0:
            print("Database đã có dữ liệu. Bỏ qua seed.")
            return
        
        # Lấy môn Toán
        math_subject = Subject.query.filter_by(name='Toán học').first()
        if not math_subject:
            print("Không tìm thấy môn Toán học")
            return
        
        # Thêm bài học mẫu
        lessons_data = [
            {
                'title': 'Hàm số bậc nhất',
                'content': '''Hàm số bậc nhất là hàm số có dạng y = ax + b (a ≠ 0)

Tính chất:
- Đồ thị là đường thẳng
- Hệ số a là hệ số góc
- b là tung độ gốc

Ví dụ: y = 2x + 3
- Hệ số góc: a = 2
- Tung độ gốc: b = 3''',
                'difficulty_level': 1,
                'order_index': 1
            },
            {
                'title': 'Phương trình bậc hai',
                'content': '''Phương trình bậc hai có dạng: ax² + bx + c = 0 (a ≠ 0)

Công thức nghiệm:
- Δ = b² - 4ac
- Nếu Δ > 0: 2 nghiệm phân biệt
- Nếu Δ = 0: 1 nghiệm kép
- Nếu Δ < 0: Vô nghiệm

Công thức: x = (-b ± √Δ) / 2a''',
                'difficulty_level': 2,
                'order_index': 2
            },
            {
                'title': 'Đạo hàm cơ bản',
                'content': '''Đạo hàm của hàm số y = f(x) tại điểm x₀:
f'(x₀) = lim[h→0] [f(x₀+h) - f(x₀)] / h

Công thức cơ bản:
- (c)' = 0
- (x^n)' = n.x^(n-1)
- (sin x)' = cos x
- (cos x)' = -sin x
- (e^x)' = e^x
- (ln x)' = 1/x''',
                'difficulty_level': 3,
                'order_index': 3
            }
        ]
        
        for lesson_data in lessons_data:
            lesson = Lesson(
                subject_id=math_subject.id,
                **lesson_data
            )
            db.session.add(lesson)
            db.session.flush()
            
            # Thêm bài tập cho mỗi bài học
            if lesson.title == 'Hàm số bậc nhất':
                exercises = [
                    {
                        'question': 'Cho hàm số y = 3x - 2. Hệ số góc của đồ thị hàm số là?',
                        'question_type': 'multiple_choice',
                        'options': json.dumps(['2', '3', '-2', '1']),
                        'correct_answer': '3',
                        'explanation': 'Hệ số góc là hệ số của x, tức là a = 3',
                        'difficulty': 1,
                        'points': 10
                    },
                    {
                        'question': 'Đồ thị hàm số y = -2x + 5 cắt trục tung tại điểm có tung độ bằng?',
                        'question_type': 'multiple_choice',
                        'options': json.dumps(['-2', '5', '2', '-5']),
                        'correct_answer': '5',
                        'explanation': 'Tung độ gốc là b = 5',
                        'difficulty': 1,
                        'points': 10
                    }
                ]
            elif lesson.title == 'Phương trình bậc hai':
                exercises = [
                    {
                        'question': 'Phương trình x² - 5x + 6 = 0 có bao nhiêu nghiệm?',
                        'question_type': 'multiple_choice',
                        'options': json.dumps(['0', '1', '2', 'Vô số']),
                        'correct_answer': '2',
                        'explanation': 'Δ = 25 - 24 = 1 > 0, nên có 2 nghiệm phân biệt',
                        'difficulty': 2,
                        'points': 10
                    },
                    {
                        'question': 'Tổng hai nghiệm của phương trình x² - 7x + 10 = 0 là?',
                        'question_type': 'multiple_choice',
                        'options': json.dumps(['7', '-7', '10', '-10']),
                        'correct_answer': '7',
                        'explanation': 'Theo định lý Vi-et: x₁ + x₂ = -b/a = 7',
                        'difficulty': 2,
                        'points': 10
                    }
                ]
            else:  # Đạo hàm
                exercises = [
                    {
                        'question': 'Đạo hàm của hàm số y = x³ là?',
                        'question_type': 'multiple_choice',
                        'options': json.dumps(['3x²', 'x²', '3x', 'x³']),
                        'correct_answer': '3x²',
                        'explanation': '(x^n)\' = n.x^(n-1), nên (x³)\' = 3x²',
                        'difficulty': 3,
                        'points': 10
                    },
                    {
                        'question': 'Đạo hàm của hàm số y = 2x² + 3x - 1 tại x = 1 là?',
                        'question_type': 'multiple_choice',
                        'options': json.dumps(['7', '5', '4', '3']),
                        'correct_answer': '7',
                        'explanation': 'y\' = 4x + 3, tại x = 1: y\'(1) = 4(1) + 3 = 7',
                        'difficulty': 3,
                        'points': 10
                    }
                ]
            
            for ex_data in exercises:
                exercise = Exercise(
                    lesson_id=lesson.id,
                    **ex_data
                )
                db.session.add(exercise)
        
        db.session.commit()
        print("Đã thêm dữ liệu mẫu thành công!")

if __name__ == '__main__':
    seed_database()
