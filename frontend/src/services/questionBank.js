// ==================== NGÂN HÀNG CÂU HỎI ====================
// Hệ thống câu hỏi cho các loại bài kiểm tra

// Cấu hình loại bài kiểm tra
export const EXAM_TYPES = {
  PRACTICE: {
    id: 'practice',
    name: 'Luyện tập',
    questionCount: 10,
    timeLimit: 10, // phút
    pointPerQuestion: 1, // 10 câu x 1 điểm = 10 điểm
    description: 'Bài luyện tập nhanh'
  },
  QUIZ_15: {
    id: 'quiz_15',
    name: 'Kiểm tra 15 phút',
    questionCount: 20,
    timeLimit: 15,
    pointPerQuestion: 0.5, // 20 câu x 0.5 điểm = 10 điểm
    description: 'Kiểm tra thường xuyên'
  },
  MIDTERM: {
    id: 'midterm',
    name: 'Kiểm tra giữa kỳ',
    questionCount: 40,
    timeLimit: 45,
    pointPerQuestion: 0.25, // 40 câu x 0.25 điểm = 10 điểm
    description: 'Kiểm tra giữa học kỳ'
  },
  FINAL: {
    id: 'final',
    name: 'Thi học kỳ',
    questionCount: 50,
    timeLimit: 60,
    pointPerQuestion: 0.2, // 50 câu x 0.2 điểm = 10 điểm
    description: 'Thi cuối học kỳ'
  }
};

// Hàm tính điểm theo thang 10
export const calculateScore = (correctCount, examType) => {
  const config = EXAM_TYPES[examType] || EXAM_TYPES.PRACTICE;
  const rawScore = correctCount * config.pointPerQuestion;
  return Math.round(rawScore * 100) / 100; // Làm tròn 2 chữ số
};

// Hàm xếp loại điểm
export const getGrade = (score) => {
  if (score >= 9) return { grade: 'Xuất sắc', color: '#4caf50', emoji: '🏆' };
  if (score >= 8) return { grade: 'Giỏi', color: '#8bc34a', emoji: '🌟' };
  if (score >= 6.5) return { grade: 'Khá', color: '#2196f3', emoji: '👍' };
  if (score >= 5) return { grade: 'Trung bình', color: '#ff9800', emoji: '📚' };
  return { grade: 'Yếu', color: '#f44336', emoji: '💪' };
};

