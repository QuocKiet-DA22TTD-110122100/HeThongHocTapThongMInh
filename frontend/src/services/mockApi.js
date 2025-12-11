// Mock API cho demo - Dữ liệu từ Database QuanLyHeThongHocTap

import { SUBJECTS, EXAM_TYPES, calculateScore, getGrade, getQuestionsForExam, allQuestions } from './questionBank';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ==================== DỮ LIỆU TỪ DATABASE ====================

// Bảng TaiKhoan
const dbTaiKhoan = [
  { MaTaiKhoan: 1, TenDangNhap: 'nguoihoc01', MatKhau: 'pass123', VaiTro: 'NguoiHoc', TrangThai: 'HoatDong' },
  { MaTaiKhoan: 2, TenDangNhap: 'nguoihoc02', MatKhau: 'pass123', VaiTro: 'NguoiHoc', TrangThai: 'HoatDong' },
  { MaTaiKhoan: 3, TenDangNhap: 'giaovien01', MatKhau: 'pass123', VaiTro: 'GiaoVien', TrangThai: 'HoatDong' },
  { MaTaiKhoan: 4, TenDangNhap: 'quantri01', MatKhau: 'pass123', VaiTro: 'QuanTri', TrangThai: 'HoatDong' },
  { MaTaiKhoan: 5, TenDangNhap: 'nguoihoc03', MatKhau: 'pass123', VaiTro: 'NguoiHoc', TrangThai: 'Khoa' }
];

// Bảng NguoiHoc
const dbNguoiHoc = [
  { MaNguoiHoc: 1, HoTen: 'Nguyễn Văn A', Email: 'a@example.com', TrinhDoHienTai: 'Bắt đầu', PhongCachHoc: 'Thị giác', MaTaiKhoan: 1 },
  { MaNguoiHoc: 2, HoTen: 'Lê Thị B', Email: 'b@example.com', TrinhDoHienTai: 'Trung bình', PhongCachHoc: 'Thính giác', MaTaiKhoan: 2 },
  { MaNguoiHoc: 3, HoTen: 'Trần Văn C', Email: 'c@example.com', TrinhDoHienTai: 'Nâng cao', PhongCachHoc: 'Hành động', MaTaiKhoan: 5 },
  { MaNguoiHoc: 4, HoTen: 'Phạm D', Email: 'd@example.com', TrinhDoHienTai: 'Trung bình', PhongCachHoc: 'Thị giác', MaTaiKhoan: null },
  { MaNguoiHoc: 5, HoTen: 'Hoàng E', Email: 'e@example.com', TrinhDoHienTai: 'Bắt đầu', PhongCachHoc: 'Thính giác', MaTaiKhoan: null }
];

// Bảng BaiHoc
const dbBaiHoc = [
  { MaBaiHoc: 1, TieuDe: 'Giới thiệu AI', MoTa: 'Nội dung cơ bản về AI', DoKho: 1, ChuDe: 'AI Cơ bản' },
  { MaBaiHoc: 2, TieuDe: 'Học máy', MoTa: 'Khái niệm machine learning', DoKho: 2, ChuDe: 'Machine Learning' },
  { MaBaiHoc: 3, TieuDe: 'Học sâu', MoTa: 'Giới thiệu Deep Learning', DoKho: 3, ChuDe: 'Deep Learning' },
  { MaBaiHoc: 4, TieuDe: 'Triển khai mô hình', MoTa: 'Cách triển khai mô hình AI', DoKho: 2, ChuDe: 'Deployment' },
  { MaBaiHoc: 5, TieuDe: 'Xử lý dữ liệu', MoTa: 'Kỹ thuật tiền xử lý dữ liệu', DoKho: 1, ChuDe: 'Data Processing' }
];

// Bảng CauHoi - correctAnswer là TEXT của đáp án đúng (để so sánh trực tiếp với answer từ frontend)
const dbCauHoi = [
  { MaCauHoi: 1, MaBaiHoc: 1, NoiDung: 'AI là gì?', LoaiCauHoi: 'Trắc nghiệm', DoKho: 1, 
    options: ['Trí tuệ nhân tạo', 'Phần mềm máy tính', 'Ngôn ngữ lập trình', 'Hệ điều hành'], 
    correctAnswer: 'Trí tuệ nhân tạo' },
  { MaCauHoi: 2, MaBaiHoc: 2, NoiDung: 'Định nghĩa học máy?', LoaiCauHoi: 'Trắc nghiệm', DoKho: 2,
    options: ['Máy tính tự học từ dữ liệu', 'Lập trình thủ công', 'Thiết kế phần cứng', 'Quản lý database'], 
    correctAnswer: 'Máy tính tự học từ dữ liệu' },
  { MaCauHoi: 3, MaBaiHoc: 3, NoiDung: 'Mạng neural hoạt động như thế nào?', LoaiCauHoi: 'Tự luận', DoKho: 3,
    correctAnswer: null },
  { MaCauHoi: 4, MaBaiHoc: 4, NoiDung: 'Các bước triển khai mô hình AI?', LoaiCauHoi: 'Tự luận', DoKho: 2,
    correctAnswer: null },
  { MaCauHoi: 5, MaBaiHoc: 5, NoiDung: 'Preprocessing là gì?', LoaiCauHoi: 'Trắc nghiệm', DoKho: 1,
    options: ['Tiền xử lý dữ liệu', 'Huấn luyện mô hình', 'Đánh giá kết quả', 'Triển khai ứng dụng'], 
    correctAnswer: 'Tiền xử lý dữ liệu' }
];

