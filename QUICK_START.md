# Hướng Dẫn Nhanh - Chạy Demo

## ✅ Đã hoàn thành

Frontend đang chạy ở chế độ DEMO với dữ liệu giả lập (mock data).

## 🚀 Truy cập ứng dụng

Sau khi compile xong (khoảng 30-60 giây), trình duyệt sẽ tự động mở tại:

**http://localhost:3000**

Nếu không tự động mở, hãy mở trình duyệt và truy cập URL trên.

## 📝 Tài khoản demo

Vì đang chạy ở chế độ DEMO (không có backend), bạn có thể:

1. **Đăng ký tài khoản mới** - Dữ liệu sẽ lưu tạm trong bộ nhớ
2. **Đăng nhập** với tài khoản vừa đăng ký

## 🎯 Các tính năng có thể dùng ngay

✅ Đăng ký / Đăng nhập
✅ Dashboard với 6 môn học
✅ Đánh giá năng lực ban đầu
✅ Xem bài học được đề xuất
✅ Làm bài tập
✅ Xem tiến độ học tập (biểu đồ)
✅ Phân tích điểm mạnh/yếu
✅ Dự đoán kết quả học tập
✅ Chatbot hỗ trợ học tập

## 🔧 Chuyển sang Backend thật

Khi bạn đã cài đặt Python và chạy backend, hãy:

1. Mở file `frontend/src/services/api.js`
2. Tìm dòng: `const USE_MOCK = true;`
3. Đổi thành: `const USE_MOCK = false;`
4. Lưu file và refresh trình duyệt

## 📦 Cài đặt Python (để chạy backend)

1. Tải Python từ: https://www.python.org/downloads/
2. Chạy installer, **nhớ tick "Add Python to PATH"**
3. Khởi động lại terminal
4. Chạy các lệnh sau:

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python seed_data.py
python app.py
```

## ❓ Gặp vấn đề?

### Frontend không mở tự động
- Mở trình duyệt thủ công và truy cập: http://localhost:3000

### Muốn dừng server
- Nhấn Ctrl+C trong terminal đang chạy npm start

### Lỗi khi compile
- Xóa thư mục `node_modules` và chạy lại `npm install`
- Kiểm tra Node.js version: `node --version` (cần >= 14)

## 📚 Tài liệu đầy đủ

Xem file `INSTALLATION.md` để biết hướng dẫn chi tiết.

## 🎉 Chúc bạn trải nghiệm vui vẻ!

Hệ thống học tập thích ứng AI đã sẵn sàng để bạn khám phá!
