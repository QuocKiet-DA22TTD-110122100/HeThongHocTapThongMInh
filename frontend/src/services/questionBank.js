// ==================== NGÂN HÀNG CÂU HỎI ====================
// Hệ thống câu hỏi cho các môn học chuyên ngành CNTT

// Danh sách môn học
export const SUBJECTS = {
  AI_ML: { id: 1, name: 'AI & Machine Learning', code: 'AI_ML', icon: '🤖' },
  PROGRAMMING: { id: 2, name: 'Kỹ thuật lập trình', code: 'PROGRAMMING', icon: '💻' },
  DATABASE: { id: 3, name: 'Cơ sở dữ liệu', code: 'DATABASE', icon: '🗄️' },
  OOP: { id: 4, name: 'Lập trình hướng đối tượng', code: 'OOP', icon: '🎯' },
  IT_INTRO: { id: 5, name: 'Nhập môn CNTT', code: 'IT_INTRO', icon: '📚' },
  DATA_STRUCTURE: { id: 6, name: 'Cấu trúc dữ liệu', code: 'DATA_STRUCTURE', icon: '🌳' }
};

// Cấu hình loại bài kiểm tra
export const EXAM_TYPES = {
  PRACTICE: {
    id: 'PRACTICE',
    name: 'Luyện tập',
    questionCount: 10,
    timeLimit: 10,
    pointPerQuestion: 1,
    description: 'Bài luyện tập nhanh'
  },
  QUIZ_15: {
    id: 'QUIZ_15',
    name: 'Kiểm tra 15 phút',
    questionCount: 20,
    timeLimit: 15,
    pointPerQuestion: 0.5,
    description: 'Kiểm tra thường xuyên'
  },
  MIDTERM: {
    id: 'MIDTERM',
    name: 'Kiểm tra giữa kỳ',
    questionCount: 40,
    timeLimit: 45,
    pointPerQuestion: 0.25,
    description: 'Kiểm tra giữa học kỳ'
  },
  FINAL: {
    id: 'FINAL',
    name: 'Thi học kỳ',
    questionCount: 50,
    timeLimit: 60,
    pointPerQuestion: 0.2,
    description: 'Thi cuối học kỳ'
  }
};

// Hàm tính điểm theo thang 10
export const calculateScore = (correctCount, examType) => {
  const config = EXAM_TYPES[examType] || EXAM_TYPES.PRACTICE;
  const rawScore = correctCount * config.pointPerQuestion;
  return Math.round(rawScore * 100) / 100;
};

// Hàm xếp loại điểm
export const getGrade = (score) => {
  if (score >= 9) return { grade: 'Xuất sắc', color: '#4caf50', emoji: '🏆' };
  if (score >= 8) return { grade: 'Giỏi', color: '#8bc34a', emoji: '🌟' };
  if (score >= 6.5) return { grade: 'Khá', color: '#2196f3', emoji: '👍' };
  if (score >= 5) return { grade: 'Trung bình', color: '#ff9800', emoji: '📚' };
  return { grade: 'Yếu', color: '#f44336', emoji: '💪' };
};

// ==================== NGÂN HÀNG CÂU HỎI THEO MÔN ====================