// Bảng NoiDungHoc
const dbNoiDungHoc = [
  { MaNoiDung: 1, MaBaiHoc: 1, LoaiNoiDung: 'Video', DuongDanNoiDung: '/videos/intro_ai.mp4' },
  { MaNoiDung: 2, MaBaiHoc: 2, LoaiNoiDung: 'PDF', DuongDanNoiDung: '/docs/machine_learning.pdf' },
  { MaNoiDung: 3, MaBaiHoc: 3, LoaiNoiDung: 'Video', DuongDanNoiDung: '/videos/deep_learning.mp4' },
  { MaNoiDung: 4, MaBaiHoc: 4, LoaiNoiDung: 'Bài viết', DuongDanNoiDung: '/docs/deployment_guide.docx' },
  { MaNoiDung: 5, MaBaiHoc: 5, LoaiNoiDung: 'PDF', DuongDanNoiDung: '/docs/data_processing.pdf' }
];

// Bảng HoatDongHocTap
const dbHoatDongHocTap = [
  { MaHoatDong: 1, MaNguoiHoc: 1, MaBaiHoc: 1, DiemSo: 8.5, ThoiGianLam: 300 },
  { MaHoatDong: 2, MaNguoiHoc: 2, MaBaiHoc: 2, DiemSo: 7.0, ThoiGianLam: 450 },
  { MaHoatDong: 3, MaNguoiHoc: 3, MaBaiHoc: 3, DiemSo: 9.0, ThoiGianLam: 500 },
  { MaHoatDong: 4, MaNguoiHoc: 4, MaBaiHoc: 4, DiemSo: 8.0, ThoiGianLam: 350 },
  { MaHoatDong: 5, MaNguoiHoc: 5, MaBaiHoc: 5, DiemSo: 6.5, ThoiGianLam: 400 }
];

// Bảng KetQuaDanhGia
const dbKetQuaDanhGia = [
  { MaKetQua: 1, MaNguoiHoc: 1, MaBaiHoc: 1, TongDiem: 8.5, MucDoThanhThao: 'Tốt' },
  { MaKetQua: 2, MaNguoiHoc: 2, MaBaiHoc: 2, TongDiem: 7.0, MucDoThanhThao: 'Trung bình' },
  { MaKetQua: 3, MaNguoiHoc: 3, MaBaiHoc: 3, TongDiem: 9.0, MucDoThanhThao: 'Giỏi' },
  { MaKetQua: 4, MaNguoiHoc: 4, MaBaiHoc: 4, TongDiem: 8.0, MucDoThanhThao: 'Khá' },
  { MaKetQua: 5, MaNguoiHoc: 5, MaBaiHoc: 5, TongDiem: 6.5, MucDoThanhThao: 'Yếu' }
];

// Bảng GoiYAI
const dbGoiYAI = [
  { MaGoiY: 1, MaNguoiHoc: 1, MaBaiHoc: 2, DoTinCay: 0.85 },
  { MaGoiY: 2, MaNguoiHoc: 2, MaBaiHoc: 3, DoTinCay: 0.90 },
  { MaGoiY: 3, MaNguoiHoc: 3, MaBaiHoc: 4, DoTinCay: 0.75 },
  { MaGoiY: 4, MaNguoiHoc: 4, MaBaiHoc: 1, DoTinCay: 0.80 },
  { MaGoiY: 5, MaNguoiHoc: 5, MaBaiHoc: 2, DoTinCay: 0.70 }
];

// ==================== MOCK USERS (cho đăng ký mới) ====================
const mockUsers = [...dbTaiKhoan];
let currentUser = null;


// ==================== MOCK AUTH API ====================
export const mockAuthAPI = {
  register: async (data) => {
    await delay(500);
    // Kiểm tra tên đăng nhập đã tồn tại
    if (mockUsers.find(u => u.TenDangNhap === data.username)) {
      throw { response: { data: { error: 'Tên đăng nhập đã tồn tại' } } };
    }
    const newId = Math.max(...mockUsers.map(u => u.MaTaiKhoan)) + 1;
    const user = {
      MaTaiKhoan: newId,
      TenDangNhap: data.username,
      MatKhau: data.password,
      VaiTro: 'NguoiHoc',
      TrangThai: 'HoatDong',
      HoTen: data.full_name,
      Email: data.email,
      Lop: data.grade
    };
    mockUsers.push(user);
    return { data: { message: 'Đăng ký thành công', user_id: newId } };
  },

  login: async (data) => {
    await delay(500);
    const taiKhoan = mockUsers.find(u => u.TenDangNhap === data.username);
    
    if (!taiKhoan) {
      throw { response: { data: { error: 'Tên đăng nhập không tồn tại' } } };
    }
    if (taiKhoan.MatKhau !== data.password) {
      throw { response: { data: { error: 'Mật khẩu không đúng' } } };
    }
    if (taiKhoan.TrangThai === 'Khoa') {
      throw { response: { data: { error: 'Tài khoản đã bị khóa' } } };
    }

    // Tìm thông tin người học
    const nguoiHoc = dbNguoiHoc.find(n => n.MaTaiKhoan === taiKhoan.MaTaiKhoan);
    currentUser = { ...taiKhoan, ...nguoiHoc };

    return {
      data: {
        access_token: 'mock-token-' + taiKhoan.MaTaiKhoan,
        user: {
          id: taiKhoan.MaTaiKhoan,
          username: taiKhoan.TenDangNhap,
          full_name: nguoiHoc?.HoTen || taiKhoan.HoTen || taiKhoan.TenDangNhap,
          email: nguoiHoc?.Email || taiKhoan.Email,
          grade: taiKhoan.Lop,
          role: taiKhoan.VaiTro,
          level: nguoiHoc?.TrinhDoHienTai || 'Bắt đầu',
          learning_style: nguoiHoc?.PhongCachHoc || 'Thị giác'
        }
      }
    };
  }
};

