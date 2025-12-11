# Nâng Cấp AI với OpenAI API

## 🚀 Hướng Dẫn Tích Hợp OpenAI GPT

Nếu bạn muốn chatbot thông minh hơn, có thể tích hợp OpenAI API.

## 📋 Yêu Cầu

1. Tài khoản OpenAI: https://platform.openai.com/
2. API Key từ OpenAI
3. Cài đặt thư viện: `pip install openai`

## 🔧 Bước 1: Cài Đặt

### Thêm vào `backend/requirements.txt`:
```
openai==1.3.0
python-dotenv==1.0.0
```

### Cài đặt:
```bash
cd backend
pip install openai python-dotenv
```

## 🔑 Bước 2: Cấu Hình API Key

### Tạo file `.env` trong thư mục `backend`:
```env
OPENAI_API_KEY=your-api-key-here
```

### Cập nhật `backend/config.py`:
```python
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # ... existing config ...
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    USE_OPENAI_CHATBOT = os.getenv('USE_OPENAI_CHATBOT', 'false').lower() == 'true'
```

## 💬 Bước 3: Nâng Cấp Chatbot

### Tạo file `backend/openai_chatbot.py`:
```python
import openai
from config import Config

openai.api_key = Config.OPENAI_API_KEY

class OpenAIChatbot:
    def __init__(self):
        self.conversation_history = []
        self.system_prompt = """
        Bạn là trợ lý học tập AI thông minh cho học sinh THPT Việt Nam.
        
        Nhiệm vụ của bạn:
        - Giải thích kiến thức một cách dễ hiểu
        - Hướng dẫn làm bài tập
        - Động viên và khuyến khích học sinh
        - Đưa ra mẹo học tập hiệu quả
        - Trả lời bằng tiếng Việt
        
        Phong cách:
        - Thân thiện, gần gũi
        - Giải thích rõ ràng, có ví dụ
        - Khuyến khích tư duy độc lập
        - Không đưa ra đáp án trực tiếp, mà hướng dẫn cách giải
        """
    
    def get_response(self, user_message, user_context=None):
        """Lấy response từ OpenAI GPT"""
        try:
            # Thêm context nếu có
            messages = [{"role": "system", "content": self.system_prompt}]
            
            # Thêm lịch sử hội thoại (giới hạn 10 tin nhắn gần nhất)
            messages.extend(self.conversation_history[-10:])
            
            # Thêm tin nhắn mới
            messages.append({"role": "user", "content": user_message})
            
            # Gọi OpenAI API
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=messages,
                temperature=0.7,
                max_tokens=500,
                top_p=1,
                frequency_penalty=0,
                presence_penalty=0
            )
            
            assistant_message = response.choices[0].message.content
            
            # Lưu vào lịch sử
            self.conversation_history.append({"role": "user", "content": user_message})
            self.conversation_history.append({"role": "assistant", "content": assistant_message})
            
            return {
                'response': assistant_message,
                'category': 'openai',
                'confidence': 0.95,
                'model': 'gpt-3.5-turbo'
            }
            
        except Exception as e:
            print(f"OpenAI Error: {e}")
            return {
                'response': 'Xin lỗi, tôi đang gặp sự cố. Vui lòng thử lại sau.',
                'category': 'error',
                'confidence': 0,
                'error': str(e)
            }
    
    def clear_history(self):
        """Xóa lịch sử hội thoại"""
        self.conversation_history = []
    
    def get_subject_help(self, subject, topic, question):
        """Hỗ trợ cụ thể cho môn học"""
        prompt = f"""
        Môn học: {subject}
        Chủ đề: {topic}
        Câu hỏi: {question}
        
        Hãy giải thích chi tiết và đưa ra ví dụ minh họa.
        """
        return self.get_response(prompt)
    
    def explain_concept(self, concept, difficulty_level='intermediate'):
        """Giải thích khái niệm"""
        levels = {
            'beginner': 'rất đơn giản, dễ hiểu cho người mới bắt đầu',
            'intermediate': 'vừa phải, có ví dụ cụ thể',
            'advanced': 'chuyên sâu, chi tiết'
        }
        
        prompt = f"""
        Hãy giải thích khái niệm "{concept}" một cách {levels.get(difficulty_level, 'vừa phải')}.
        Bao gồm:
        1. Định nghĩa
        2. Ví dụ thực tế
        3. Ứng dụng
        4. Lưu ý quan trọng
        """
        return self.get_response(prompt)
    
    def generate_practice_questions(self, topic, difficulty, count=5):
        """Tạo câu hỏi luyện tập"""
        prompt = f"""
        Hãy tạo {count} câu hỏi luyện tập về chủ đề "{topic}" 
        với độ khó {difficulty}/5.
        
        Format:
        Câu 1: [câu hỏi]
        Đáp án: [đáp án]
        Giải thích: [giải thích ngắn gọn]
        """
        return self.get_response(prompt)
```

## 🔄 Bước 4: Cập Nhật Backend API