// ===== MÔN 1: KỸ THUẬT LẬP TRÌNH =====
export const questionsProgramming = [
  // Câu dễ (1-15)
  { id: 101, subject: 'PROGRAMMING', difficulty: 1, question: 'Biến (variable) trong lập trình là gì?',
    options: ['Vùng nhớ lưu trữ dữ liệu', 'Lệnh in ra màn hình', 'Hàm tính toán', 'Vòng lặp'],
    correctAnswer: 'Vùng nhớ lưu trữ dữ liệu' },
  { id: 102, subject: 'PROGRAMMING', difficulty: 1, question: 'Kiểu dữ liệu int dùng để lưu trữ?',
    options: ['Số nguyên', 'Số thực', 'Chuỗi ký tự', 'Giá trị logic'],
    correctAnswer: 'Số nguyên' },
  { id: 103, subject: 'PROGRAMMING', difficulty: 1, question: 'Toán tử nào dùng để gán giá trị?',
    options: ['=', '==', '!=', '+='],
    correctAnswer: '=' },
  { id: 104, subject: 'PROGRAMMING', difficulty: 1, question: 'Câu lệnh if dùng để làm gì?',
    options: ['Rẽ nhánh có điều kiện', 'Lặp lại', 'Khai báo biến', 'In ra màn hình'],
    correctAnswer: 'Rẽ nhánh có điều kiện' },
  { id: 105, subject: 'PROGRAMMING', difficulty: 1, question: 'Vòng lặp for thường dùng khi nào?',
    options: ['Biết trước số lần lặp', 'Không biết số lần lặp', 'Lặp vô hạn', 'Không lặp'],
    correctAnswer: 'Biết trước số lần lặp' },
  { id: 106, subject: 'PROGRAMMING', difficulty: 1, question: 'Hàm (function) là gì?',
    options: ['Khối lệnh thực hiện một nhiệm vụ', 'Biến số', 'Kiểu dữ liệu', 'Toán tử'],
    correctAnswer: 'Khối lệnh thực hiện một nhiệm vụ' },
  { id: 107, subject: 'PROGRAMMING', difficulty: 1, question: 'Mảng (array) là gì?',
    options: ['Tập hợp các phần tử cùng kiểu', 'Một biến đơn', 'Một hàm', 'Một vòng lặp'],
    correctAnswer: 'Tập hợp các phần tử cùng kiểu' },
  { id: 108, subject: 'PROGRAMMING', difficulty: 1, question: 'Chỉ số mảng trong C/C++ bắt đầu từ?',
    options: ['0', '1', '-1', '10'],
    correctAnswer: '0' },
  { id: 109, subject: 'PROGRAMMING', difficulty: 1, question: 'Kiểu bool có thể nhận giá trị nào?',
    options: ['true hoặc false', 'Số nguyên bất kỳ', 'Chuỗi ký tự', 'Số thực'],
    correctAnswer: 'true hoặc false' },
  { id: 110, subject: 'PROGRAMMING', difficulty: 1, question: 'Toán tử && trong C có nghĩa là?',
    options: ['AND logic', 'OR logic', 'NOT logic', 'XOR logic'],
    correctAnswer: 'AND logic' },
  { id: 111, subject: 'PROGRAMMING', difficulty: 1, question: 'Câu lệnh break dùng để?',
    options: ['Thoát khỏi vòng lặp', 'Tiếp tục vòng lặp', 'Khai báo biến', 'Gọi hàm'],
    correctAnswer: 'Thoát khỏi vòng lặp' },
  { id: 112, subject: 'PROGRAMMING', difficulty: 1, question: 'printf() trong C dùng để?',
    options: ['In ra màn hình', 'Nhập từ bàn phím', 'Khai báo biến', 'Tính toán'],
    correctAnswer: 'In ra màn hình' },
  { id: 113, subject: 'PROGRAMMING', difficulty: 1, question: 'scanf() trong C dùng để?',
    options: ['Nhập dữ liệu từ bàn phím', 'In ra màn hình', 'Khai báo hàm', 'Tạo mảng'],
    correctAnswer: 'Nhập dữ liệu từ bàn phím' },
  { id: 114, subject: 'PROGRAMMING', difficulty: 1, question: 'Kiểu float dùng để lưu?',
    options: ['Số thực', 'Số nguyên', 'Ký tự', 'Chuỗi'],
    correctAnswer: 'Số thực' },
  { id: 115, subject: 'PROGRAMMING', difficulty: 1, question: 'Comment trong code dùng để?',
    options: ['Ghi chú, giải thích code', 'Chạy chương trình', 'Khai báo biến', 'Tạo hàm'],
    correctAnswer: 'Ghi chú, giải thích code' },
  // Câu trung bình (16-30)
  { id: 116, subject: 'PROGRAMMING', difficulty: 2, question: 'Con trỏ (pointer) là gì?',
    options: ['Biến lưu địa chỉ bộ nhớ', 'Biến lưu số nguyên', 'Hàm đặc biệt', 'Kiểu mảng'],
    correctAnswer: 'Biến lưu địa chỉ bộ nhớ' },
  { id: 117, subject: 'PROGRAMMING', difficulty: 2, question: 'Đệ quy (recursion) là gì?',
    options: ['Hàm gọi chính nó', 'Vòng lặp for', 'Mảng 2 chiều', 'Con trỏ'],
    correctAnswer: 'Hàm gọi chính nó' },
  { id: 118, subject: 'PROGRAMMING', difficulty: 2, question: 'Độ phức tạp O(n) nghĩa là?',
    options: ['Tuyến tính theo n', 'Hằng số', 'Bình phương n', 'Logarit n'],
    correctAnswer: 'Tuyến tính theo n' },
  { id: 119, subject: 'PROGRAMMING', difficulty: 2, question: 'Stack overflow xảy ra khi?',
    options: ['Đệ quy quá sâu', 'Mảng rỗng', 'Biến chưa khởi tạo', 'Chia cho 0'],
    correctAnswer: 'Đệ quy quá sâu' },
  { id: 120, subject: 'PROGRAMMING', difficulty: 2, question: 'Toán tử % trong C dùng để?',
    options: ['Lấy phần dư', 'Lấy phần nguyên', 'Nhân', 'Chia'],
    correctAnswer: 'Lấy phần dư' },
  { id: 121, subject: 'PROGRAMMING', difficulty: 2, question: 'Struct trong C dùng để?',
    options: ['Định nghĩa kiểu dữ liệu mới', 'Tạo vòng lặp', 'Khai báo hàm', 'Tạo mảng'],
    correctAnswer: 'Định nghĩa kiểu dữ liệu mới' },
  { id: 122, subject: 'PROGRAMMING', difficulty: 2, question: 'Malloc() dùng để?',
    options: ['Cấp phát bộ nhớ động', 'In ra màn hình', 'Đọc file', 'Sắp xếp mảng'],
    correctAnswer: 'Cấp phát bộ nhớ động' },
  { id: 123, subject: 'PROGRAMMING', difficulty: 2, question: 'Free() dùng để?',
    options: ['Giải phóng bộ nhớ', 'Cấp phát bộ nhớ', 'Tạo biến', 'Xóa file'],
    correctAnswer: 'Giải phóng bộ nhớ' },
  { id: 124, subject: 'PROGRAMMING', difficulty: 2, question: 'Tham số truyền bằng tham chiếu (reference) có đặc điểm?',
    options: ['Thay đổi giá trị gốc', 'Tạo bản sao', 'Không thay đổi gì', 'Chỉ đọc'],
    correctAnswer: 'Thay đổi giá trị gốc' },
  { id: 125, subject: 'PROGRAMMING', difficulty: 2, question: 'File header (.h) trong C chứa?',
    options: ['Khai báo hàm và hằng số', 'Code thực thi', 'Dữ liệu người dùng', 'Hình ảnh'],
    correctAnswer: 'Khai báo hàm và hằng số' },
  // Câu khó (31-40)
  { id: 126, subject: 'PROGRAMMING', difficulty: 3, question: 'Memory leak là gì?',
    options: ['Bộ nhớ cấp phát không được giải phóng', 'Lỗi cú pháp', 'Lỗi logic', 'Tràn mảng'],
    correctAnswer: 'Bộ nhớ cấp phát không được giải phóng' },
  { id: 127, subject: 'PROGRAMMING', difficulty: 3, question: 'Dangling pointer là?',
    options: ['Con trỏ trỏ đến vùng nhớ đã giải phóng', 'Con trỏ NULL', 'Con trỏ hàm', 'Con trỏ mảng'],
    correctAnswer: 'Con trỏ trỏ đến vùng nhớ đã giải phóng' },
  { id: 128, subject: 'PROGRAMMING', difficulty: 3, question: 'Volatile keyword dùng khi?',
    options: ['Biến có thể thay đổi ngoài chương trình', 'Biến hằng số', 'Biến static', 'Biến local'],
    correctAnswer: 'Biến có thể thay đổi ngoài chương trình' },
  { id: 129, subject: 'PROGRAMMING', difficulty: 3, question: 'Inline function có ưu điểm?',
    options: ['Giảm overhead gọi hàm', 'Tiết kiệm bộ nhớ', 'Dễ debug', 'Chạy đa luồng'],
    correctAnswer: 'Giảm overhead gọi hàm' },
  { id: 130, subject: 'PROGRAMMING', difficulty: 3, question: 'Macro khác function ở điểm?',
    options: ['Được thay thế khi biên dịch', 'Chạy nhanh hơn', 'Có kiểu trả về', 'Có thể đệ quy'],
    correctAnswer: 'Được thay thế khi biên dịch' },
];