// ==================== MOCK ASSESSMENT API ====================
export const mockAssessmentAPI = {
  // Lấy danh sách loại bài kiểm tra
  getExamTypes: async () => {
    await delay(300);
    return {
      data: {
        examTypes: Object.values(EXAM_TYPES)
      }
    };
  },

  // Bắt đầu bài kiểm tra
  start: async (subjectCode, examType = 'QUIZ_15') => {
    await delay(500);
    
    // Lấy câu hỏi từ ngân hàng câu hỏi theo môn học và loại bài kiểm tra
    const config = EXAM_TYPES[examType] || EXAM_TYPES.QUIZ_15;
    // subjectCode có thể là số (id) hoặc string (code)
    const subjectCodeStr = typeof subjectCode === 'number' ? null : subjectCode;
    const questions = getQuestionsForExam(examType, subjectCodeStr);
    
    // Format câu hỏi cho frontend
    const formattedQuestions = questions.map((q, index) => ({
      id: q.id,
      question: q.question,
      type: 'multiple_choice',
      options: q.options,
      difficulty: q.difficulty,
      topic: q.subject || q.topic,
      questionNumber: index + 1
    }));

    // Tìm tên môn học
    const subjectInfo = Object.values(SUBJECTS).find(s => s.code === subjectCodeStr);

    return {
      data: {
        questions: formattedQuestions,
        examInfo: {
          type: examType,
          name: config.name,
          questionCount: config.questionCount,
          timeLimit: config.timeLimit,
          pointPerQuestion: config.pointPerQuestion,
          description: config.description,
          subject: subjectInfo?.name || 'Tất cả môn'
        }
      }
    };
  },

  // Nộp bài kiểm tra
  submit: async (data) => {
    await delay(1000);
    
    const examType = data.examType || 'QUIZ_15';
    const config = EXAM_TYPES[examType] || EXAM_TYPES.QUIZ_15;
    const answers = data.answers || [];
    
    // Tính điểm
    let correctCount = 0;
    let wrongCount = 0;
    const detailedResults = [];
    
    // Phân tích theo topic
    const topicStats = {};
    
    answers.forEach(ans => {
      const questionId = ans.exercise_id || ans.question_id || ans.id;
      const question = allQuestions.find(q => q.id === questionId);
      
      if (question) {
        const isCorrect = question.correctAnswer === ans.answer;
        
        if (isCorrect) {
          correctCount++;
        } else {
          wrongCount++;
        }
        
        // Thống kê theo topic
        if (!topicStats[question.topic]) {
          topicStats[question.topic] = { correct: 0, total: 0 };
        }
        topicStats[question.topic].total++;
        if (isCorrect) topicStats[question.topic].correct++;
        
        detailedResults.push({
          questionId: question.id,
          question: question.question,
          yourAnswer: ans.answer,
          correctAnswer: question.correctAnswer,
          isCorrect,
          topic: question.topic,
          difficulty: question.difficulty
        });
      }
    });
    
    // Tính điểm theo thang 10
    const score = calculateScore(correctCount, examType);
    const gradeInfo = getGrade(score);
    
    // Phân tích điểm mạnh/yếu
    const strengths = [];
    const weaknesses = [];
    
    Object.entries(topicStats).forEach(([topic, stats]) => {
      const accuracy = Math.round((stats.correct / stats.total) * 100);
      if (accuracy >= 70) {
        strengths.push({ topic, accuracy, correct: stats.correct, total: stats.total });
      } else {
        weaknesses.push({ topic, accuracy, correct: stats.correct, total: stats.total });
      }
    });
    
    // Xếp loại trình độ
    let level = 'Bắt đầu';
    if (score >= 8) level = 'Nâng cao';
    else if (score >= 6.5) level = 'Khá';
    else if (score >= 5) level = 'Trung bình';

    return {
      data: {
        // Thông tin điểm
        score,
        maxScore: 10,
        correctCount,
        wrongCount,
        totalQuestions: config.questionCount,
        pointPerQuestion: config.pointPerQuestion,
        
        // Xếp loại
        grade: gradeInfo.grade,
        gradeColor: gradeInfo.color,
        gradeEmoji: gradeInfo.emoji,
        level,
        
        // Thông tin bài kiểm tra
        examType,
        examName: config.name,
        timeLimit: config.timeLimit,
        
        // Phân tích
        strengths: strengths.length > 0 ? strengths : [{ topic: 'Chưa có dữ liệu', accuracy: 0 }],
        weaknesses: weaknesses.length > 0 ? weaknesses : [{ topic: 'Chưa có dữ liệu', accuracy: 0 }],
        
        // Chi tiết từng câu
        detailedResults,
        
        // Thống kê theo độ khó
        difficultyBreakdown: {
          easy: detailedResults.filter(r => r.difficulty === 1 && r.isCorrect).length,
          easyTotal: detailedResults.filter(r => r.difficulty === 1).length,
          medium: detailedResults.filter(r => r.difficulty === 2 && r.isCorrect).length,
          mediumTotal: detailedResults.filter(r => r.difficulty === 2).length,
          hard: detailedResults.filter(r => r.difficulty === 3 && r.isCorrect).length,
          hardTotal: detailedResults.filter(r => r.difficulty === 3).length
        }
      }
    };
  }
};

