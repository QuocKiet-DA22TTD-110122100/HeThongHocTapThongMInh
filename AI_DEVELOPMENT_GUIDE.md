# Hướng Dẫn Phát Triển AI Theo Ý Bạn

## 📋 Tổng Quan

File này hướng dẫn bạn cách phát triển và tùy chỉnh các tính năng AI trong hệ thống theo ý muốn của bạn.

## 🎯 AI Đã Có Sẵn

### 1. **AI Engine** (`backend/ai_engine.py`)
- Đánh giá năng lực học sinh
- Đề xuất bài học thích ứng
- Phân tích điểm mạnh/yếu
- Dự đoán kết quả học tập

### 2. **Chatbot** (`backend/chatbot.py`)
- Trả lời câu hỏi cơ bản
- Hỗ trợ học tập
- Pattern matching

## 🚀 Các Hướng Phát Triển AI

### Hướng 1: Nâng Cấp Chatbot với LLM

#### Option A: OpenAI GPT
```python
# backend/ai_chatbot_openai.py
import openai
from config import Config

class OpenAIChatbot:
    def __init__(self):
        openai.api_key = Config.OPENAI_API_KEY
    
    def chat(self, message, context=None):
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Bạn là trợ lý học tập AI"},
                {"role": "user", "content": message}
            ]
        )
        return response.choices[0].message.content
```

**Cài đặt:**
```bash
pip install openai
```

**API Key:** https://platform.openai.com/api-keys

#### Option B: Google Gemini (Free)
```python
# backend/ai_chatbot_gemini.py
import google.generativeai as genai

class GeminiChatbot:
    def __init__(self):
        genai.configure(api_key='YOUR_API_KEY')
        self.model = genai.GenerativeModel('gemini-pro')
    
    def chat(self, message):
        response = self.model.generate_content(message)
        return response.text
```

**Cài đặt:**
```bash
pip install google-generativeai
```

**API Key:** https://makersuite.google.com/app/apikey

#### Option C: Local LLM (Ollama)
```python
# backend/ai_chatbot_local.py
import requests

class LocalLLMChatbot:
    def __init__(self):
        self.api_url = "http://localhost:11434/api/generate"
    
    def chat(self, message):
        response = requests.post(self.api_url, json={
            "model": "llama2",
            "prompt": message
        })
        return response.json()['response']
```

**Cài đặt Ollama:**
```bash
# Download từ: https://ollama.ai
ollama pull llama2
ollama serve
```

### Hướng 2: Cải Thiện Đề Xuất Bài Học

#### Sử dụng Collaborative Filtering
```python
# backend/ai_recommendation.py
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

class SmartRecommendation:
    def __init__(self):
        self.user_item_matrix = None
    
    def build_matrix(self, user_progress_data):
        """Xây dựng ma trận user-lesson"""
        # user_progress_data: {user_id: {lesson_id: score}}
        users = list(user_progress_data.keys())
        lessons = set()
        for user_data in user_progress_data.values():
            lessons.update(user_data.keys())
        
        lessons = sorted(list(lessons))
        matrix = np.zeros((len(users), len(lessons)))
        
        for i, user in enumerate(users):
            for j, lesson in enumerate(lessons):
                matrix[i][j] = user_progress_data[user].get(lesson, 0)
        
        return matrix, users, lessons
    
    def recommend_for_user(self, user_id, top_n=5):
        """Đề xuất bài học dựa trên học sinh tương tự"""
        # Tính similarity giữa users
        user_similarity = cosine_similarity(self.user_item_matrix)
        
        # Tìm users tương tự
        similar_users = np.argsort(user_similarity[user_id])[-10:]
        
        # Đề xuất lessons mà similar users đã học tốt
        recommendations = []
        # ... logic đề xuất
        
        return recommendations
```