### Sửa `backend/app.py`:
```python
from chatbot import Chatbot
from openai_chatbot import OpenAIChatbot
from config import Config

# Khởi tạo chatbot
if Config.USE_OPENAI_CHATBOT:
    chatbot = OpenAIChatbot()
    print("✅ Using OpenAI Chatbot")
else:
    chatbot = Chatbot()
    print("✅ Using Rule-based Chatbot")

# Route chatbot không thay đổi, vẫn dùng như cũ
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

# Thêm routes mới cho OpenAI features
@app.route('/api/chatbot/explain', methods=['POST'])
@jwt_required()
def explain_concept():
    data = request.json
    if isinstance(chatbot, OpenAIChatbot):
        response = chatbot.explain_concept(
            data['concept'],
            data.get('difficulty_level', 'intermediate')
        )
        return jsonify(response)
    return jsonify({'error': 'OpenAI not enabled'}), 400

@app.route('/api/chatbot/practice', methods=['POST'])
@jwt_required()
def generate_practice():
    data = request.json
    if isinstance(chatbot, OpenAIChatbot):
        response = chatbot.generate_practice_questions(
            data['topic'],
            data.get('difficulty', 3),
            data.get('count', 5)
        )
        return jsonify(response)
    return jsonify({'error': 'OpenAI not enabled'}), 400
```

## 🎨 Bước 5: Cập Nhật Frontend (Optional)

### Thêm toggle để chọn AI mode trong Chatbot page:
```javascript
// frontend/src/pages/Chatbot.js
const [aiMode, setAiMode] = useState('basic'); // 'basic' or 'openai'

// Thêm toggle button
<Box sx={{ mb: 2 }}>
  <Chip
    label="Basic AI"
    onClick={() => setAiMode('basic')}
    color={aiMode === 'basic' ? 'primary' : 'default'}
  />
  <Chip
    label="OpenAI GPT"
    onClick={() => setAiMode('openai')}
    color={aiMode === 'openai' ? 'primary' : 'default'}
  />
</Box>
```

## 💰 Chi Phí

### OpenAI Pricing (GPT-3.5-turbo):
- Input: $0.0015 / 1K tokens
- Output: $0.002 / 1K tokens

### Ước tính:
- 1 cuộc hội thoại (10 tin nhắn): ~$0.01-0.02
- 1000 học sinh/tháng: ~$10-20

## ⚡ Tối Ưu Chi Phí

1. **Cache responses** - Lưu câu trả lời phổ biến
2. **Rate limiting** - Giới hạn số request/user
3. **Fallback** - Dùng rule-based khi không cần GPT
4. **Token optimization** - Giới hạn max_tokens
5. **Batch processing** - Xử lý nhiều request cùng lúc

## 🔒 Bảo Mật

1. **Không commit API key** - Dùng .env file
2. **Rate limiting** - Tránh abuse
3. **Input validation** - Kiểm tra input
4. **Error handling** - Xử lý lỗi gracefully
5. **Monitoring** - Theo dõi usage

## 📊 So Sánh

| Feature | Rule-based | OpenAI GPT |
|---------|-----------|------------|
| Độ thông minh | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Chi phí | Miễn phí | ~$10-20/tháng |
| Tốc độ | Rất nhanh | Nhanh |
| Tùy chỉnh | Cao | Trung bình |
| Hiểu ngữ cảnh | Hạn chế | Rất tốt |
| Đa ngôn ngữ | Cần code | Tự động |

## 🎯 Khuyến Nghị

### Dùng Rule-based khi:
- ✅ Ngân sách hạn chế
- ✅ Câu hỏi đơn giản, lặp lại
- ✅ Cần kiểm soát hoàn toàn responses
- ✅ Offline/local deployment

### Dùng OpenAI khi:
- ✅ Cần chatbot thông minh
- ✅ Câu hỏi phức tạp, đa dạng
- ✅ Có ngân sách
- ✅ Cần giải thích chi tiết

## 🔄 Hybrid Approach (Khuyến nghị)

Kết hợp cả hai:
```python
def smart_chatbot(message):
    # Dùng rule-based cho câu hỏi đơn giản
    if is_simple_question(message):
        return rule_based_response(message)
    
    # Dùng OpenAI cho câu hỏi phức tạp
    else:
        return openai_response(message)
```

## 📚 Tài Liệu

- OpenAI API Docs: https://platform.openai.com/docs
- Best Practices: https://platform.openai.com/docs/guides/best-practices
- Pricing: https://openai.com/pricing

## ✅ Checklist

- [ ] Tạo tài khoản OpenAI
- [ ] Lấy API key
- [ ] Cài đặt openai package
- [ ] Tạo .env file
- [ ] Cập nhật config.py
- [ ] Tạo openai_chatbot.py
- [ ] Cập nhật app.py
- [ ] Test chatbot
- [ ] Monitor usage
- [ ] Optimize costs

## 🎉 Kết Luận

Với OpenAI GPT, chatbot sẽ:
- Thông minh hơn nhiều
- Hiểu ngữ cảnh tốt hơn
- Giải thích chi tiết hơn
- Tự nhiên hơn trong giao tiếp

Nhưng cần cân nhắc chi phí và bảo mật!
