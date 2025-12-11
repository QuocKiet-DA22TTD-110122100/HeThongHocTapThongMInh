// Google Gemini API Service
// Lấy API Key miễn phí tại: https://makersuite.google.com/app/apikey

const GEMINI_API_KEY = ''; // Điền API Key của bạn vào đây
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// System prompt cho chatbot học tập
const SYSTEM_PROMPT = `Bạn là một trợ lý học tập AI thông minh cho học sinh THPT Việt Nam. 

Nhiệm vụ của bạn:
- Giải thích kiến thức các môn: Toán, Lý, Hóa, Sinh, Văn, Anh một cách dễ hiểu
- Hướng dẫn giải bài tập từng bước
- Đưa ra mẹo học tập hiệu quả
- Động viên và khích lệ học sinh
- Trả lời bằng tiếng Việt, thân thiện và dễ hiểu

Quy tắc:
- Giải thích ngắn gọn, rõ ràng
- Dùng ví dụ thực tế khi cần
- Nếu là bài toán, hướng dẫn từng bước
- Khuyến khích học sinh tự suy nghĩ`;

// Lưu lịch sử hội thoại
let conversationHistory = [];

export const geminiAPI = {
  // Kiểm tra API Key đã được cấu hình chưa
  isConfigured: () => {
    return GEMINI_API_KEY && GEMINI_API_KEY.length > 0;
  },

  // Gửi tin nhắn đến Gemini
  ask: async (message) => {
    if (!GEMINI_API_KEY) {
      return {
        data: {
          response: '⚠️ Chưa cấu hình API Key!\n\nĐể sử dụng chatbot AI thông minh:\n1. Truy cập: https://makersuite.google.com/app/apikey\n2. Đăng nhập Google và tạo API Key miễn phí\n3. Mở file: frontend/src/services/geminiApi.js\n4. Điền API Key vào dòng: const GEMINI_API_KEY = \'YOUR_KEY\'',
          category: 'error',
          confidence: 1
        }
      };
    }

    try {
      // Thêm tin nhắn user vào lịch sử
      conversationHistory.push({
        role: 'user',
        parts: [{ text: message }]
      });

      // Giới hạn lịch sử để tránh quá dài
      if (conversationHistory.length > 20) {
        conversationHistory = conversationHistory.slice(-20);
      }

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: SYSTEM_PROMPT }]
            },
            ...conversationHistory
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Lỗi kết nối API');
      }

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Xin lỗi, tôi không thể trả lời lúc này.';

      // Thêm phản hồi AI vào lịch sử
      conversationHistory.push({
        role: 'model',
        parts: [{ text: aiResponse }]
      });

      return {
        data: {
          response: aiResponse,
          category: 'ai_response',
          confidence: 0.95
        }
      };
    } catch (error) {
      console.error('Gemini API Error:', error);
      return {
        data: {
          response: `❌ Lỗi: ${error.message}\n\nVui lòng kiểm tra:\n- API Key có đúng không\n- Kết nối internet\n- Thử lại sau vài giây`,
          category: 'error',
          confidence: 0
        }
      };
    }
  },

  // Lấy lịch sử (mock cho tương thích)
  getHistory: async (limit = 50) => {
    return {
      data: {
        history: []
      }
    };
  },

  // Xóa lịch sử hội thoại
  clearHistory: () => {
    conversationHistory = [];
  }
};

export default geminiAPI;