// ==================== NGÂN HÀNG CÂU HỎI AI ====================
export const questionBankAI = [
  // === CÂU HỎI DỄ (Độ khó 1) - 20 câu ===
  {
    id: 1, topic: 'AI Cơ bản', difficulty: 1,
    question: 'AI là viết tắt của từ gì?',
    options: ['Artificial Intelligence', 'Automatic Integration', 'Advanced Internet', 'Applied Information'],
    correctAnswer: 'Artificial Intelligence'
  },
  {
    id: 2, topic: 'AI Cơ bản', difficulty: 1,
    question: 'Trí tuệ nhân tạo được phát triển nhằm mục đích gì?',
    options: ['Mô phỏng trí thông minh con người', 'Thay thế hoàn toàn con người', 'Tạo ra robot', 'Chơi game'],
    correctAnswer: 'Mô phỏng trí thông minh con người'
  },
  {
    id: 3, topic: 'AI Cơ bản', difficulty: 1,
    question: 'Cha đẻ của ngành AI là ai?',
    options: ['John McCarthy', 'Bill Gates', 'Steve Jobs', 'Elon Musk'],
    correctAnswer: 'John McCarthy'
  },
  {
    id: 4, topic: 'AI Cơ bản', difficulty: 1,
    question: 'AI hẹp (Narrow AI) có đặc điểm gì?',
    options: ['Chỉ thực hiện một nhiệm vụ cụ thể', 'Có thể làm mọi việc', 'Thông minh hơn con người', 'Không cần dữ liệu'],
    correctAnswer: 'Chỉ thực hiện một nhiệm vụ cụ thể'
  },
  {
    id: 5, topic: 'AI Cơ bản', difficulty: 1,
    question: 'Ví dụ nào sau đây là ứng dụng của AI?',
    options: ['Trợ lý ảo Siri', 'Máy tính cầm tay', 'Đồng hồ cơ', 'Bóng đèn'],
    correctAnswer: 'Trợ lý ảo Siri'
  },
  {
    id: 6, topic: 'AI Cơ bản', difficulty: 1,
    question: 'Chatbot là gì?',
    options: ['Chương trình trò chuyện tự động', 'Loại virus máy tính', 'Phần cứng máy tính', 'Ngôn ngữ lập trình'],
    correctAnswer: 'Chương trình trò chuyện tự động'
  },
  {
    id: 7, topic: 'AI Cơ bản', difficulty: 1,
    question: 'Năm nào thuật ngữ "Artificial Intelligence" được đặt ra?',
    options: ['1956', '1990', '2000', '2010'],
    correctAnswer: '1956'
  },
  {
    id: 8, topic: 'AI Cơ bản', difficulty: 1,
    question: 'AI tổng quát (General AI) còn được gọi là gì?',
    options: ['Strong AI', 'Weak AI', 'Simple AI', 'Basic AI'],
    correctAnswer: 'Strong AI'
  },
  {
    id: 9, topic: 'Data Processing', difficulty: 1,
    question: 'Dữ liệu (Data) là gì?',
    options: ['Thông tin thô chưa xử lý', 'Phần mềm máy tính', 'Phần cứng', 'Mạng internet'],
    correctAnswer: 'Thông tin thô chưa xử lý'
  },
  {
    id: 10, topic: 'Data Processing', difficulty: 1,
    question: 'Tiền xử lý dữ liệu (Preprocessing) dùng để làm gì?',
    options: ['Làm sạch và chuẩn bị dữ liệu', 'Xóa toàn bộ dữ liệu', 'Tạo dữ liệu mới', 'In dữ liệu'],
    correctAnswer: 'Làm sạch và chuẩn bị dữ liệu'
  },
  {
    id: 11, topic: 'Data Processing', difficulty: 1,
    question: 'Missing value là gì?',
    options: ['Giá trị bị thiếu trong dữ liệu', 'Giá trị lớn nhất', 'Giá trị nhỏ nhất', 'Giá trị trung bình'],
    correctAnswer: 'Giá trị bị thiếu trong dữ liệu'
  },
  {
    id: 12, topic: 'Data Processing', difficulty: 1,
    question: 'Dataset là gì?',
    options: ['Tập hợp dữ liệu', 'Phần mềm', 'Thuật toán', 'Mô hình AI'],
    correctAnswer: 'Tập hợp dữ liệu'
  },
  {
    id: 13, topic: 'Machine Learning', difficulty: 1,
    question: 'Machine Learning nghĩa là gì?',
    options: ['Học máy', 'Máy học', 'Cả A và B đều đúng', 'Máy tính'],
    correctAnswer: 'Cả A và B đều đúng'
  },
  {
    id: 14, topic: 'Machine Learning', difficulty: 1,
    question: 'Học máy là một nhánh của lĩnh vực nào?',
    options: ['Trí tuệ nhân tạo', 'Vật lý', 'Hóa học', 'Sinh học'],
    correctAnswer: 'Trí tuệ nhân tạo'
  },
  {
    id: 15, topic: 'Machine Learning', difficulty: 1,
    question: 'Mục đích chính của Machine Learning là gì?',
    options: ['Cho máy tính học từ dữ liệu', 'Sửa chữa máy tính', 'Thiết kế phần cứng', 'Viết văn bản'],
    correctAnswer: 'Cho máy tính học từ dữ liệu'
  },
  {
    id: 16, topic: 'Machine Learning', difficulty: 1,
    question: 'Training trong ML nghĩa là gì?',
    options: ['Huấn luyện mô hình', 'Kiểm tra mô hình', 'Xóa mô hình', 'Sao chép mô hình'],
    correctAnswer: 'Huấn luyện mô hình'
  },
  {
    id: 17, topic: 'Deep Learning', difficulty: 1,
    question: 'Deep Learning sử dụng cấu trúc gì?',
    options: ['Mạng neural nhiều lớp', 'Bảng tính Excel', 'Văn bản Word', 'Hình ảnh'],
    correctAnswer: 'Mạng neural nhiều lớp'
  },
  {
    id: 18, topic: 'Deep Learning', difficulty: 1,
    question: 'Neuron trong mạng neural mô phỏng theo gì?',
    options: ['Tế bào thần kinh não người', 'Tế bào máu', 'Tế bào da', 'Tế bào cơ'],
    correctAnswer: 'Tế bào thần kinh não người'
  },
  {
    id: 19, topic: 'Deployment', difficulty: 1,
    question: 'Deployment nghĩa là gì?',
    options: ['Triển khai', 'Huấn luyện', 'Thu thập', 'Xóa bỏ'],
    correctAnswer: 'Triển khai'
  },
  {
    id: 20, topic: 'Deployment', difficulty: 1,
    question: 'API là viết tắt của?',
    options: ['Application Programming Interface', 'Advanced Program Integration', 'Automatic Process Input', 'Applied Programming Index'],
    correctAnswer: 'Application Programming Interface'
  },


  // === CÂU HỎI TRUNG BÌNH (Độ khó 2) - 20 câu ===
  {
    id: 21, topic: 'Machine Learning', difficulty: 2,
    question: 'Supervised Learning là gì?',
    options: ['Học có giám sát với dữ liệu có nhãn', 'Học không cần dữ liệu', 'Học tự động hoàn toàn', 'Học từ internet'],
    correctAnswer: 'Học có giám sát với dữ liệu có nhãn'
  },
  {
    id: 22, topic: 'Machine Learning', difficulty: 2,
    question: 'Unsupervised Learning khác Supervised Learning ở điểm nào?',
    options: ['Dữ liệu không có nhãn', 'Dữ liệu có nhãn', 'Không cần dữ liệu', 'Cần nhiều dữ liệu hơn'],
    correctAnswer: 'Dữ liệu không có nhãn'
  },
  {
    id: 23, topic: 'Machine Learning', difficulty: 2,
    question: 'Reinforcement Learning học theo cách nào?',
    options: ['Thử và sai, nhận phần thưởng/phạt', 'Học từ sách', 'Học từ giáo viên', 'Học thuộc lòng'],
    correctAnswer: 'Thử và sai, nhận phần thưởng/phạt'
  },
  {
    id: 24, topic: 'Machine Learning', difficulty: 2,
    question: 'Overfitting là hiện tượng gì?',
    options: ['Mô hình học quá khớp với dữ liệu huấn luyện', 'Mô hình học không đủ', 'Mô hình bị lỗi', 'Mô hình chạy chậm'],
    correctAnswer: 'Mô hình học quá khớp với dữ liệu huấn luyện'
  },
  {
    id: 25, topic: 'Machine Learning', difficulty: 2,
    question: 'Underfitting xảy ra khi nào?',
    options: ['Mô hình quá đơn giản', 'Mô hình quá phức tạp', 'Dữ liệu quá nhiều', 'Máy tính quá mạnh'],
    correctAnswer: 'Mô hình quá đơn giản'
  },
  {
    id: 26, topic: 'Machine Learning', difficulty: 2,
    question: 'Cross-validation dùng để làm gì?',
    options: ['Đánh giá hiệu suất mô hình', 'Tạo dữ liệu mới', 'Xóa dữ liệu', 'Vẽ biểu đồ'],
    correctAnswer: 'Đánh giá hiệu suất mô hình'
  },
  {
    id: 27, topic: 'Machine Learning', difficulty: 2,
    question: 'Feature trong ML là gì?',
    options: ['Đặc trưng/thuộc tính của dữ liệu', 'Kết quả dự đoán', 'Lỗi của mô hình', 'Tên mô hình'],
    correctAnswer: 'Đặc trưng/thuộc tính của dữ liệu'
  },
  {
    id: 28, topic: 'Machine Learning', difficulty: 2,
    question: 'Label trong Supervised Learning là gì?',
    options: ['Nhãn/kết quả đúng của dữ liệu', 'Tên của feature', 'Số lượng dữ liệu', 'Loại mô hình'],
    correctAnswer: 'Nhãn/kết quả đúng của dữ liệu'
  },
  {
    id: 29, topic: 'Deep Learning', difficulty: 2,
    question: 'CNN thường được sử dụng cho loại dữ liệu nào?',
    options: ['Hình ảnh', 'Văn bản', 'Âm thanh', 'Số liệu bảng'],
    correctAnswer: 'Hình ảnh'
  },
  {
    id: 30, topic: 'Deep Learning', difficulty: 2,
    question: 'RNN phù hợp với loại dữ liệu nào?',
    options: ['Dữ liệu tuần tự (chuỗi)', 'Hình ảnh tĩnh', 'Số ngẫu nhiên', 'Dữ liệu bảng'],
    correctAnswer: 'Dữ liệu tuần tự (chuỗi)'
  },
  {
    id: 31, topic: 'Deep Learning', difficulty: 2,
    question: 'Activation function phổ biến nhất hiện nay là gì?',
    options: ['ReLU', 'Sigmoid', 'Tanh', 'Step'],
    correctAnswer: 'ReLU'
  },
  {
    id: 32, topic: 'Deep Learning', difficulty: 2,
    question: 'Epoch trong training là gì?',
    options: ['Một lần duyệt qua toàn bộ dữ liệu', 'Một mẫu dữ liệu', 'Một layer', 'Một neuron'],
    correctAnswer: 'Một lần duyệt qua toàn bộ dữ liệu'
  },
  {
    id: 33, topic: 'Deep Learning', difficulty: 2,
    question: 'Batch size là gì?',
    options: ['Số mẫu xử lý trong một lần cập nhật', 'Tổng số dữ liệu', 'Số epoch', 'Số layer'],
    correctAnswer: 'Số mẫu xử lý trong một lần cập nhật'
  },
  {
    id: 34, topic: 'Data Processing', difficulty: 2,
    question: 'Normalization là gì?',
    options: ['Đưa dữ liệu về cùng một thang đo', 'Xóa dữ liệu', 'Nhân đôi dữ liệu', 'Sắp xếp dữ liệu'],
    correctAnswer: 'Đưa dữ liệu về cùng một thang đo'
  },
  {
    id: 35, topic: 'Data Processing', difficulty: 2,
    question: 'One-hot encoding dùng để làm gì?',
    options: ['Chuyển dữ liệu categorical thành số', 'Xóa dữ liệu trùng', 'Nén dữ liệu', 'Mã hóa bảo mật'],
    correctAnswer: 'Chuyển dữ liệu categorical thành số'
  },
  {
    id: 36, topic: 'Data Processing', difficulty: 2,
    question: 'Outlier là gì?',
    options: ['Giá trị ngoại lai/bất thường', 'Giá trị trung bình', 'Giá trị phổ biến nhất', 'Giá trị đầu tiên'],
    correctAnswer: 'Giá trị ngoại lai/bất thường'
  },
  {
    id: 37, topic: 'Data Processing', difficulty: 2,
    question: 'Train/Test split thường chia theo tỷ lệ nào?',
    options: ['80/20 hoặc 70/30', '50/50', '99/1', '10/90'],
    correctAnswer: '80/20 hoặc 70/30'
  },
  {
    id: 38, topic: 'Deployment', difficulty: 2,
    question: 'Docker dùng để làm gì trong ML?',
    options: ['Đóng gói ứng dụng và dependencies', 'Huấn luyện mô hình', 'Thu thập dữ liệu', 'Vẽ biểu đồ'],
    correctAnswer: 'Đóng gói ứng dụng và dependencies'
  },
  {
    id: 39, topic: 'Deployment', difficulty: 2,
    question: 'REST API trong ML deployment dùng để?',
    options: ['Giao tiếp giữa client và model', 'Huấn luyện model', 'Lưu trữ dữ liệu', 'Vẽ đồ thị'],
    correctAnswer: 'Giao tiếp giữa client và model'
  },
  {
    id: 40, topic: 'Deployment', difficulty: 2,
    question: 'Model serving là gì?',
    options: ['Cung cấp model để dự đoán', 'Huấn luyện model', 'Xóa model', 'Sao chép model'],
    correctAnswer: 'Cung cấp model để dự đoán'
  },


  // === CÂU HỎI KHÓ (Độ khó 3) - 20 câu ===
  {
    id: 41, topic: 'Deep Learning', difficulty: 3,
    question: 'Vanishing gradient problem xảy ra khi nào?',
    options: ['Gradient quá nhỏ khi backpropagation qua nhiều layer', 'Gradient quá lớn', 'Không có gradient', 'Gradient âm'],
    correctAnswer: 'Gradient quá nhỏ khi backpropagation qua nhiều layer'
  },
  {
    id: 42, topic: 'Deep Learning', difficulty: 3,
    question: 'Transformer architecture được giới thiệu trong paper nào?',
    options: ['Attention Is All You Need', 'ImageNet Classification', 'AlexNet', 'ResNet'],
    correctAnswer: 'Attention Is All You Need'
  },
  {
    id: 43, topic: 'Deep Learning', difficulty: 3,
    question: 'Self-attention mechanism hoạt động như thế nào?',
    options: ['Tính trọng số attention giữa các vị trí trong cùng sequence', 'Chỉ nhìn vị trí hiện tại', 'Bỏ qua context', 'Random attention'],
    correctAnswer: 'Tính trọng số attention giữa các vị trí trong cùng sequence'
  },
  {
    id: 44, topic: 'Deep Learning', difficulty: 3,
    question: 'Dropout regularization hoạt động bằng cách?',
    options: ['Ngẫu nhiên tắt một số neuron khi training', 'Thêm neuron mới', 'Xóa layer', 'Tăng learning rate'],
    correctAnswer: 'Ngẫu nhiên tắt một số neuron khi training'
  },
  {
    id: 45, topic: 'Deep Learning', difficulty: 3,
    question: 'Batch Normalization giúp gì?',
    options: ['Chuẩn hóa input của mỗi layer, tăng tốc training', 'Giảm số layer', 'Tăng batch size', 'Giảm dữ liệu'],
    correctAnswer: 'Chuẩn hóa input của mỗi layer, tăng tốc training'
  },
  {
    id: 46, topic: 'Deep Learning', difficulty: 3,
    question: 'ResNet giải quyết vấn đề gì?',
    options: ['Degradation problem khi mạng quá sâu', 'Overfitting', 'Underfitting', 'Data augmentation'],
    correctAnswer: 'Degradation problem khi mạng quá sâu'
  },
  {
    id: 47, topic: 'Deep Learning', difficulty: 3,
    question: 'LSTM khác RNN thông thường ở điểm nào?',
    options: ['Có cơ chế gate để nhớ thông tin dài hạn', 'Nhanh hơn', 'Ít parameter hơn', 'Không cần training'],
    correctAnswer: 'Có cơ chế gate để nhớ thông tin dài hạn'
  },
  {
    id: 48, topic: 'Machine Learning', difficulty: 3,
    question: 'Bias-Variance tradeoff là gì?',
    options: ['Cân bằng giữa underfitting và overfitting', 'Chọn learning rate', 'Chọn batch size', 'Chọn số epoch'],
    correctAnswer: 'Cân bằng giữa underfitting và overfitting'
  },
  {
    id: 49, topic: 'Machine Learning', difficulty: 3,
    question: 'Gradient Descent tìm minimum bằng cách?',
    options: ['Di chuyển ngược hướng gradient', 'Di chuyển theo hướng gradient', 'Random search', 'Grid search'],
    correctAnswer: 'Di chuyển ngược hướng gradient'
  },
  {
    id: 50, topic: 'Machine Learning', difficulty: 3,
    question: 'Learning rate quá lớn sẽ gây ra vấn đề gì?',
    options: ['Không hội tụ, dao động quanh minimum', 'Hội tụ nhanh', 'Overfitting', 'Underfitting'],
    correctAnswer: 'Không hội tụ, dao động quanh minimum'
  },
  {
    id: 51, topic: 'Machine Learning', difficulty: 3,
    question: 'Precision và Recall khác nhau như thế nào?',
    options: ['Precision: tỷ lệ đúng trong dự đoán positive; Recall: tỷ lệ tìm được positive thực', 'Giống nhau', 'Precision luôn cao hơn', 'Recall luôn cao hơn'],
    correctAnswer: 'Precision: tỷ lệ đúng trong dự đoán positive; Recall: tỷ lệ tìm được positive thực'
  },
  {
    id: 52, topic: 'Machine Learning', difficulty: 3,
    question: 'F1-Score được tính như thế nào?',
    options: ['Harmonic mean của Precision và Recall', 'Trung bình cộng', 'Tích', 'Hiệu'],
    correctAnswer: 'Harmonic mean của Precision và Recall'
  },
  {
    id: 53, topic: 'Machine Learning', difficulty: 3,
    question: 'ROC-AUC đo lường điều gì?',
    options: ['Khả năng phân biệt giữa các class', 'Tốc độ training', 'Số lượng parameter', 'Kích thước model'],
    correctAnswer: 'Khả năng phân biệt giữa các class'
  },
  {
    id: 54, topic: 'Data Processing', difficulty: 3,
    question: 'PCA (Principal Component Analysis) dùng để?',
    options: ['Giảm chiều dữ liệu giữ lại variance quan trọng', 'Tăng chiều dữ liệu', 'Xóa dữ liệu', 'Nhân đôi dữ liệu'],
    correctAnswer: 'Giảm chiều dữ liệu giữ lại variance quan trọng'
  },
  {
    id: 55, topic: 'Data Processing', difficulty: 3,
    question: 'Feature selection khác feature extraction ở điểm nào?',
    options: ['Selection chọn features có sẵn, extraction tạo features mới', 'Giống nhau', 'Selection tạo features mới', 'Extraction chọn features có sẵn'],
    correctAnswer: 'Selection chọn features có sẵn, extraction tạo features mới'
  },
  {
    id: 56, topic: 'Data Processing', difficulty: 3,
    question: 'Data augmentation trong image processing bao gồm?',
    options: ['Rotation, flip, crop, color jittering', 'Xóa ảnh', 'Nén ảnh', 'Chỉ resize'],
    correctAnswer: 'Rotation, flip, crop, color jittering'
  },
  {
    id: 57, topic: 'Deployment', difficulty: 3,
    question: 'A/B testing trong ML deployment dùng để?',
    options: ['So sánh hiệu suất giữa các phiên bản model', 'Huấn luyện model', 'Thu thập dữ liệu', 'Xóa model cũ'],
    correctAnswer: 'So sánh hiệu suất giữa các phiên bản model'
  },
  {
    id: 58, topic: 'Deployment', difficulty: 3,
    question: 'Model drift là gì?',
    options: ['Hiệu suất model giảm theo thời gian do dữ liệu thay đổi', 'Model chạy nhanh hơn', 'Model tự cải thiện', 'Model bị xóa'],
    correctAnswer: 'Hiệu suất model giảm theo thời gian do dữ liệu thay đổi'
  },
  {
    id: 59, topic: 'Deployment', difficulty: 3,
    question: 'MLOps là gì?',
    options: ['Kết hợp ML và DevOps để tự động hóa ML lifecycle', 'Loại model mới', 'Ngôn ngữ lập trình', 'Database'],
    correctAnswer: 'Kết hợp ML và DevOps để tự động hóa ML lifecycle'
  },
  {
    id: 60, topic: 'AI Cơ bản', difficulty: 3,
    question: 'Turing Test đánh giá điều gì?',
    options: ['Khả năng máy mô phỏng hành vi con người', 'Tốc độ tính toán', 'Bộ nhớ máy tính', 'Kích thước phần cứng'],
    correctAnswer: 'Khả năng máy mô phỏng hành vi con người'
  }
];