// ===== MÔN 2: CƠ SỞ DỮ LIỆU =====
export const questionsDatabase = [
  // Câu dễ
  { id: 201, subject: 'DATABASE', difficulty: 1, question: 'CSDL là viết tắt của?',
    options: ['Cơ sở dữ liệu', 'Chương sở dữ liệu', 'Cấu sở dữ liệu', 'Công sở dữ liệu'],
    correctAnswer: 'Cơ sở dữ liệu' },
  { id: 202, subject: 'DATABASE', difficulty: 1, question: 'SQL là viết tắt của?',
    options: ['Structured Query Language', 'Simple Query Language', 'Standard Query Language', 'System Query Language'],
    correctAnswer: 'Structured Query Language' },
  { id: 203, subject: 'DATABASE', difficulty: 1, question: 'Lệnh SELECT dùng để?',
    options: ['Truy vấn dữ liệu', 'Xóa dữ liệu', 'Thêm dữ liệu', 'Sửa dữ liệu'],
    correctAnswer: 'Truy vấn dữ liệu' },
  { id: 204, subject: 'DATABASE', difficulty: 1, question: 'Lệnh INSERT dùng để?',
    options: ['Thêm dữ liệu mới', 'Xóa dữ liệu', 'Sửa dữ liệu', 'Truy vấn dữ liệu'],
    correctAnswer: 'Thêm dữ liệu mới' },
  { id: 205, subject: 'DATABASE', difficulty: 1, question: 'Lệnh UPDATE dùng để?',
    options: ['Cập nhật dữ liệu', 'Xóa dữ liệu', 'Thêm dữ liệu', 'Tạo bảng'],
    correctAnswer: 'Cập nhật dữ liệu' },
  { id: 206, subject: 'DATABASE', difficulty: 1, question: 'Lệnh DELETE dùng để?',
    options: ['Xóa dữ liệu', 'Thêm dữ liệu', 'Sửa dữ liệu', 'Tạo bảng'],
    correctAnswer: 'Xóa dữ liệu' },
  { id: 207, subject: 'DATABASE', difficulty: 1, question: 'Primary Key là gì?',
    options: ['Khóa chính định danh duy nhất', 'Khóa ngoại', 'Chỉ mục', 'Ràng buộc'],
    correctAnswer: 'Khóa chính định danh duy nhất' },
  { id: 208, subject: 'DATABASE', difficulty: 1, question: 'Foreign Key là gì?',
    options: ['Khóa ngoại liên kết bảng', 'Khóa chính', 'Chỉ mục', 'Trigger'],
    correctAnswer: 'Khóa ngoại liên kết bảng' },
  { id: 209, subject: 'DATABASE', difficulty: 1, question: 'Bảng (Table) trong CSDL là?',
    options: ['Tập hợp các dòng và cột', 'Một file', 'Một thư mục', 'Một chương trình'],
    correctAnswer: 'Tập hợp các dòng và cột' },
  { id: 210, subject: 'DATABASE', difficulty: 1, question: 'WHERE trong SQL dùng để?',
    options: ['Lọc dữ liệu theo điều kiện', 'Sắp xếp dữ liệu', 'Nhóm dữ liệu', 'Nối bảng'],
    correctAnswer: 'Lọc dữ liệu theo điều kiện' },
  { id: 211, subject: 'DATABASE', difficulty: 1, question: 'ORDER BY dùng để?',
    options: ['Sắp xếp kết quả', 'Lọc dữ liệu', 'Nhóm dữ liệu', 'Nối bảng'],
    correctAnswer: 'Sắp xếp kết quả' },
  { id: 212, subject: 'DATABASE', difficulty: 1, question: 'NULL trong CSDL nghĩa là?',
    options: ['Không có giá trị', 'Số 0', 'Chuỗi rỗng', 'False'],
    correctAnswer: 'Không có giá trị' },
  { id: 213, subject: 'DATABASE', difficulty: 1, question: 'DBMS là gì?',
    options: ['Hệ quản trị CSDL', 'Ngôn ngữ lập trình', 'Hệ điều hành', 'Trình duyệt'],
    correctAnswer: 'Hệ quản trị CSDL' },
  { id: 214, subject: 'DATABASE', difficulty: 1, question: 'MySQL là gì?',
    options: ['Hệ quản trị CSDL quan hệ', 'Ngôn ngữ lập trình', 'Hệ điều hành', 'Framework'],
    correctAnswer: 'Hệ quản trị CSDL quan hệ' },
  { id: 215, subject: 'DATABASE', difficulty: 1, question: 'CREATE TABLE dùng để?',
    options: ['Tạo bảng mới', 'Xóa bảng', 'Sửa bảng', 'Truy vấn bảng'],
    correctAnswer: 'T��o bảng mới' },
  // Câu trung bình
  { id: 216, subject: 'DATABASE', difficulty: 2, question: 'JOIN trong SQL dùng để?',
    options: ['Kết hợp dữ liệu từ nhiều bảng', 'Xóa dữ liệu', 'Thêm dữ liệu', 'Sắp xếp dữ liệu'],
    correctAnswer: 'Kết hợp dữ liệu từ nhiều bảng' },
  { id: 217, subject: 'DATABASE', difficulty: 2, question: 'INNER JOIN trả về?',
    options: ['Các dòng khớp ở cả 2 bảng', 'Tất cả dòng bảng trái', 'Tất cả dòng bảng phải', 'Tất cả dòng'],
    correctAnswer: 'Các dòng khớp ở cả 2 bảng' },
  { id: 218, subject: 'DATABASE', difficulty: 2, question: 'LEFT JOIN trả về?',
    options: ['Tất cả dòng bảng trái + khớp bảng phải', 'Chỉ dòng khớp', 'Tất cả dòng bảng phải', 'Không dòng nào'],
    correctAnswer: 'Tất cả dòng bảng trái + khớp bảng phải' },
  { id: 219, subject: 'DATABASE', difficulty: 2, question: 'GROUP BY dùng để?',
    options: ['Nhóm dữ liệu theo cột', 'Sắp xếp dữ liệu', 'Lọc dữ liệu', 'Nối bảng'],
    correctAnswer: 'Nhóm dữ liệu theo cột' },
  { id: 220, subject: 'DATABASE', difficulty: 2, question: 'HAVING khác WHERE ở điểm?',
    options: ['Lọc sau GROUP BY', 'Lọc trước GROUP BY', 'Không khác', 'Nhanh hơn'],
    correctAnswer: 'Lọc sau GROUP BY' },
  { id: 221, subject: 'DATABASE', difficulty: 2, question: 'INDEX dùng để?',
    options: ['Tăng tốc truy vấn', 'Lưu dữ liệu', 'Xóa dữ liệu', 'Backup dữ liệu'],
    correctAnswer: 'Tăng tốc truy vấn' },
  { id: 222, subject: 'DATABASE', difficulty: 2, question: 'Chuẩn hóa CSDL (Normalization) nhằm?',
    options: ['Giảm dư thừa dữ liệu', 'Tăng dư thừa', 'Xóa dữ liệu', 'Mã hóa dữ liệu'],
    correctAnswer: 'Giảm dư thừa dữ liệu' },
  { id: 223, subject: 'DATABASE', difficulty: 2, question: 'Transaction là gì?',
    options: ['Đơn vị công việc nguyên tử', 'Một bảng', 'Một cột', 'Một dòng'],
    correctAnswer: 'Đơn vị công việc nguyên tử' },
  { id: 224, subject: 'DATABASE', difficulty: 2, question: 'ACID trong CSDL là?',
    options: ['Atomicity, Consistency, Isolation, Durability', 'Add, Create, Insert, Delete', 'Auto, Control, Index, Data', 'Access, Connect, Import, Drop'],
    correctAnswer: 'Atomicity, Consistency, Isolation, Durability' },
  { id: 225, subject: 'DATABASE', difficulty: 2, question: 'View trong CSDL là?',
    options: ['Bảng ảo từ truy vấn', 'Bảng thật', 'Index', 'Trigger'],
    correctAnswer: 'Bảng ảo từ truy vấn' },
  // Câu khó
  { id: 226, subject: 'DATABASE', difficulty: 3, question: 'Deadlock trong CSDL là?',
    options: ['Hai transaction chờ nhau vô hạn', 'Lỗi cú pháp', 'Mất dữ liệu', 'Tràn bộ nhớ'],
    correctAnswer: 'Hai transaction chờ nhau vô hạn' },
  { id: 227, subject: 'DATABASE', difficulty: 3, question: 'Stored Procedure là?',
    options: ['Chương trình lưu trong CSDL', 'Bảng dữ liệu', 'Index', 'View'],
    correctAnswer: 'Chương trình lưu trong CSDL' },
  { id: 228, subject: 'DATABASE', difficulty: 3, question: 'Trigger là gì?',
    options: ['Code tự động chạy khi có sự kiện', 'Bảng dữ liệu', 'Index', 'Khóa chính'],
    correctAnswer: 'Code tự động chạy khi có sự kiện' },
  { id: 229, subject: 'DATABASE', difficulty: 3, question: 'Dạng chuẩn 3NF yêu cầu?',
    options: ['Không có phụ thuộc bắc cầu', 'Có khóa chính', 'Có khóa ngoại', 'Có index'],
    correctAnswer: 'Không có phụ thuộc bắc cầu' },
  { id: 230, subject: 'DATABASE', difficulty: 3, question: 'Sharding trong CSDL là?',
    options: ['Phân tán dữ liệu theo chiều ngang', 'Sao lưu dữ liệu', 'Mã hóa dữ liệu', 'Nén dữ liệu'],
    correctAnswer: 'Phân tán dữ liệu theo chiều ngang' },
];


