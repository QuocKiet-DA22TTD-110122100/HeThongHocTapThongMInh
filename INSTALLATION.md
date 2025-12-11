# Hướng Dẫn Cài Đặt và Chạy Hệ Thống

## Yêu cầu hệ thống

- Python 3.8 trở lên
- Node.js 14 trở lên
- npm hoặc yarn

## Bước 1: Cài đặt Backend

### 1.1. Di chuyển vào thư mục backend
```bash
cd backend
```

### 1.2. Tạo môi trường ảo Python
```bash
python -m venv venv
```

### 1.3. Kích hoạt môi trường ảo

**Windows:**
```bash
venv\Scripts\activate
```

**Linux/Mac:**
```bash
source venv/bin/activate
```

### 1.4. Cài đặt các thư viện Python
```bash
pip install -r requirements.txt
```

### 1.5. Thêm dữ liệu mẫu
```bash
python seed_data.py
```

### 1.6. Chạy server Backend
```bash
python app.py
```

Backend sẽ chạy tại: http://localhost:5000

## Bước 2: Cài đặt Frontend

### 2.1. Mở terminal mới và di chuyển vào thư mục frontend
```bash
cd frontend
```

### 2.2. Cài đặt các thư viện Node.js
```bash
npm install
```

### 2.3. Chạy ứng dụng React
```bash
npm start
```

Frontend sẽ tự động mở tại: http://localhost:3000

## Bước 3: Sử dụng hệ thống

### 3.1. Đăng ký tài khoản
- Truy cập http://localhost:3000
- Click "Đăng ký ngay"
- Điền thông tin: tên đăng nhập, email, họ tên, lớp, mật khẩu
- Click "Đăng ký"

### 3.2. Đăng nhập
- Nhập tên đăng nhập và mật khẩu
- Click "Đăng nhập"

### 3.3. Sử dụng các tính năng

#### Đánh giá năng lực ban đầu
1. Click vào "Đánh giá năng lực"
2. Chọn môn học
3. Làm bài test (20 câu hỏi)
4. Xem kết quả và trình độ của bạn

#### Học bài
1. Click vào "Bài học"
2. Chọn môn học
3. Hệ thống sẽ đề xuất bài học phù hợp với trình độ
4. Click "Học ngay" để xem nội dung
5. Làm bài tập để kiểm tra kiến thức

#### Xem tiến độ
1. Click vào "Tiến độ học tập"
2. Chọn môn học
3. Xem biểu đồ và chi tiết tiến độ

#### Phân tích điểm mạnh/yếu
1. Click vào "Phân tích"
2. Xem điểm mạnh, điểm yếu
3. Xem dự đoán kết quả học tập

#### Chatbot hỗ trợ
1. Click vào "Chatbot hỗ trợ"
2. Nhập câu hỏi về học tập
3. Nhận câu trả lời từ AI

## Khắc phục sự cố

### Backend không chạy được
- Kiểm tra Python đã cài đặt: `python --version`
- Kiểm tra môi trường ảo đã kích hoạt
- Kiểm tra tất cả thư viện đã cài: `pip list`

### Frontend không chạy được
- Kiểm tra Node.js đã cài đặt: `node --version`
- Xóa thư mục node_modules và cài lại: `rm -rf node_modules && npm install`
- Kiểm tra port 3000 có bị chiếm không

### Lỗi kết nối API
- Đảm bảo Backend đang chạy tại port 5000
- Kiểm tra CORS đã được cấu hình đúng
- Kiểm tra URL API trong file `frontend/src/services/api.js`

## Tùy chỉnh

### Thay đổi port Backend
Sửa file `backend/app.py`, dòng cuối:
```python
app.run(debug=True, port=5000)  # Đổi 5000 thành port khác
```

### Thay đổi URL API
Sửa file `frontend/src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';  // Đổi URL
```

## Nâng cấp Production

### Database
- Thay SQLite bằng PostgreSQL
- Cập nhật `SQLALCHEMY_DATABASE_URI` trong `backend/config.py`

### Security
- Đổi `SECRET_KEY` và `JWT_SECRET_KEY` trong `backend/config.py`
- Sử dụng biến môi trường cho các key

### Deployment
- Backend: Deploy lên Heroku, AWS, hoặc VPS
- Frontend: Build và deploy lên Netlify, Vercel, hoặc Nginx
- Database: Sử dụng PostgreSQL trên cloud

## Liên hệ hỗ trợ

Nếu gặp vấn đề, vui lòng tạo issue trên GitHub hoặc liên hệ qua email.