// ==================== MOCK LESSON API ====================
export const mockLessonAPI = {
  getRecommended: async (subjectId) => {
    await delay(500);
    // Lấy gợi ý AI cho user hiện tại
    const userId = currentUser?.MaNguoiHoc || 1;
    const goiY = dbGoiYAI.filter(g => g.MaNguoiHoc === userId);
    
    // Lấy bài học được gợi ý + tất cả bài học
    const lessons = dbBaiHoc.map(bh => {
      const recommended = goiY.find(g => g.MaBaiHoc === bh.MaBaiHoc);
      const noiDung = dbNoiDungHoc.find(nd => nd.MaBaiHoc === bh.MaBaiHoc);
      return {
        id: bh.MaBaiHoc,
        title: bh.TieuDe,
        description: bh.MoTa,
        difficulty: bh.DoKho,
        topic: bh.ChuDe,
        content_type: noiDung?.LoaiNoiDung || 'Bài viết',
        content_url: noiDung?.DuongDanNoiDung,
        confidence: recommended?.DoTinCay || 0.5,
        is_recommended: !!recommended
      };
    });

    // Sắp xếp theo độ tin cậy gợi ý
    lessons.sort((a, b) => b.confidence - a.confidence);

    const userLevel = currentUser?.TrinhDoHienTai || 'Trung bình';
    return {
      data: {
        lessons,
        user_level: userLevel
      }
    };
  },

  getLesson: async (lessonId) => {
    await delay(500);
    const baiHoc = dbBaiHoc.find(bh => bh.MaBaiHoc === parseInt(lessonId));
    const noiDung = dbNoiDungHoc.find(nd => nd.MaBaiHoc === parseInt(lessonId));
    const cauHoi = dbCauHoi.filter(ch => ch.MaBaiHoc === parseInt(lessonId));

    if (!baiHoc) {
      throw { response: { data: { error: 'Không tìm thấy bài học' } } };
    }

    // Nội dung chi tiết cho từng bài
    const detailedContent = {
      1: `# Giới thiệu về Trí tuệ Nhân tạo (AI)

## 1. AI là gì?
Trí tuệ nhân tạo (Artificial Intelligence - AI) là một lĩnh vực của khoa học máy tính tập trung vào việc tạo ra các hệ thống có khả năng thực hiện các nhiệm vụ thường đòi hỏi trí thông minh của con người.

## 2. Các loại AI
- **AI hẹp (Narrow AI)**: Được thiết kế cho một nhiệm vụ cụ thể
- **AI tổng quát (General AI)**: Có khả năng học và thực hiện bất kỳ nhiệm vụ nào
- **Siêu AI (Super AI)**: Vượt trội hơn trí tuệ con người

## 3. Ứng dụng của AI
- Nhận dạng giọng nói và hình ảnh
- Xe tự lái
- Chatbot và trợ lý ảo
- Dự đoán và phân tích dữ liệu`,

      2: `# Học máy (Machine Learning)

## 1. Định nghĩa
Học máy là một nhánh của AI cho phép máy tính học từ dữ liệu mà không cần được lập trình cụ thể.

## 2. Các loại học máy
- **Học có giám sát (Supervised Learning)**: Học từ dữ liệu có nhãn
- **Học không giám sát (Unsupervised Learning)**: Tìm pattern trong dữ liệu không có nhãn
- **Học tăng cường (Reinforcement Learning)**: Học qua thử và sai

## 3. Quy trình học máy
1. Thu thập dữ liệu
2. Tiền xử lý dữ liệu
3. Chọn mô hình
4. Huấn luyện mô hình
5. Đánh giá và tối ưu`,

      3: `# Học sâu (Deep Learning)

## 1. Giới thiệu
Học sâu là một nhánh của học máy sử dụng mạng neural nhiều lớp để học các biểu diễn phức tạp của dữ liệu.

## 2. Mạng Neural
- **Neuron**: Đơn vị cơ bản xử lý thông tin
- **Layer**: Các lớp neuron kết nối với nhau
- **Activation Function**: Hàm kích hoạt (ReLU, Sigmoid, Tanh)

## 3. Các kiến trúc phổ biến
- CNN (Convolutional Neural Network): Xử lý hình ảnh
- RNN (Recurrent Neural Network): Xử lý chuỗi
- Transformer: Xử lý ngôn ngữ tự nhiên`,

      4: `# Triển khai mô hình AI

## 1. Các bước triển khai
1. **Chuẩn bị mô hình**: Export model đã huấn luyện
2. **Containerization**: Đóng gói với Docker
3. **API Development**: Tạo REST API
4. **Deployment**: Triển khai lên cloud

## 2. Các nền tảng triển khai
- AWS SageMaker
- Google Cloud AI Platform
- Azure Machine Learning
- Heroku, Railway

## 3. Monitoring và Maintenance
- Theo dõi hiệu suất
- Cập nhật mô hình định kỳ
- Xử lý drift trong dữ liệu`,

      5: `# Xử lý dữ liệu (Data Processing)

## 1. Tiền xử lý dữ liệu
- **Làm sạch dữ liệu**: Xử lý missing values, outliers
- **Chuẩn hóa**: Scaling, normalization
- **Encoding**: One-hot encoding, label encoding

## 2. Feature Engineering
- Tạo features mới từ dữ liệu có sẵn
- Chọn features quan trọng
- Giảm chiều dữ liệu (PCA, t-SNE)

## 3. Data Augmentation
- Tăng cường dữ liệu cho training
- Các kỹ thuật: rotation, flip, crop, noise`
    };

    // Lấy 10 câu hỏi từ ngân hàng câu hỏi (thay vì chỉ từ dbCauHoi)
    // Map bài học với môn học tương ứng
    const lessonToSubject = {
      1: 'AI_ML',      // Giới thiệu AI
      2: 'AI_ML',      // Học máy  
      3: 'AI_ML',      // Học sâu
      4: 'AI_ML',      // Triển khai mô hình
      5: 'AI_ML'       // Xử lý dữ liệu
    };
    
    const subjectCode = lessonToSubject[baiHoc.MaBaiHoc] || 'AI_ML';
    
    // Lấy câu hỏi từ ngân hàng câu hỏi theo môn học
    let exercisesFromBank = allQuestions
      .filter(q => q.subject === subjectCode)
      .sort(() => Math.random() - 0.5)
      .slice(0, 10); // Lấy 10 câu cho bài tập
    
    // Nếu không đủ câu, lấy thêm từ các môn khác
    if (exercisesFromBank.length < 10) {
      const moreQuestions = allQuestions
        .filter(q => !exercisesFromBank.find(e => e.id === q.id))
        .sort(() => Math.random() - 0.5)
        .slice(0, 10 - exercisesFromBank.length);
      exercisesFromBank = [...exercisesFromBank, ...moreQuestions];
    }

    return {
      data: {
        lesson: {
          id: baiHoc.MaBaiHoc,
          title: baiHoc.TieuDe,
          description: baiHoc.MoTa,
          content: detailedContent[baiHoc.MaBaiHoc] || baiHoc.MoTa,
          difficulty: baiHoc.DoKho,
          topic: baiHoc.ChuDe,
          content_type: noiDung?.LoaiNoiDung,
          content_url: noiDung?.DuongDanNoiDung
        },
        exercises: exercisesFromBank.map((q, index) => ({
          id: q.id,
          question: q.question,
          type: 'multiple_choice',
          options: q.options || [],
          difficulty: q.difficulty,
          points: 1, // Mỗi câu 1 điểm, tổng 10 câu = 10 điểm
          questionNumber: index + 1
        })),
        exerciseInfo: {
          totalQuestions: exercisesFromBank.length,
          pointPerQuestion: 1,
          maxScore: 10,
          timeLimit: 10 // 10 phút cho 10 câu
        }
      }
    };
  }
};