// ===== MÔN 3: LẬP TRÌNH HƯỚNG ĐỐI TƯỢNG (OOP) =====
export const questionsOOP = [
  // Câu dễ
  { id: 301, subject: 'OOP', difficulty: 1, question: 'OOP là viết tắt của?',
    options: ['Object-Oriented Programming', 'Open Online Platform', 'Optimal Operation Process', 'Output Object Program'],
    correctAnswer: 'Object-Oriented Programming' },
  { id: 302, subject: 'OOP', difficulty: 1, question: 'Class trong OOP là gì?',
    options: ['Bản thiết kế cho đối tượng', 'Một biến', 'Một hàm', 'Một file'],
    correctAnswer: 'Bản thiết kế cho đối tượng' },
  { id: 303, subject: 'OOP', difficulty: 1, question: 'Object (đối tượng) là gì?',
    options: ['Thể hiện cụ thể của class', 'Một hàm', 'Một biến', 'Một kiểu dữ liệu'],
    correctAnswer: 'Thể hiện cụ thể của class' },
  { id: 304, subject: 'OOP', difficulty: 1, question: 'Có bao nhiêu tính chất cơ bản của OOP?',
    options: ['4', '2', '3', '5'],
    correctAnswer: '4' },
  { id: 305, subject: 'OOP', difficulty: 1, question: 'Encapsulation (đóng gói) là gì?',
    options: ['Che giấu thông tin bên trong', 'Kế thừa', 'Đa hình', 'Trừu tượng'],
    correctAnswer: 'Che giấu thông tin bên trong' },
  { id: 306, subject: 'OOP', difficulty: 1, question: 'Inheritance (kế thừa) là gì?',
    options: ['Class con thừa hưởng từ class cha', 'Đóng gói', 'Đa hình', 'Trừu tượng'],
    correctAnswer: 'Class con thừa hưởng từ class cha' },
  { id: 307, subject: 'OOP', difficulty: 1, question: 'Polymorphism (đa hình) là gì?',
    options: ['Cùng tên nhưng hành vi khác nhau', 'Đóng gói', 'Kế thừa', 'Trừu tượng'],
    correctAnswer: 'Cùng tên nhưng hành vi khác nhau' },
  { id: 308, subject: 'OOP', difficulty: 1, question: 'Abstraction (trừu tượng) là gì?',
    options: ['Ẩn chi tiết, chỉ hiện giao diện', 'Đóng gói', 'Kế thừa', 'Đa hình'],
    correctAnswer: 'Ẩn chi tiết, chỉ hiện giao diện' },
  { id: 309, subject: 'OOP', difficulty: 1, question: 'Constructor là gì?',
    options: ['Phương thức khởi tạo đối tượng', 'Phương thức hủy', 'Biến thành viên', 'Hằng số'],
    correctAnswer: 'Phương thức khởi tạo đối tượng' },
  { id: 310, subject: 'OOP', difficulty: 1, question: 'Destructor là gì?',
    options: ['Phương thức hủy đối tượng', 'Phương thức khởi tạo', 'Biến thành viên', 'Hằng số'],
    correctAnswer: 'Phương thức hủy đối tượng' },
  { id: 311, subject: 'OOP', difficulty: 1, question: 'Từ khóa private nghĩa là?',
    options: ['Chỉ truy cập trong class', 'Truy cập mọi nơi', 'Truy cập class con', 'Không truy cập được'],
    correctAnswer: 'Chỉ truy cập trong class' },
  { id: 312, subject: 'OOP', difficulty: 1, question: 'Từ khóa public nghĩa là?',
    options: ['Truy cập từ mọi nơi', 'Chỉ trong class', 'Chỉ class con', 'Không truy cập'],
    correctAnswer: 'Truy cập từ mọi nơi' },
  { id: 313, subject: 'OOP', difficulty: 1, question: 'Từ khóa protected nghĩa là?',
    options: ['Truy cập trong class và class con', 'Truy cập mọi nơi', 'Chỉ trong class', 'Không truy cập'],
    correctAnswer: 'Truy cập trong class và class con' },
  { id: 314, subject: 'OOP', difficulty: 1, question: 'Method trong OOP là gì?',
    options: ['Hàm thuộc về class', 'Biến', 'Hằng số', 'Kiểu dữ liệu'],
    correctAnswer: 'Hàm thuộc về class' },
  { id: 315, subject: 'OOP', difficulty: 1, question: 'Attribute trong OOP là gì?',
    options: ['Thuộc tính/biến của class', 'Hàm', 'Hằng số', 'Kiểu dữ liệu'],
    correctAnswer: 'Thuộc tính/biến của class' },
  // Câu trung bình
  { id: 316, subject: 'OOP', difficulty: 2, question: 'Overloading là gì?',
    options: ['Cùng tên hàm, khác tham số', 'Ghi đè hàm cha', 'Kế thừa', 'Đóng gói'],
    correctAnswer: 'Cùng tên hàm, khác tham số' },
  { id: 317, subject: 'OOP', difficulty: 2, question: 'Overriding là gì?',
    options: ['Ghi đè phương thức của class cha', 'Cùng tên khác tham số', 'Đóng gói', 'Trừu tượng'],
    correctAnswer: 'Ghi đè phương thức của class cha' },
  { id: 318, subject: 'OOP', difficulty: 2, question: 'Abstract class là gì?',
    options: ['Class không thể tạo đối tượng trực tiếp', 'Class bình thường', 'Interface', 'Struct'],
    correctAnswer: 'Class không thể tạo đối tượng trực tiếp' },
  { id: 319, subject: 'OOP', difficulty: 2, question: 'Interface là gì?',
    options: ['Hợp đồng định nghĩa các phương thức', 'Class thường', 'Abstract class', 'Struct'],
    correctAnswer: 'Hợp đồng định nghĩa các phương thức' },
  { id: 320, subject: 'OOP', difficulty: 2, question: 'Static method là gì?',
    options: ['Phương thức thuộc về class, không cần đối tượng', 'Phương thức thường', 'Constructor', 'Destructor'],
    correctAnswer: 'Phương thức thuộc về class, không cần đối tượng' },
  { id: 321, subject: 'OOP', difficulty: 2, question: 'this trong OOP dùng để?',
    options: ['Tham chiếu đến đối tượng hiện tại', 'Tạo đối tượng mới', 'Xóa đối tượng', 'Kế thừa'],
    correctAnswer: 'Tham chiếu đến đối tượng hiện tại' },
  { id: 322, subject: 'OOP', difficulty: 2, question: 'super trong OOP dùng để?',
    options: ['Tham chiếu đến class cha', 'Tham chiếu đến class con', 'Tạo đối tượng', 'Xóa đối tượng'],
    correctAnswer: 'Tham chiếu đến class cha' },
  { id: 323, subject: 'OOP', difficulty: 2, question: 'Composition là gì?',
    options: ['Đối tượng chứa đối tượng khác', 'Kế thừa', 'Đa hình', 'Đóng gói'],
    correctAnswer: 'Đối tượng chứa đối tượng khác' },
  { id: 324, subject: 'OOP', difficulty: 2, question: 'Aggregation khác Composition ở điểm?',
    options: ['Đối tượng con có thể tồn tại độc lập', 'Giống nhau', 'Nhanh hơn', 'Chậm hơn'],
    correctAnswer: 'Đối tượng con có thể tồn tại độc lập' },
  { id: 325, subject: 'OOP', difficulty: 2, question: 'Getter và Setter dùng để?',
    options: ['Truy cập và thay đổi thuộc tính private', 'Tạo đối tượng', 'Xóa đối tượng', 'Kế thừa'],
    correctAnswer: 'Truy cập và thay đổi thuộc tính private' },
  // Câu khó
  { id: 326, subject: 'OOP', difficulty: 3, question: 'SOLID principles gồm mấy nguyên tắc?',
    options: ['5', '3', '4', '6'],
    correctAnswer: '5' },
  { id: 327, subject: 'OOP', difficulty: 3, question: 'Single Responsibility Principle là?',
    options: ['Mỗi class chỉ có một lý do để thay đổi', 'Kế thừa', 'Đa hình', 'Đóng gói'],
    correctAnswer: 'Mỗi class chỉ có một lý do để thay đổi' },
  { id: 328, subject: 'OOP', difficulty: 3, question: 'Dependency Injection là gì?',
    options: ['Truyền dependency từ bên ngoài vào', 'Tạo dependency bên trong', 'Xóa dependency', 'Kế thừa'],
    correctAnswer: 'Truyền dependency từ bên ngoài vào' },
  { id: 329, subject: 'OOP', difficulty: 3, question: 'Design Pattern là gì?',
    options: ['Giải pháp tái sử dụng cho vấn đề phổ biến', 'Ngôn ngữ lập trình', 'Framework', 'Library'],
    correctAnswer: 'Giải pháp tái sử dụng cho vấn đề phổ biến' },
  { id: 330, subject: 'OOP', difficulty: 3, question: 'Singleton Pattern đảm bảo?',
    options: ['Chỉ có một instance của class', 'Nhiều instance', 'Không có instance', 'Kế thừa'],
    correctAnswer: 'Chỉ có một instance của class' },
];


