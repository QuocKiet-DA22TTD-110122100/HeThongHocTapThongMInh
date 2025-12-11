# Hệ Thống Học Tập Thích Ứng AI cho THPT

## Tính năng chính

- ✅ Đánh giá năng lực ban đầu
- ✅ Đề xuất bài học phù hợp với từng học sinh
- ✅ Theo dõi tiến độ học tập chi tiết
- ✅ Hệ thống câu hỏi/bài tập tự động
- ✅ Phân tích điểm mạnh/yếu
- ✅ Chatbot hỗ trợ học tập AI
- ✅ Dự đoán kết quả học tập
- ✅ Xem tiến độ học tập trực quan

## Công nghệ sử dụng

### Backend
- Python 3.8+
- Flask (REST API)
- TensorFlow/Scikit-learn (AI/ML)
- SQLAlchemy (ORM)
- JWT Authentication

### Frontend
- React 18
- Material-UI
- Recharts (biểu đồ)
- Axios

### Database
- SQLite (development)
- PostgreSQL (production)

## Cài đặt

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python app.py
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Cấu trúc dự án

```
adaptive-learning-system/
├── backend/
│   ├── app.py                 # Main Flask application
│   ├── models.py              # Database models
│   ├── ai_engine.py           # AI/ML engine
│   ├── chatbot.py             # Chatbot AI
│   ├── requirements.txt
│   └── config.py
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/            # Pages
│   │   ├── services/         # API services
│   │   └── App.js
│   └── package.json
└── README.md
```

## API Endpoints

- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `POST /api/assessment/start` - Bắt đầu đánh giá năng lực
- `GET /api/lessons/recommended` - Lấy bài học đề xuất
- `GET /api/progress` - Xem tiến độ học tập
- `POST /api/exercises/submit` - Nộp bài tập
- `GET /api/analytics/strengths` - Phân tích điểm mạnh/yếu
- `POST /api/chatbot/ask` - Hỏi chatbot
- `GET /api/prediction/results` - Dự đoán kết quả học tập

## Tác giả

Hệ thống học tập thích ứng AI cho học sinh THPT