#### Sử dụng Content-Based Filtering
```python
# backend/ai_content_based.py
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class ContentBasedRecommendation:
    def __init__(self):
        self.vectorizer = TfidfVectorizer()
    
    def recommend_similar_lessons(self, lesson_id, lessons_data):
        """Đề xuất bài học tương tự dựa trên nội dung"""
        # Vectorize lesson content
        lesson_contents = [l['content'] for l in lessons_data]
        tfidf_matrix = self.vectorizer.fit_transform(lesson_contents)
        
        # Tính similarity
        similarity = cosine_similarity(tfidf_matrix[lesson_id], tfidf_matrix)
        
        # Lấy top similar lessons
        similar_indices = similarity.argsort()[0][-6:-1]
        
        return [lessons_data[i] for i in similar_indices]
```

### Hướng 3: Dự Đoán Kết Quả Nâng Cao

#### Sử dụng Machine Learning Models
```python
# backend/ai_prediction_ml.py
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import numpy as np

class MLPredictor:
    def __init__(self):
        self.model = RandomForestRegressor(n_estimators=100)
    
    def prepare_features(self, user_data):
        """Chuẩn bị features từ dữ liệu học sinh"""
        features = []
        
        # Feature engineering
        features.append(user_data['avg_score'])
        features.append(user_data['study_time'])
        features.append(user_data['completion_rate'])
        features.append(user_data['exercise_accuracy'])
        features.append(user_data['days_active'])
        features.append(user_data['lessons_completed'])
        
        return np.array(features).reshape(1, -1)
    
    def train(self, training_data):
        """Train model với dữ liệu lịch sử"""
        X = [self.prepare_features(d) for d in training_data]
        y = [d['final_score'] for d in training_data]
        
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
        self.model.fit(X_train, y_train)
        
        score = self.model.score(X_test, y_test)
        return score
    
    def predict(self, user_data):
        """Dự đoán điểm số tương lai"""
        features = self.prepare_features(user_data)
        prediction = self.model.predict(features)[0]
        
        # Feature importance
        importance = self.model.feature_importances_
        
        return {
            'predicted_score': prediction,
            'confidence': 'high',
            'important_factors': self._get_important_factors(importance)
        }
    
    def _get_important_factors(self, importance):
        feature_names = ['avg_score', 'study_time', 'completion_rate', 
                        'exercise_accuracy', 'days_active', 'lessons_completed']
        factors = sorted(zip(feature_names, importance), key=lambda x: x[1], reverse=True)
        return factors[:3]
```

#### Sử dụng Deep Learning (Neural Network)
```python
# backend/ai_prediction_dl.py
import tensorflow as tf
from tensorflow import keras

class DeepLearningPredictor:
    def __init__(self):
        self.model = self._build_model()
    
    def _build_model(self):
        """Xây dựng neural network"""
        model = keras.Sequential([
            keras.layers.Dense(64, activation='relu', input_shape=(10,)),
            keras.layers.Dropout(0.2),
            keras.layers.Dense(32, activation='relu'),
            keras.layers.Dropout(0.2),
            keras.layers.Dense(16, activation='relu'),
            keras.layers.Dense(1)
        ])
        
        model.compile(
            optimizer='adam',
            loss='mse',
            metrics=['mae']
        )
        
        return model
    
    def train(self, X_train, y_train, epochs=50):
        """Train neural network"""
        history = self.model.fit(
            X_train, y_train,
            epochs=epochs,
            validation_split=0.2,
            verbose=0
        )
        return history
    
    def predict(self, features):
        """Dự đoán với neural network"""
        prediction = self.model.predict(features)[0][0]
        return prediction
```

### Hướng 4: Phân Tích Học Tập Nâng Cao

