import re
from datetime import datetime

class Chatbot:
    def __init__(self):
        self.context = {}
        self.knowledge_base = self._build_knowledge_base()
    
    def _build_knowledge_base(self):
        """Xây dựng cơ sở kiến thức cho chatbot"""
        return {
            'greeting': {
                'patterns': ['xin chào', 'chào', 'hello', 'hi'],
                'responses': [
                    'Xin chào! Tôi là trợ lý học tập AI. Tôi có thể giúp gì cho bạn?',
                    'Chào bạn! Hãy hỏi tôi bất kỳ câu hỏi nào về bài học nhé!'
                ]
            },
            'help': {
                'patterns': ['giúp', 'help', 'hướng dẫn', 'làm sao'],
                'responses': [
                    'Tôi có thể giúp bạn:\n- Giải thích bài học\n- Hướng dẫn làm bài tập\n- Đề xuất tài liệu học tập\n- Trả lời câu hỏi về kiến thức'
                ]
            },
            'math': {
                'patterns': ['toán', 'tính', 'phương trình', 'đạo hàm', 'tích phân'],
                'responses': [
                    'Bạn cần giúp về môn Toán à? Hãy nói cụ thể vấn đề bạn gặp phải nhé!'
                ]
            },
            'physics': {
                'patterns': ['lý', 'vật lý', 'lực', 'chuyển động', 'điện'],
                'responses': [
                    'Vật lý có thể khó nhưng rất thú vị! Bạn cần giải thích phần nào?'
                ]
            },
            'chemistry': {
                'patterns': ['hóa', 'hóa học', 'phản ứng', 'nguyên tố'],
                'responses': [
                    'Hóa học là môn học về sự biến đổi! Tôi có thể giúp bạn hiểu rõ hơn.'
                ]
            },
            'study_tips': {
                'patterns': ['học như thế nào', 'cách học', 'mẹo học', 'học tốt'],
                'responses': [
                    'Một số mẹo học tập hiệu quả:\n1. Chia nhỏ kiến thức\n2. Học đều đặn mỗi ngày\n3. Làm bài tập thực hành\n4. Ôn tập thường xuyên\n5. Hỏi khi chưa hiểu'
                ]
            },
            'motivation': {
                'patterns': ['mệt', 'chán', 'không muốn học', 'động lực'],
                'responses': [
                    'Học tập đôi khi mệt mỏi, nhưng đừng bỏ cuộc! Mỗi bước nhỏ đều là tiến bộ. Hãy nghỉ ngơi và quay lại khi sẵn sàng nhé! 💪'
                ]
            }
        }
    
    def get_response(self, user_message, user_context=None):
        """Xử lý tin nhắn và trả về phản hồi"""
        message_lower = user_message.lower()
        
        # Kiểm tra các pattern trong knowledge base
        for category, data in self.knowledge_base.items():
            for pattern in data['patterns']:
                if pattern in message_lower:
                    response = data['responses'][0]
                    return {
                        'response': response,
                        'category': category,
                        'confidence': 0.9
                    }
        
        # Xử lý câu hỏi cụ thể về bài học
        if 'bài' in message_lower and any(word in message_lower for word in ['là gì', 'giải thích', 'nghĩa']):
            return {
                'response': 'Để giải thích chi tiết, bạn có thể cho tôi biết cụ thể bài học nào không? Hoặc bạn có thể xem lại nội dung bài học trong phần học tập.',
                'category': 'explanation',
                'confidence': 0.7
            }
        
        # Xử lý câu hỏi về bài tập
        if any(word in message_lower for word in ['bài tập', 'làm bài', 'giải']):
            return {
                'response': 'Tôi có thể hướng dẫn bạn cách làm bài tập. Hãy cho tôi biết bài tập cụ thể hoặc phần nào bạn đang gặp khó khăn nhé!',
                'category': 'exercise_help',
                'confidence': 0.8
            }
        
        # Phản hồi mặc định
        return {
            'response': 'Tôi chưa hiểu rõ câu hỏi của bạn. Bạn có thể diễn đạt lại hoặc hỏi về:\n- Giải thích bài học\n- Hướng dẫn bài tập\n- Mẹo học tập\n- Tài liệu tham khảo',
            'category': 'unknown',
            'confidence': 0.3
        }
    
    def get_lesson_explanation(self, lesson_content, question):
        """Giải thích nội dung bài học dựa trên câu hỏi"""
        # Đơn giản hóa: trả về phần liên quan
        return {
            'explanation': f'Dựa trên nội dung bài học, đây là phần liên quan đến câu hỏi của bạn...',
            'related_topics': [],
            'practice_exercises': []
        }
    
    def suggest_resources(self, topic, difficulty_level):
        """Đề xuất tài liệu học tập"""
        resources = {
            'beginner': [
                'Video bài giảng cơ bản',
                'Bài tập trắc nghiệm dễ',
                'Tóm tắt kiến thức'
            ],
            'intermediate': [
                'Bài giảng nâng cao',
                'Bài tập vận dụng',
                'Đề thi thử'
            ],
            'advanced': [
                'Chuyên đề심화',
                'Đề thi HSG',
                'Tài liệu Olympic'
            ]
        }
        
        return {
            'resources': resources.get(difficulty_level, resources['intermediate']),
            'topic': topic
        }
