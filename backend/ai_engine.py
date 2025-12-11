import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LinearRegression
import json

class AIEngine:
    def __init__(self):
        self.difficulty_model = None
        self.prediction_model = None
    
    def assess_initial_level(self, assessment_results):
        """Đánh giá năng lực ban đầu dựa trên kết quả bài test"""
        total_questions = len(assessment_results)
        correct_answers = sum(1 for r in assessment_results if r['is_correct'])
        score = (correct_answers / total_questions) * 100
        
        # Phân tích theo độ khó
        difficulty_scores = {}
        for result in assessment_results:
            diff = result['difficulty']
            if diff not in difficulty_scores:
                difficulty_scores[diff] = {'correct': 0, 'total': 0}
            difficulty_scores[diff]['total'] += 1
            if result['is_correct']:
                difficulty_scores[diff]['correct'] += 1
        
        # Xác định level
        if score >= 80:
            level = 'advanced'
        elif score >= 60:
            level = 'intermediate'
        else:
            level = 'beginner'
        
        return {
            'score': score,
            'level': level,
            'difficulty_breakdown': difficulty_scores,
            'strengths': self._identify_strengths(assessment_results),
            'weaknesses': self._identify_weaknesses(assessment_results)
        }
    
    def recommend_lessons(self, user_level, completed_lessons, subject_id):
        """Đề xuất bài học phù hợp với năng lực học sinh"""
        # Logic đề xuất dựa trên level và tiến độ
        difficulty_map = {
            'beginner': [1, 2],
            'intermediate': [2, 3, 4],
            'advanced': [4, 5]
        }
        
        recommended_difficulties = difficulty_map.get(user_level, [2, 3])
        
        return {
            'recommended_difficulties': recommended_difficulties,
            'next_lesson_priority': 'high' if len(completed_lessons) < 5 else 'medium'
        }
    
    def analyze_strengths_weaknesses(self, submissions):
        """Phân tích điểm mạnh và điểm yếu"""
        if not submissions:
            return {'strengths': [], 'weaknesses': [], 'overall_performance': 0}
        
        topic_performance = {}
        for sub in submissions:
            topic = sub.get('topic', 'general')
            if topic not in topic_performance:
                topic_performance[topic] = {'correct': 0, 'total': 0}
            topic_performance[topic]['total'] += 1
            if sub.get('is_correct'):
                topic_performance[topic]['correct'] += 1
        
        strengths = []
        weaknesses = []
        
        for topic, perf in topic_performance.items():
            accuracy = perf['correct'] / perf['total'] if perf['total'] > 0 else 0
            if accuracy >= 0.75:
                strengths.append({'topic': topic, 'accuracy': accuracy * 100})
            elif accuracy < 0.5:
                weaknesses.append({'topic': topic, 'accuracy': accuracy * 100})
        
        overall = sum(s['is_correct'] for s in submissions) / len(submissions) * 100
        
        return {
            'strengths': sorted(strengths, key=lambda x: x['accuracy'], reverse=True),
            'weaknesses': sorted(weaknesses, key=lambda x: x['accuracy']),
            'overall_performance': overall
        }
    
    def predict_performance(self, user_history):
        """Dự đoán kết quả học tập trong tương lai"""
        if len(user_history) < 3:
            return {
                'predicted_score': None,
                'confidence': 'low',
                'message': 'Cần thêm dữ liệu để dự đoán chính xác'
            }
        
        # Tính trend từ lịch sử
        scores = [h['score'] for h in user_history[-10:]]
        trend = np.polyfit(range(len(scores)), scores, 1)[0]
        
        # Dự đoán điểm số tiếp theo
        recent_avg = np.mean(scores[-5:])
        predicted_score = min(100, max(0, recent_avg + trend * 2))
        
        # Đánh giá xu hướng
        if trend > 2:
            trend_text = 'Tiến bộ tốt'
        elif trend > 0:
            trend_text = 'Tiến bộ ổn định'
        elif trend > -2:
            trend_text = 'Cần cải thiện'
        else:
            trend_text = 'Cần chú ý'
        
        return {
            'predicted_score': round(predicted_score, 2),
            'confidence': 'high' if len(scores) >= 7 else 'medium',
            'trend': trend_text,
            'recommendation': self._get_recommendation(predicted_score, trend)
        }
    
    def _identify_strengths(self, results):
        """Xác định điểm mạnh"""
        topic_scores = {}
        for r in results:
            topic = r.get('topic', 'general')
            if topic not in topic_scores:
                topic_scores[topic] = []
            topic_scores[topic].append(1 if r['is_correct'] else 0)
        
        strengths = []
        for topic, scores in topic_scores.items():
            avg = np.mean(scores)
            if avg >= 0.75:
                strengths.append(topic)
        
        return strengths
    
    def _identify_weaknesses(self, results):
        """Xác định điểm yếu"""
        topic_scores = {}
        for r in results:
            topic = r.get('topic', 'general')
            if topic not in topic_scores:
                topic_scores[topic] = []
            topic_scores[topic].append(1 if r['is_correct'] else 0)
        
        weaknesses = []
        for topic, scores in topic_scores.items():
            avg = np.mean(scores)
            if avg < 0.5:
                weaknesses.append(topic)
        
        return weaknesses
    
    def _get_recommendation(self, predicted_score, trend):
        """Đưa ra khuyến nghị dựa trên dự đoán"""
        if predicted_score >= 80:
            return 'Tiếp tục duy trì phong độ và thử thách bản thân với bài khó hơn'
        elif predicted_score >= 60:
            return 'Tập trung ôn tập các phần yếu và làm thêm bài tập'
        else:
            return 'Cần học lại kiến thức cơ bản và tìm sự hỗ trợ từ giáo viên'