// ===== MÔN 4: NHẬP MÔN CNTT =====
export const questionsITIntro = [
  // Câu dễ
  { id: 401, subject: 'IT_INTRO', difficulty: 1, question: 'CNTT là viết tắt của?',
    options: ['Công nghệ thông tin', 'Công nghiệp thông tin', 'Cơ nghệ thông tin', 'Công nghệ thông minh'],
    correctAnswer: 'Công nghệ thông tin' },
  { id: 402, subject: 'IT_INTRO', difficulty: 1, question: 'CPU là viết tắt của?',
    options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Unit', 'Computer Processing Unit'],
    correctAnswer: 'Central Processing Unit' },
  { id: 403, subject: 'IT_INTRO', difficulty: 1, question: 'RAM là bộ nhớ gì?',
    options: ['Bộ nhớ tạm thời', 'Bộ nhớ vĩnh viễn', 'Ổ cứng', 'Card đồ họa'],
    correctAnswer: 'Bộ nhớ tạm thời' },
  { id: 404, subject: 'IT_INTRO', difficulty: 1, question: 'ROM là bộ nhớ gì?',
    options: ['Bộ nhớ chỉ đọc', 'Bộ nhớ tạm', 'Ổ cứng', 'Card mạng'],
    correctAnswer: 'Bộ nhớ chỉ đọc' },
  { id: 405, subject: 'IT_INTRO', difficulty: 1, question: 'Hệ điều hành phổ biến nhất trên PC?',
    options: ['Windows', 'Linux', 'macOS', 'Android'],
    correctAnswer: 'Windows' },
  { id: 406, subject: 'IT_INTRO', difficulty: 1, question: 'Bit là gì?',
    options: ['Đơn vị nhỏ nhất của dữ liệu (0 hoặc 1)', 'Đơn vị lớn nhất', '8 byte', '1024 byte'],
    correctAnswer: 'Đơn vị nhỏ nhất của dữ liệu (0 hoặc 1)' },
  { id: 407, subject: 'IT_INTRO', difficulty: 1, question: '1 Byte bằng bao nhiêu bit?',
    options: ['8 bit', '4 bit', '16 bit', '32 bit'],
    correctAnswer: '8 bit' },
  { id: 408, subject: 'IT_INTRO', difficulty: 1, question: '1 KB bằng bao nhiêu byte?',
    options: ['1024 byte', '1000 byte', '100 byte', '10000 byte'],
    correctAnswer: '1024 byte' },
  { id: 409, subject: 'IT_INTRO', difficulty: 1, question: 'Internet là gì?',
    options: ['Mạng máy tính toàn cầu', 'Phần mềm', 'Phần cứng', 'Hệ điều hành'],
    correctAnswer: 'Mạng máy tính toàn cầu' },
  { id: 410, subject: 'IT_INTRO', difficulty: 1, question: 'WWW là viết tắt của?',
    options: ['World Wide Web', 'World Web Wide', 'Wide World Web', 'Web World Wide'],
    correctAnswer: 'World Wide Web' },
  { id: 411, subject: 'IT_INTRO', difficulty: 1, question: 'HTML dùng để?',
    options: ['Tạo cấu trúc trang web', 'Lập trình game', 'Quản lý CSDL', 'Thiết kế đồ họa'],
    correctAnswer: 'Tạo cấu trúc trang web' },
  { id: 412, subject: 'IT_INTRO', difficulty: 1, question: 'CSS dùng để?',
    options: ['Định dạng giao diện web', 'Lập trình logic', 'Quản lý CSDL', 'Xử lý hình ảnh'],
    correctAnswer: 'Định dạng giao diện web' },
  { id: 413, subject: 'IT_INTRO', difficulty: 1, question: 'Phần mềm (Software) là gì?',
    options: ['Chương trình chạy trên máy tính', 'Linh kiện vật lý', 'Màn hình', 'Bàn phím'],
    correctAnswer: 'Chương trình chạy trên máy tính' },
  { id: 414, subject: 'IT_INTRO', difficulty: 1, question: 'Phần cứng (Hardware) là gì?',
    options: ['Các linh kiện vật lý của máy tính', 'Chương trình', 'Dữ liệu', 'File'],
    correctAnswer: 'Các linh kiện vật lý của máy tính' },
  { id: 415, subject: 'IT_INTRO', difficulty: 1, question: 'USB là viết tắt của?',
    options: ['Universal Serial Bus', 'United System Bus', 'Universal System Bus', 'United Serial Bus'],
    correctAnswer: 'Universal Serial Bus' },
  // Câu trung bình
  { id: 416, subject: 'IT_INTRO', difficulty: 2, question: 'Hệ nhị phân sử dụng các chữ số nào?',
    options: ['0 và 1', '0 đến 9', '0 đến 7', 'A đến F'],
    correctAnswer: '0 và 1' },
  { id: 417, subject: 'IT_INTRO', difficulty: 2, question: 'Hệ thập lục phân (Hex) sử dụng?',
    options: ['0-9 và A-F', 'Chỉ 0-9', 'Chỉ A-F', '0 và 1'],
    correctAnswer: '0-9 và A-F' },
  { id: 418, subject: 'IT_INTRO', difficulty: 2, question: 'IP Address dùng để?',
    options: ['Định danh thiết bị trên mạng', 'Lưu trữ dữ liệu', 'Xử lý đồ họa', 'Phát âm thanh'],
    correctAnswer: 'Định danh thiết bị trên mạng' },
  { id: 419, subject: 'IT_INTRO', difficulty: 2, question: 'DNS dùng để?',
    options: ['Chuyển tên miền thành IP', 'Lưu trữ file', 'Gửi email', 'Xử lý video'],
    correctAnswer: 'Chuyển tên miền thành IP' },
  { id: 420, subject: 'IT_INTRO', difficulty: 2, question: 'HTTP là giao thức dùng cho?',
    options: ['Truyền tải web', 'Gửi email', 'Truyền file', 'Chat'],
    correctAnswer: 'Truyền tải web' },
  { id: 421, subject: 'IT_INTRO', difficulty: 2, question: 'HTTPS khác HTTP ở điểm?',
    options: ['Có mã hóa bảo mật', 'Nhanh hơn', 'Chậm hơn', 'Không khác'],
    correctAnswer: 'Có mã hóa bảo mật' },
  { id: 422, subject: 'IT_INTRO', difficulty: 2, question: 'Cloud Computing là gì?',
    options: ['Điện toán đám mây', 'Phần mềm', 'Phần cứng', 'Mạng LAN'],
    correctAnswer: 'Điện toán đám mây' },
  { id: 423, subject: 'IT_INTRO', difficulty: 2, question: 'SSD khác HDD ở điểm?',
    options: ['Không có bộ phận cơ học, nhanh hơn', 'Chậm hơn', 'Rẻ hơn', 'Dung lượng lớn hơn'],
    correctAnswer: 'Không có bộ phận cơ học, nhanh hơn' },
  { id: 424, subject: 'IT_INTRO', difficulty: 2, question: 'Firewall dùng để?',
    options: ['Bảo vệ mạng khỏi truy cập trái phép', 'Tăng tốc mạng', 'Lưu trữ dữ liệu', 'Xử lý đồ họa'],
    correctAnswer: 'Bảo vệ mạng khỏi truy cập trái phép' },
  { id: 425, subject: 'IT_INTRO', difficulty: 2, question: 'Virus máy tính là gì?',
    options: ['Chương trình độc hại tự nhân bản', 'Phần cứng', 'Hệ điều hành', 'Trình duyệt'],
    correctAnswer: 'Chương trình độc hại tự nhân bản' },
  // Câu khó
  { id: 426, subject: 'IT_INTRO', difficulty: 3, question: 'Mô hình OSI có bao nhiêu tầng?',
    options: ['7', '4', '5', '6'],
    correctAnswer: '7' },
  { id: 427, subject: 'IT_INTRO', difficulty: 3, question: 'TCP/IP có bao nhiêu tầng?',
    options: ['4', '7', '5', '6'],
    correctAnswer: '4' },
  { id: 428, subject: 'IT_INTRO', difficulty: 3, question: 'Blockchain là gì?',
    options: ['Chuỗi khối lưu trữ phân tán', 'Ngôn ngữ lập trình', 'Hệ điều hành', 'Phần cứng'],
    correctAnswer: 'Chuỗi khối lưu trữ phân tán' },
  { id: 429, subject: 'IT_INTRO', difficulty: 3, question: 'IoT là viết tắt của?',
    options: ['Internet of Things', 'Input of Technology', 'Internet of Technology', 'Input of Things'],
    correctAnswer: 'Internet of Things' },
  { id: 430, subject: 'IT_INTRO', difficulty: 3, question: 'Big Data đặc trưng bởi 3V là?',
    options: ['Volume, Velocity, Variety', 'Value, Volume, Velocity', 'Variety, Value, Volume', 'Velocity, Value, Variety'],
    correctAnswer: 'Volume, Velocity, Variety' },
];