#### Clustering Học Sinh
```python
# backend/ai_clustering.py
from sklearn.cluster import KMeans
import numpy as np

class StudentClustering:
    def __init__(self, n_clusters=5):
        self.model = KMeans(n_clusters=n_clusters)
        self.cluster_profiles = {}
    
    def cluster_students(self, students_data):
        """Phân nhóm học sinh theo đặc điểm"""
        # Chuẩn bị features
        features = []
        for student in students_data:
            features.append([
                student['avg_score'],
                student['study_time'],
                student['completion_rate'],
                student['exercise_accuracy']
            ])
        
        # Clustering
        clusters = self.model.fit_predict(features)
        
        # Phân tích từng cluster
        for i in range(self.model.n_clusters):
            cluster_students = [s for j, s in enumerate(students_data) if clusters[j] == i]
            self.cluster_profiles[i] = self._analyze_cluster(cluster_students)
        
        return clusters, self.cluster_profiles
    
    def _analyze_cluster(self, students):
        """Phân tích đặc điểm của cluster"""
        return {
            'size': len(students),
            'avg_score': np.mean([s['avg_score'] for s in students]),
            'avg_study_time': np.mean([s['study_time'] for s in students]),
            'profile': self._get_profile_name(students)
        }
    
    def _get_profile_name(self, students):
        """Đặt tên cho profile"""
        avg_score = np.mean([s['avg_score'] for s in students])
        avg_time = np.mean([s['study_time'] for s in students])
        
        if avg_score >= 80 and avg_time >= 60:
            return "Học sinh xuất sắc"
        elif avg_score >= 70:
            return "Học sinh khá"
        elif avg_time >= 60:
            return "Học sinh chăm chỉ"
        else:
            return "Cần hỗ trợ thêm"
```

### Hướng 5: Tạo Câu Hỏi Tự Động

#### Sử dụng Template-based
```python
# backend/ai_question_generator.py
import random

class QuestionGenerator:
    def __init__(self):
        self.templates = {
            'math': [
                "Tính giá trị của {expression}",
                "Giải phương trình {equation}",
                "Tìm đạo hàm của {function}",
            ],
            'physics': [
                "Một vật có khối lượng {mass}kg chuyển động với vận tốc {velocity}m/s. Tính động năng.",
                "Tính lực hấp dẫn giữa hai vật có khối lượng {m1}kg và {m2}kg cách nhau {distance}m.",
            ]
        }
    
    def generate_question(self, subject, difficulty):
        """Tạo câu hỏi tự động"""
        template = random.choice(self.templates[subject])
        
        # Fill template với số ngẫu nhiên
        if subject == 'math':
            question = template.format(
                expression=self._generate_expression(difficulty),
                equation=self._generate_equation(difficulty),
                function=self._generate_function(difficulty)
            )
        
        return {
            'question': question,
            'difficulty': difficulty,
            'answer': self._calculate_answer(question)
        }
    
    def _generate_expression(self, difficulty):
        """Tạo biểu thức toán học"""
        if difficulty == 1:
            a, b = random.randint(1, 10), random.randint(1, 10)
            return f"{a} + {b}"
        elif difficulty == 2:
            a, b = random.randint(1, 20), random.randint(1, 20)
            return f"{a} × {b}"
        else:
            a, b, c = random.randint(1, 10), random.randint(1, 10), random.randint(1, 10)
            return f"{a}x² + {b}x + {c}"
```

#### Sử dụng AI (GPT) để tạo câu hỏi
```python
# backend/ai_question_generator_gpt.py
import openai

class AIQuestionGenerator:
    def __init__(self):
        openai.api_key = 'YOUR_API_KEY'
    
    def generate_questions(self, topic, difficulty, count=5):
        """Tạo câu hỏi bằng GPT"""
        prompt = f"""
        Tạo {count} câu hỏi trắc nghiệm về chủ đề "{topic}" 
        với độ khó {difficulty}/5 cho học sinh THPT.
        
        Format JSON:
        [
            {{
                "question": "câu hỏi",
                "options": ["A", "B", "C", "D"],
                "correct_answer": "A",
                "explanation": "giải thích"
            }}
        ]
        """
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )
        
        return response.choices[0].message.content
```

### Hướng 6: Phân Tích Cảm Xúc Học Sinh

```python
# backend/ai_sentiment_analysis.py
from textblob import TextBlob

class SentimentAnalyzer:
    def analyze_feedback(self, text):
        """Phân tích cảm xúc từ feedback"""
        blob = TextBlob(text)
        sentiment = blob.sentiment.polarity
        
        if sentiment > 0.3:
            return "positive"
        elif sentiment < -0.3:
            return "negative"
        else:
            return "neutral"
    
    def get_student_mood(self, chat_history):
        """Phân tích tâm trạng học sinh từ lịch sử chat"""
        sentiments = [self.analyze_feedback(msg) for msg in chat_history]
        
        positive_count = sentiments.count("positive")
        negative_count = sentiments.count("negative")
        
        if negative_count > positive_count:
            return {
                'mood': 'frustrated',
                'recommendation': 'Cần hỗ trợ thêm, có thể nghỉ ngơi'
            }
        else:
            return {
                'mood': 'motivated',
                'recommendation': 'Tiếp tục duy trì'
            }
```