// Hàm lấy câu hỏi theo loại bài kiểm tra
export const getQuestionsForExam = (examType, topic = null) => {
  const config = EXAM_TYPES[examType] || EXAM_TYPES.PRACTICE;
  let questions = [...questionBankAI];
  
  // Lọc theo topic nếu có
  if (topic) {
    questions = questions.filter(q => q.topic === topic);
  }
  
  // Trộn câu hỏi ngẫu nhiên
  questions = questions.sort(() => Math.random() - 0.5);
  
  // Phân bổ độ khó theo loại bài kiểm tra
  let selectedQuestions = [];
  const count = config.questionCount;
  
  if (examType === 'PRACTICE') {
    // Luyện tập: 70% dễ, 30% trung bình
    const easy = questions.filter(q => q.difficulty === 1).slice(0, Math.ceil(count * 0.7));
    const medium = questions.filter(q => q.difficulty === 2).slice(0, Math.floor(count * 0.3));
    selectedQuestions = [...easy, ...medium];
  } else if (examType === 'QUIZ_15') {
    // 15 phút: 50% dễ, 40% trung bình, 10% khó
    const easy = questions.filter(q => q.difficulty === 1).slice(0, Math.ceil(count * 0.5));
    const medium = questions.filter(q => q.difficulty === 2).slice(0, Math.ceil(count * 0.4));
    const hard = questions.filter(q => q.difficulty === 3).slice(0, Math.floor(count * 0.1));
    selectedQuestions = [...easy, ...medium, ...hard];
  } else if (examType === 'MIDTERM') {
    // Giữa kỳ: 30% dễ, 50% trung bình, 20% khó
    const easy = questions.filter(q => q.difficulty === 1).slice(0, Math.ceil(count * 0.3));
    const medium = questions.filter(q => q.difficulty === 2).slice(0, Math.ceil(count * 0.5));
    const hard = questions.filter(q => q.difficulty === 3).slice(0, Math.floor(count * 0.2));
    selectedQuestions = [...easy, ...medium, ...hard];
  } else if (examType === 'FINAL') {
    // Học kỳ: 20% dễ, 50% trung bình, 30% khó
    const easy = questions.filter(q => q.difficulty === 1).slice(0, Math.ceil(count * 0.2));
    const medium = questions.filter(q => q.difficulty === 2).slice(0, Math.ceil(count * 0.5));
    const hard = questions.filter(q => q.difficulty === 3).slice(0, Math.floor(count * 0.3));
    selectedQuestions = [...easy, ...medium, ...hard];
  }
  
  // Trộn lại và giới hạn số câu
  selectedQuestions = selectedQuestions.sort(() => Math.random() - 0.5).slice(0, count);
  
  // Nếu không đủ câu, bổ sung từ pool chung
  while (selectedQuestions.length < count && questions.length > selectedQuestions.length) {
    const remaining = questions.filter(q => !selectedQuestions.includes(q));
    if (remaining.length > 0) {
      selectedQuestions.push(remaining[0]);
    } else {
      break;
    }
  }
  
  return selectedQuestions.slice(0, count);
};

// Export tất cả câu hỏi
export default questionBankAI;