// ===== MÔN 5: CẤU TRÚC DỮ LIỆU =====
export const questionsDataStructure = [
  // Câu dễ
  { id: 501, subject: 'DATA_STRUCTURE', difficulty: 1, question: 'Cấu trúc dữ liệu là gì?',
    options: ['Cách tổ chức và lưu trữ dữ liệu', 'Ngôn ngữ lập trình', 'Phần cứng', 'Hệ điều hành'],
    correctAnswer: 'Cách tổ chức và lưu trữ dữ liệu' },
  { id: 502, subject: 'DATA_STRUCTURE', difficulty: 1, question: 'Array (mảng) là gì?',
    options: ['Tập hợp phần tử cùng kiểu, liên tiếp', 'Danh sách liên kết', 'Cây', 'Đồ thị'],
    correctAnswer: 'Tập hợp phần tử cùng kiểu, liên tiếp' },
  { id: 503, subject: 'DATA_STRUCTURE', difficulty: 1, question: 'Stack hoạt động theo nguyên tắc?',
    options: ['LIFO (Last In First Out)', 'FIFO (First In First Out)', 'Random', 'Sorted'],
    correctAnswer: 'LIFO (Last In First Out)' },
  { id: 504, subject: 'DATA_STRUCTURE', difficulty: 1, question: 'Queue hoạt động theo nguyên tắc?',
    options: ['FIFO (First In First Out)', 'LIFO (Last In First Out)', 'Random', 'Sorted'],
    correctAnswer: 'FIFO (First In First Out)' },
  { id: 505, subject: 'DATA_STRUCTURE', difficulty: 1, question: 'Linked List là gì?',
    options: ['Danh sách các node liên kết bằng con trỏ', 'Mảng', 'Cây', 'Đồ thị'],
    correctAnswer: 'Danh sách các node liên kết bằng con trỏ' },
  { id: 506, subject: 'DATA_STRUCTURE', difficulty: 1, question: 'Thao tác Push trong Stack là?',
    options: ['Thêm phần tử vào đỉnh', 'Lấy phần tử ra', 'Xem phần tử đỉnh', 'Xóa tất cả'],
    correctAnswer: 'Thêm phần tử vào đỉnh' },
  { id: 507, subject: 'DATA_STRUCTURE', difficulty: 1, question: 'Thao tác Pop trong Stack là?',
    options: ['Lấy phần tử từ đỉnh ra', 'Thêm phần tử', 'Xem phần tử', 'Đếm phần tử'],
    correctAnswer: 'Lấy phần tử từ đỉnh ra' },
  { id: 508, subject: 'DATA_STRUCTURE', difficulty: 1, question: 'Enqueue trong Queue là?',
    options: ['Thêm phần tử vào cuối', 'Lấy phần tử đầu', 'Xem phần tử', 'Xóa tất cả'],
    correctAnswer: 'Thêm phần tử vào cuối' },
  { id: 509, subject: 'DATA_STRUCTURE', difficulty: 1, question: 'Dequeue trong Queue là?',
    options: ['Lấy phần tử từ đầu ra', 'Thêm phần tử', 'Xem phần tử', 'Đếm phần tử'],
    correctAnswer: 'Lấy phần tử từ đầu ra' },
  { id: 510, subject: 'DATA_STRUCTURE', difficulty: 1, question: 'Tree (cây) có đặc điểm gì?',
    options: ['Cấu trúc phân cấp với node gốc', 'Cấu trúc tuyến tính', 'Không có node', 'Vòng tròn'],
    correctAnswer: 'Cấu trúc phân cấp với node gốc' },
  { id: 511, subject: 'DATA_STRUCTURE', difficulty: 1, question: 'Binary Tree là cây có tối đa bao nhiêu con?',
    options: ['2', '3', '4', '1'],
    correctAnswer: '2' },
  { id: 512, subject: 'DATA_STRUCTURE', difficulty: 1, question: 'Root trong cây là gì?',
    options: ['Node gốc, không có cha', 'Node lá', 'Node con', 'Node giữa'],
    correctAnswer: 'Node gốc, không có cha' },
  { id: 513, subject: 'DATA_STRUCTURE', difficulty: 1, question: 'Leaf trong cây là gì?',
    options: ['Node không có con', 'Node gốc', 'Node có 2 con', 'Node có 1 con'],
    correctAnswer: 'Node không có con' },
  { id: 514, subject: 'DATA_STRUCTURE', difficulty: 1, question: 'Graph (đồ thị) gồm?',
    options: ['Đỉnh và cạnh', 'Chỉ đỉnh', 'Chỉ cạnh', 'Node và pointer'],
    correctAnswer: 'Đỉnh và cạnh' },
  { id: 515, subject: 'DATA_STRUCTURE', difficulty: 1, question: 'Hash Table dùng để?',
    options: ['Lưu trữ và truy xuất nhanh theo key', 'Sắp xếp', 'Tìm kiếm tuần tự', 'Lưu trữ tuần tự'],
    correctAnswer: 'Lưu trữ và truy xuất nhanh theo key' },
  // Câu trung bình
  { id: 516, subject: 'DATA_STRUCTURE', difficulty: 2, question: 'Độ phức tạp truy cập mảng theo index là?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correctAnswer: 'O(1)' },
  { id: 517, subject: 'DATA_STRUCTURE', difficulty: 2, question: 'Độ phức tạp tìm kiếm trong Linked List là?',
    options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'],
    correctAnswer: 'O(n)' },
  { id: 518, subject: 'DATA_STRUCTURE', difficulty: 2, question: 'Binary Search Tree có đặc điểm?',
    options: ['Node trái < Node cha < Node phải', 'Node trái > Node phải', 'Không có thứ tự', 'Random'],
    correctAnswer: 'Node trái < Node cha < Node phải' },
  { id: 519, subject: 'DATA_STRUCTURE', difficulty: 2, question: 'Độ phức tạp tìm kiếm trong BST cân bằng là?',
    options: ['O(log n)', 'O(n)', 'O(1)', 'O(n²)'],
    correctAnswer: 'O(log n)' },
  { id: 520, subject: 'DATA_STRUCTURE', difficulty: 2, question: 'Heap là gì?',
    options: ['Cây nhị phân đặc biệt với tính chất heap', 'Mảng thường', 'Linked List', 'Stack'],
    correctAnswer: 'Cây nhị phân đặc biệt với tính chất heap' },
  { id: 521, subject: 'DATA_STRUCTURE', difficulty: 2, question: 'Min Heap có đặc điểm?',
    options: ['Node cha nhỏ hơn node con', 'Node cha lớn hơn node con', 'Không có thứ tự', 'Random'],
    correctAnswer: 'Node cha nhỏ hơn node con' },
  { id: 522, subject: 'DATA_STRUCTURE', difficulty: 2, question: 'DFS là viết tắt của?',
    options: ['Depth First Search', 'Data First Search', 'Direct First Search', 'Deep First Search'],
    correctAnswer: 'Depth First Search' },
  { id: 523, subject: 'DATA_STRUCTURE', difficulty: 2, question: 'BFS là viết tắt của?',
    options: ['Breadth First Search', 'Binary First Search', 'Best First Search', 'Basic First Search'],
    correctAnswer: 'Breadth First Search' },
  { id: 524, subject: 'DATA_STRUCTURE', difficulty: 2, question: 'Collision trong Hash Table là?',
    options: ['Hai key có cùng hash value', 'Lỗi bộ nhớ', 'Mất dữ liệu', 'Tràn mảng'],
    correctAnswer: 'Hai key có cùng hash value' },
  { id: 525, subject: 'DATA_STRUCTURE', difficulty: 2, question: 'Doubly Linked List khác Singly ở điểm?',
    options: ['Có con trỏ đến cả node trước và sau', 'Chỉ có con trỏ next', 'Không có con trỏ', 'Nhanh hơn'],
    correctAnswer: 'Có con trỏ đến cả node trước và sau' },
  // Câu khó
  { id: 526, subject: 'DATA_STRUCTURE', difficulty: 3, question: 'AVL Tree là gì?',
    options: ['BST tự cân bằng', 'BST thường', 'Heap', 'Graph'],
    correctAnswer: 'BST tự cân bằng' },
  { id: 527, subject: 'DATA_STRUCTURE', difficulty: 3, question: 'Red-Black Tree đảm bảo?',
    options: ['Chiều cao O(log n)', 'Chiều cao O(n)', 'Chiều cao O(1)', 'Không đảm bảo'],
    correctAnswer: 'Chiều cao O(log n)' },
  { id: 528, subject: 'DATA_STRUCTURE', difficulty: 3, question: 'Trie thường dùng cho?',
    options: ['Lưu trữ và tìm kiếm chuỗi', 'Sắp xếp số', 'Tìm đường đi', 'Lưu trữ số'],
    correctAnswer: 'Lưu trữ và tìm kiếm chuỗi' },
  { id: 529, subject: 'DATA_STRUCTURE', difficulty: 3, question: 'Dijkstra algorithm dùng để?',
    options: ['Tìm đường đi ngắn nhất', 'Sắp xếp', 'Tìm kiếm', 'Cân bằng cây'],
    correctAnswer: 'Tìm đường đi ngắn nhất' },
  { id: 530, subject: 'DATA_STRUCTURE', difficulty: 3, question: 'Amortized time complexity là?',
    options: ['Độ phức tạp trung bình qua nhiều thao tác', 'Độ phức tạp tệ nhất', 'Độ phức tạp tốt nhất', 'Không xác định'],
    correctAnswer: 'Độ phức tạp trung bình qua nhiều thao tác' },
];


// ===== MÔN 6: AI & MACHINE LEARNING (giữ lại từ trước) =====
export const questionsAIML = [
  { id: 1, subject: 'AI_ML', difficulty: 1, question: 'AI là viết tắt của từ gì?',
    options: ['Artificial Intelligence', 'Automatic Integration', 'Advanced Internet', 'Applied Information'],
    correctAnswer: 'Artificial Intelligence' },
  { id: 2, subject: 'AI_ML', difficulty: 1, question: 'Machine Learning là gì?',
    options: ['Máy tính tự học từ dữ liệu', 'Lập trình thủ công', 'Thiết kế phần cứng', 'Quản lý database'],
    correctAnswer: 'Máy tính tự học từ dữ liệu' },
  { id: 3, subject: 'AI_ML', difficulty: 1, question: 'Deep Learning sử dụng cấu trúc gì?',
    options: ['Mạng neural nhiều lớp', 'Bảng tính Excel', 'Văn bản Word', 'Hình ảnh'],
    correctAnswer: 'Mạng neural nhiều lớp' },
  { id: 4, subject: 'AI_ML', difficulty: 1, question: 'Supervised Learning là gì?',
    options: ['Học có giám sát với dữ liệu có nhãn', 'Học không cần dữ liệu', 'Học tự động', 'Học từ internet'],
    correctAnswer: 'Học có giám sát với dữ liệu có nhãn' },
  { id: 5, subject: 'AI_ML', difficulty: 1, question: 'Unsupervised Learning là gì?',
    options: ['Học từ dữ liệu không có nhãn', 'Học có giám sát', 'Học tăng cường', 'Học sâu'],
    correctAnswer: 'Học từ dữ liệu không có nhãn' },
  { id: 6, subject: 'AI_ML', difficulty: 2, question: 'CNN thường dùng cho loại dữ liệu nào?',
    options: ['Hình ảnh', 'Văn bản', 'Âm thanh', 'Số liệu bảng'],
    correctAnswer: 'Hình ảnh' },
  { id: 7, subject: 'AI_ML', difficulty: 2, question: 'RNN phù hợp với loại dữ liệu nào?',
    options: ['Dữ liệu tuần tự (chuỗi)', 'Hình ảnh tĩnh', 'Số ngẫu nhiên', 'Dữ liệu bảng'],
    correctAnswer: 'Dữ liệu tuần tự (chuỗi)' },
  { id: 8, subject: 'AI_ML', difficulty: 2, question: 'Overfitting là gì?',
    options: ['Mô hình học quá khớp với dữ liệu huấn luyện', 'Mô hình học không đủ', 'Mô hình bị lỗi', 'Mô hình chạy chậm'],
    correctAnswer: 'Mô hình học quá khớp với dữ liệu huấn luyện' },
  { id: 9, subject: 'AI_ML', difficulty: 2, question: 'Activation function phổ biến nhất là?',
    options: ['ReLU', 'Sigmoid', 'Tanh', 'Step'],
    correctAnswer: 'ReLU' },
  { id: 10, subject: 'AI_ML', difficulty: 2, question: 'Epoch trong training là gì?',
    options: ['Một lần duyệt qua toàn bộ dữ liệu', 'Một mẫu dữ liệu', 'Một layer', 'Một neuron'],
    correctAnswer: 'Một lần duyệt qua toàn bộ dữ liệu' },
  { id: 11, subject: 'AI_ML', difficulty: 3, question: 'Transformer architecture được giới thiệu trong paper nào?',
    options: ['Attention Is All You Need', 'ImageNet Classification', 'AlexNet', 'ResNet'],
    correctAnswer: 'Attention Is All You Need' },
  { id: 12, subject: 'AI_ML', difficulty: 3, question: 'Gradient Descent tìm minimum bằng cách?',
    options: ['Di chuyển ngược hướng gradient', 'Di chuyển theo hướng gradient', 'Random search', 'Grid search'],
    correctAnswer: 'Di chuyển ngược hướng gradient' },
  { id: 13, subject: 'AI_ML', difficulty: 3, question: 'Batch Normalization giúp gì?',
    options: ['Chuẩn hóa input của mỗi layer, tăng tốc training', 'Giảm số layer', 'Tăng batch size', 'Giảm dữ liệu'],
    correctAnswer: 'Chuẩn hóa input của mỗi layer, tăng tốc training' },
  { id: 14, subject: 'AI_ML', difficulty: 3, question: 'F1-Score được tính như thế nào?',
    options: ['Harmonic mean của Precision và Recall', 'Trung bình cộng', 'Tích', 'Hiệu'],
    correctAnswer: 'Harmonic mean của Precision và Recall' },
  { id: 15, subject: 'AI_ML', difficulty: 3, question: 'Model drift là gì?',
    options: ['Hiệu suất model giảm theo thời gian do dữ liệu thay đổi', 'Model chạy nhanh hơn', 'Model tự cải thiện', 'Model bị xóa'],
    correctAnswer: 'Hiệu suất model giảm theo thời gian do dữ liệu thay đổi' },
];

// ==================== TỔNG HỢP TẤT CẢ CÂU HỎI ====================
export const allQuestions = [
  ...questionsProgramming,
  ...questionsDatabase,
  ...questionsOOP,
  ...questionsITIntro,
  ...questionsDataStructure,
  ...questionsAIML
];

// Hàm lấy câu hỏi theo môn học
export const getQuestionsBySubject = (subjectCode) => {
  return allQuestions.filter(q => q.subject === subjectCode);
};

// Hàm lấy câu hỏi cho bài kiểm tra
export const getQuestionsForExam = (examType, subjectCode = null) => {
  const config = EXAM_TYPES[examType] || EXAM_TYPES.PRACTICE;
  let questions = subjectCode ? getQuestionsBySubject(subjectCode) : allQuestions;
  
  // Trộn câu hỏi ngẫu nhiên
  questions = questions.sort(() => Math.random() - 0.5);
  
  // Phân bổ độ khó theo loại bài kiểm tra
  let selectedQuestions = [];
  const count = config.questionCount;
  
  const easyQuestions = questions.filter(q => q.difficulty === 1);
  const mediumQuestions = questions.filter(q => q.difficulty === 2);
  const hardQuestions = questions.filter(q => q.difficulty === 3);
  
  if (examType === 'PRACTICE') {
    // Luyện tập: 70% dễ, 30% trung bình
    selectedQuestions = [
      ...easyQuestions.slice(0, Math.ceil(count * 0.7)),
      ...mediumQuestions.slice(0, Math.floor(count * 0.3))
    ];
  } else if (examType === 'QUIZ_15') {
    // 15 phút: 50% dễ, 40% trung bình, 10% khó
    selectedQuestions = [
      ...easyQuestions.slice(0, Math.ceil(count * 0.5)),
      ...mediumQuestions.slice(0, Math.ceil(count * 0.4)),
      ...hardQuestions.slice(0, Math.floor(count * 0.1))
    ];
  } else if (examType === 'MIDTERM') {
    // Giữa kỳ: 30% dễ, 50% trung bình, 20% khó
    selectedQuestions = [
      ...easyQuestions.slice(0, Math.ceil(count * 0.3)),
      ...mediumQuestions.slice(0, Math.ceil(count * 0.5)),
      ...hardQuestions.slice(0, Math.floor(count * 0.2))
    ];
  } else if (examType === 'FINAL') {
    // Học kỳ: 20% dễ, 50% trung bình, 30% khó
    selectedQuestions = [
      ...easyQuestions.slice(0, Math.ceil(count * 0.2)),
      ...mediumQuestions.slice(0, Math.ceil(count * 0.5)),
      ...hardQuestions.slice(0, Math.floor(count * 0.3))
    ];
  }
  
  // Trộn lại và giới hạn số câu
  selectedQuestions = selectedQuestions.sort(() => Math.random() - 0.5).slice(0, count);
  
  // Nếu không đủ câu, bổ sung từ pool chung
  while (selectedQuestions.length < count && questions.length > selectedQuestions.length) {
    const remaining = questions.filter(q => !selectedQuestions.find(sq => sq.id === q.id));
    if (remaining.length > 0) {
      selectedQuestions.push(remaining[0]);
    } else {
      break;
    }
  }
  
  return selectedQuestions.slice(0, count);
};

// Export mặc định
export default {
  SUBJECTS,
  EXAM_TYPES,
  allQuestions,
  getQuestionsBySubject,
  getQuestionsForExam,
  calculateScore,
  getGrade
};