## 🔧 Cách Tích Hợp AI Mới

### Bước 1: Tạo file AI module mới
```bash
# Tạo file trong backend/
touch backend/ai_your_feature.py
```

### Bước 2: Viết code AI
```python
# backend/ai_your_feature.py
class YourAIFeature:
    def __init__(self):
        # Khởi tạo
        pass
    
    def your_method(self, data):
        # Logic AI của bạn
        result = self.process(data)
        return result
```

### Bước 3: Thêm vào app.py
```python
# backend/app.py
from ai_your_feature import YourAIFeature

your_ai = YourAIFeature()

@app.route('/api/your-feature', methods=['POST'])
@jwt_required()
def your_feature():
    data = request.json
    result = your_ai.your_method(data)
    return jsonify(result)
```

### Bước 4: Cập nhật frontend
```javascript
// frontend/src/services/api.js
export const yourFeatureAPI = {
  process: (data) => api.post('/your-feature', data),
};
```

## 📦 Thư Viện AI Hữu Ích

### Machine Learning
```bash
pip install scikit-learn      # ML algorithms
pip install tensorflow         # Deep Learning
pip install pytorch           # Deep Learning
pip install xgboost           # Gradient Boosting
```

### NLP
```bash
pip install transformers      # Hugging Face models
pip install spacy            # NLP toolkit
pip install nltk             # Natural Language Toolkit
pip install textblob         # Sentiment analysis
```

### LLM
```bash
pip install openai           # OpenAI GPT
pip install google-generativeai  # Google Gemini
pip install anthropic        # Claude AI
pip install langchain        # LLM framework
```

### Data Processing
```bash
pip install pandas           # Data manipulation
pip install numpy            # Numerical computing
pip install matplotlib       # Visualization
pip install seaborn          # Statistical visualization
```

## 🎯 Roadmap Phát Triển AI

### Phase 1: Cơ Bản (Đã có)
- [x] Rule-based chatbot
- [x] Statistical analysis
- [x] Basic recommendations

### Phase 2: Nâng Cao
- [ ] LLM integration (GPT/Gemini)
- [ ] ML-based predictions
- [ ] Collaborative filtering
- [ ] Auto question generation

### Phase 3: Chuyên Sâu
- [ ] Deep Learning models
- [ ] Student clustering
- [ ] Sentiment analysis
- [ ] Personalized learning paths

### Phase 4: Tối Ưu
- [ ] Model optimization
- [ ] A/B testing
- [ ] Real-time adaptation
- [ ] Multi-modal learning

## 💡 Tips Phát Triển AI

1. **Bắt đầu đơn giản** - Test với rule-based trước
2. **Thu thập data** - Càng nhiều data, AI càng tốt
3. **Đo lường hiệu quả** - Track metrics để cải thiện
4. **Iterate nhanh** - Test, learn, improve
5. **User feedback** - Lắng nghe người dùng

## 📚 Tài Nguyên Học Tập

- **Coursera**: Machine Learning by Andrew Ng
- **Fast.ai**: Practical Deep Learning
- **Kaggle**: Competitions & Datasets
- **Papers with Code**: Latest research
- **Hugging Face**: Pre-trained models

## 🤝 Đóng Góp

Nếu bạn phát triển tính năng AI mới:
1. Tạo branch mới
2. Viết code + tests
3. Document rõ ràng
4. Tạo pull request

## 📞 Hỗ Trợ

Nếu cần hỗ trợ phát triển AI:
- Đọc docs của thư viện
- Tham gia communities (Reddit, Discord)
- Hỏi trên Stack Overflow
- Xem tutorials trên YouTube

---

**Chúc bạn phát triển AI thành công! 🚀**