// ==================== MOCK PROGRESS API ====================
export const mockProgressAPI = {
  get: async (subjectId) => {
    await delay(500);
    const userId = currentUser?.MaNguoiHoc || 1;
    
    // Lấy hoạt động học tập của user
    const hoatDong = dbHoatDongHocTap.filter(hd => hd.MaNguoiHoc === userId);
    const ketQua = dbKetQuaDanhGia.filter(kq => kq.MaNguoiHoc === userId);

    const progress = dbBaiHoc.map(bh => {
      const hd = hoatDong.find(h => h.MaBaiHoc === bh.MaBaiHoc);
      const kq = ketQua.find(k => k.MaBaiHoc === bh.MaBaiHoc);
      
      let status = 'not_started';
      let completion = 0;
      
      if (kq) {
        status = 'completed';
        completion = 100;
      } else if (hd) {
        status = 'in_progress';
        completion = Math.min(90, Math.round((hd.DiemSo / 10) * 100));
      }

      return {
        lesson_id: bh.MaBaiHoc,
        lesson_title: bh.TieuDe,
        topic: bh.ChuDe,
        status,
        completion,
        score: hd?.DiemSo || kq?.TongDiem || 0,
        time_spent: hd?.ThoiGianLam || 0,
        mastery_level: kq?.MucDoThanhThao || 'Chưa đánh giá',
        last_accessed: new Date().toISOString()
      };
    });

    const completed = progress.filter(p => p.status === 'completed').length;
    const inProgress = progress.filter(p => p.status === 'in_progress').length;

    return {
      data: {
        progress,
        summary: {
          total_lessons: dbBaiHoc.length,
          completed,
          in_progress: inProgress,
          not_started: dbBaiHoc.length - completed - inProgress,
          completion_rate: Math.round((completed / dbBaiHoc.length) * 100),
          average_score: hoatDong.length > 0 
            ? Math.round(hoatDong.reduce((sum, h) => sum + h.DiemSo, 0) / hoatDong.length * 10) / 10
            : 0
        }
      }
    };
  },

  update: async (data) => {
    await delay(300);
    return { data: { message: 'Cập nhật tiến độ thành công' } };
  }
};

// ==================== MOCK EXERCISE API ====================
export const mockExerciseAPI = {
  submit: async (data) => {
    await delay(500);
    
    // Tìm câu hỏi từ allQuestions (ngân hàng câu hỏi) trước, sau đó từ dbCauHoi
    let question = allQuestions.find(q => q.id === data.exercise_id);
    
    let isCorrect = false;
    let explanation = '';
    let correctAnswer = '';

    if (question && question.correctAnswer) {
      // So sánh trực tiếp text đáp án
      isCorrect = question.correctAnswer === data.answer;
      correctAnswer = question.correctAnswer;
      explanation = isCorrect 
        ? 'Chính xác! Bạn đã trả lời đúng. 🎉'
        : `Đáp án đúng là: ${correctAnswer}`;
    } else {
      // Tìm trong dbCauHoi (câu hỏi cũ)
      const oldQuestion = dbCauHoi.find(q => q.MaCauHoi === data.exercise_id);
      if (oldQuestion && oldQuestion.correctAnswer) {
        isCorrect = oldQuestion.correctAnswer === data.answer;
        correctAnswer = oldQuestion.correctAnswer;
        explanation = isCorrect 
          ? 'Chính xác! Bạn đã trả lời đúng. 🎉'
          : `Đáp án đúng là: ${correctAnswer}`;
      } else if (oldQuestion && !oldQuestion.correctAnswer) {
        // Câu tự luận
        const answerLength = (data.answer || '').length;
        isCorrect = answerLength > 20;
        explanation = isCorrect 
          ? 'Câu trả lời của bạn khá tốt! 👍'
          : 'Câu trả lời cần bổ sung thêm chi tiết.';
      } else {
        explanation = 'Không tìm thấy câu hỏi trong hệ thống.';
      }
    }

    return {
      data: {
        is_correct: isCorrect,
        score: isCorrect ? 1 : 0, // Mỗi câu 1 điểm
        explanation,
        correct_answer: correctAnswer
      }
    };
  },

  // Nộp nhiều câu hỏi cùng lúc (cho LessonDetail)
  submitAll: async (data) => {
    await delay(800);
    
    const answers = data.answers || [];
    const examType = data.examType || 'PRACTICE';
    
    // Cấu hình điểm theo loại bài kiểm tra
    const examConfig = {
      'PRACTICE': { questionCount: 10, pointPerQuestion: 1 },      // 10 câu x 1đ = 10đ
      'QUIZ_15': { questionCount: 20, pointPerQuestion: 0.5 },     // 20 câu x 0.5đ = 10đ
      'MIDTERM': { questionCount: 40, pointPerQuestion: 0.25 },    // 40 câu x 0.25đ = 10đ
      'FINAL': { questionCount: 50, pointPerQuestion: 0.2 }        // 50 câu x 0.2đ = 10đ
    };
    
    const config = examConfig[examType] || examConfig['PRACTICE'];
    
    let correctCount = 0;
    let wrongCount = 0;
    const detailedResults = [];
    
    answers.forEach(ans => {
      const questionId = ans.exercise_id || ans.question_id || ans.id;
      const question = allQuestions.find(q => q.id === questionId);
      
      if (question) {
        const isCorrect = question.correctAnswer === ans.answer;
        
        if (isCorrect) {
          correctCount++;
        } else if (ans.answer) {
          wrongCount++;
        }
        
        detailedResults.push({
          questionId: question.id,
          question: question.question,
          yourAnswer: ans.answer,
          correctAnswer: question.correctAnswer,
          isCorrect,
          topic: question.topic,
          difficulty: question.difficulty
        });
      }
    });
    
    // Tính điểm theo thang 10 với điểm/câu tương ứng
    const score = Math.round(correctCount * config.pointPerQuestion * 10) / 10;
    
    // Xếp loại
    let grade = 'Yếu';
    let gradeColor = 'error';
    let gradeEmoji = '😢';
    
    if (score >= 9) { grade = 'Xuất sắc'; gradeColor = 'success'; gradeEmoji = '🏆'; }
    else if (score >= 8) { grade = 'Giỏi'; gradeColor = 'success'; gradeEmoji = '🌟'; }
    else if (score >= 6.5) { grade = 'Khá'; gradeColor = 'info'; gradeEmoji = '👍'; }
    else if (score >= 5) { grade = 'Trung bình'; gradeColor = 'warning'; gradeEmoji = '📚'; }

    return {
      data: {
        score,
        maxScore: 10,
        correctCount,
        wrongCount,
        totalQuestions: answers.length,
        pointPerQuestion: config.pointPerQuestion,
        examType,
        grade,
        gradeColor,
        gradeEmoji,
        detailedResults
      }
    };
  }
};

// ==================== MOCK ANALYTICS API ====================
export const mockAnalyticsAPI = {
  getStrengthsWeaknesses: async () => {
    await delay(500);
    const userId = currentUser?.MaNguoiHoc || 1;
    
    // Phân tích từ kết quả đánh giá
    const ketQua = dbKetQuaDanhGia.filter(kq => kq.MaNguoiHoc === userId);
    const hoatDong = dbHoatDongHocTap.filter(hd => hd.MaNguoiHoc === userId);

    // Tính điểm theo chủ đề
    const topicScores = {};
    hoatDong.forEach(hd => {
      const baiHoc = dbBaiHoc.find(bh => bh.MaBaiHoc === hd.MaBaiHoc);
      if (baiHoc) {
        if (!topicScores[baiHoc.ChuDe]) {
          topicScores[baiHoc.ChuDe] = { total: 0, count: 0 };
        }
        topicScores[baiHoc.ChuDe].total += hd.DiemSo;
        topicScores[baiHoc.ChuDe].count += 1;
      }
    });

    const topics = Object.entries(topicScores).map(([topic, data]) => ({
      topic,
      accuracy: Math.round((data.total / data.count) * 10)
    }));

    // Phân loại điểm mạnh/yếu
    const strengths = topics.filter(t => t.accuracy >= 70).sort((a, b) => b.accuracy - a.accuracy);
    const weaknesses = topics.filter(t => t.accuracy < 70).sort((a, b) => a.accuracy - b.accuracy);

    // Thêm các chủ đề chưa học vào điểm yếu
    dbBaiHoc.forEach(bh => {
      if (!topicScores[bh.ChuDe]) {
        weaknesses.push({ topic: bh.ChuDe, accuracy: 0, status: 'Chưa học' });
      }
    });

    const overallPerformance = hoatDong.length > 0
      ? Math.round(hoatDong.reduce((sum, h) => sum + h.DiemSo, 0) / hoatDong.length * 10)
      : 0;

    return {
      data: {
        strengths: strengths.length > 0 ? strengths : [{ topic: 'AI Cơ bản', accuracy: 85 }],
        weaknesses: weaknesses.length > 0 ? weaknesses : [{ topic: 'Deep Learning', accuracy: 45 }],
        overall_performance: overallPerformance || 67.5,
        total_time_spent: hoatDong.reduce((sum, h) => sum + h.ThoiGianLam, 0),
        lessons_completed: ketQua.length,
        average_mastery: ketQua.length > 0 
          ? ketQua.map(k => k.MucDoThanhThao).join(', ')
          : 'Chưa có đánh giá'
      }
    };
  }
};

// ==================== MOCK PREDICTION API ====================
export const mockPredictionAPI = {
  getResults: async (subjectId) => {
    await delay(500);
    const userId = currentUser?.MaNguoiHoc || 1;
    
    const hoatDong = dbHoatDongHocTap.filter(hd => hd.MaNguoiHoc === userId);
    const ketQua = dbKetQuaDanhGia.filter(kq => kq.MaNguoiHoc === userId);
    const goiY = dbGoiYAI.filter(g => g.MaNguoiHoc === userId);

    // Tính điểm dự đoán dựa trên hoạt động
    let predictedScore = 70;
    if (hoatDong.length > 0) {
      const avgScore = hoatDong.reduce((sum, h) => sum + h.DiemSo, 0) / hoatDong.length;
      predictedScore = Math.min(100, avgScore * 10 + Math.random() * 10);
    }

    // Xác định xu hướng
    let trend = 'Ổn định';
    if (hoatDong.length >= 2) {
      const recent = hoatDong.slice(-2);
      if (recent[1].DiemSo > recent[0].DiemSo) trend = 'Tiến bộ tốt 📈';
      else if (recent[1].DiemSo < recent[0].DiemSo) trend = 'Cần cố gắng hơn 📉';
    }

    // Độ tin cậy dự đoán
    const avgConfidence = goiY.length > 0
      ? goiY.reduce((sum, g) => sum + g.DoTinCay, 0) / goiY.length
      : 0.7;

    const confidence = avgConfidence >= 0.8 ? 'Cao' : avgConfidence >= 0.6 ? 'Trung bình' : 'Thấp';

    // Gợi ý bài học tiếp theo
    const nextLesson = goiY.length > 0 
      ? dbBaiHoc.find(bh => bh.MaBaiHoc === goiY[0].MaBaiHoc)
      : dbBaiHoc[0];

    return {
      data: {
        predicted_score: Math.round(predictedScore * 10) / 10,
        confidence,
        confidence_value: avgConfidence,
        trend,
        lessons_completed: ketQua.length,
        total_lessons: dbBaiHoc.length,
        next_recommended_lesson: nextLesson?.TieuDe || 'Giới thiệu AI',
        recommendation: predictedScore >= 80 
          ? 'Xuất sắc! Hãy thử thách bản thân với các bài học nâng cao.'
          : predictedScore >= 60
            ? 'Tiếp tục duy trì phong độ và ôn tập các phần còn yếu.'
            : 'Cần tập trung học lại các kiến thức cơ bản trước khi tiến xa hơn.'
      }
    };
  }
};

// ==================== MOCK CHATBOT API ====================
export const mockChatbotAPI = {
  ask: async (message) => {
    await delay(800);
    const lowerMsg = message.toLowerCase();
    let response = 'Tôi hiểu câu hỏi của bạn. Hãy cho tôi biết cụ thể hơn nhé!';
    let category = 'general';

    // Tìm kiếm trong bài học
    const matchedLesson = dbBaiHoc.find(bh => 
      lowerMsg.includes(bh.TieuDe.toLowerCase()) || 
      lowerMsg.includes(bh.ChuDe.toLowerCase())
    );

    if (matchedLesson) {
      response = `📚 **${matchedLesson.TieuDe}**\n\n${matchedLesson.MoTa}\n\nĐộ khó: ${'⭐'.repeat(matchedLesson.DoKho)}\nChủ đề: ${matchedLesson.ChuDe}\n\nBạn có muốn học bài này không?`;
      category = 'lesson_info';
    } else if (lowerMsg.includes('chào') || lowerMsg.includes('hello')) {
      response = 'Xin chào! Tôi là trợ lý học tập AI. Tôi có thể giúp bạn:\n- Tìm hiểu về các bài học AI, Machine Learning, Deep Learning\n- Giải đáp thắc mắc về nội dung học\n- Gợi ý bài học phù hợp';
      category = 'greeting';
    } else if (lowerMsg.includes('ai') || lowerMsg.includes('trí tuệ nhân tạo')) {
      response = '🤖 **Trí tuệ nhân tạo (AI)** là lĩnh vực khoa học máy tính tạo ra hệ thống có khả năng thực hiện các nhiệm vụ đòi hỏi trí thông minh.\n\nBạn có thể học bài "Giới thiệu AI" để hiểu rõ hơn!';
      category = 'ai_topic';
    } else if (lowerMsg.includes('machine learning') || lowerMsg.includes('học máy')) {
      response = '🧠 **Học máy (Machine Learning)** cho phép máy tính học từ dữ liệu mà không cần lập trình cụ thể.\n\nCác loại: Supervised, Unsupervised, Reinforcement Learning.\n\nXem bài "Học máy" để tìm hiểu chi tiết!';
      category = 'ml_topic';
    } else if (lowerMsg.includes('deep learning') || lowerMsg.includes('học sâu')) {
      response = '🔮 **Học sâu (Deep Learning)** sử dụng mạng neural nhiều lớp để học các biểu diễn phức tạp.\n\nỨng dụng: Nhận dạng hình ảnh, xử lý ngôn ngữ, xe tự lái...\n\nXem bài "Học sâu" để khám phá!';
      category = 'dl_topic';
    } else if (lowerMsg.includes('tiến độ') || lowerMsg.includes('kết quả')) {
      const userId = currentUser?.MaNguoiHoc || 1;
      const ketQua = dbKetQuaDanhGia.filter(kq => kq.MaNguoiHoc === userId);
      response = `📊 **Tiến độ học tập của bạn:**\n- Bài đã hoàn thành: ${ketQua.length}/${dbBaiHoc.length}\n- Mức độ thành thạo: ${ketQua[0]?.MucDoThanhThao || 'Chưa có'}\n\nHãy tiếp tục cố gắng nhé! 💪`;
      category = 'progress';
    } else if (lowerMsg.includes('gợi ý') || lowerMsg.includes('học gì')) {
      const goiY = dbGoiYAI[0];
      const baiHoc = dbBaiHoc.find(bh => bh.MaBaiHoc === goiY?.MaBaiHoc);
      response = `💡 **Gợi ý cho bạn:**\n\nBài học: **${baiHoc?.TieuDe || 'Giới thiệu AI'}**\nĐộ tin cậy: ${Math.round((goiY?.DoTinCay || 0.8) * 100)}%\n\nBài này phù hợp với trình độ hiện tại của bạn!`;
      category = 'recommendation';
    }

    return {
      data: {
        response,
        category,
        confidence: 0.85
      }
    };
  },

  getHistory: async (limit) => {
    await delay(300);
    return {
      data: {
        history: []
      }
    };
  }
};

// ==================== MOCK SUBJECT API ====================
export const mockSubjectAPI = {
  getAll: async () => {
    await delay(300);
    
    // Danh sách môn học chuyên ngành CNTT
    return {
      data: {
        subjects: [
          { id: 1, code: 'AI_ML', name: 'AI & Machine Learning', icon: '🤖', description: 'Trí tuệ nhân tạo và Học máy', questionCount: 15 },
          { id: 2, code: 'PROGRAMMING', name: 'Kỹ thuật lập trình', icon: '💻', description: 'Lập trình C/C++, thuật toán cơ bản', questionCount: 30 },
          { id: 3, code: 'DATABASE', name: 'Cơ sở dữ liệu', icon: '🗄️', description: 'SQL, thiết kế và quản lý CSDL', questionCount: 30 },
          { id: 4, code: 'OOP', name: 'Lập trình hướng đối tượng', icon: '🎯', description: 'OOP với Java/C++, Design Patterns', questionCount: 30 },
          { id: 5, code: 'IT_INTRO', name: 'Nhập môn CNTT', icon: '📚', description: 'Kiến thức nền tảng về CNTT', questionCount: 30 },
          { id: 6, code: 'DATA_STRUCTURE', name: 'Cấu trúc dữ liệu', icon: '🌳', description: 'Stack, Queue, Tree, Graph, Hash', questionCount: 30 }
        ]
      }
    };
  }
};

// ==================== EXPORT DATABASE CHO DEBUG ====================
export const getDatabase = () => ({
  taiKhoan: dbTaiKhoan,
  nguoiHoc: dbNguoiHoc,
  baiHoc: dbBaiHoc,
  cauHoi: dbCauHoi,
  noiDungHoc: dbNoiDungHoc,
  hoatDongHocTap: dbHoatDongHocTap,
  ketQuaDanhGia: dbKetQuaDanhGia,
  goiYAI: dbGoiYAI
});
