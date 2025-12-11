import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Box, TextField, Button, Paper, Typography, AppBar, Toolbar, IconButton, Avatar, Chip, Alert
} from '@mui/material';
import { ArrowBack, Send, SmartToy, Person, DeleteOutline, AutoAwesome } from '@mui/icons-material';
import { chatbotAPI } from '../services/api';
import { geminiAPI } from '../services/geminiApi';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadHistory = async () => {
    try {
      const response = await chatbotAPI.getHistory(20);
      const history = response.data.history.map(h => [
        { text: h.message, sender: 'user', timestamp: h.timestamp },
        { text: h.response, sender: 'bot', timestamp: h.timestamp }
      ]).flat();
      setMessages(history);
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user', timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await chatbotAPI.ask(input);
      const botMessage = {
        text: response.data.response,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        category: response.data.category
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        text: 'Xin lỗi, tôi gặp sự cố. Vui lòng thử lại sau.',
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isAIEnabled = geminiAPI.isConfigured();

  const handleClearChat = () => {
    setMessages([]);
    if (geminiAPI.clearHistory) {
      geminiAPI.clearHistory();
    }
  };

  const quickQuestions = [
    'Giải phương trình bậc 2: x² - 5x + 6 = 0',
    'Giải thích định luật Newton',
    'Cách học từ vựng tiếng Anh hiệu quả',
    'Phân tích bài thơ Sóng của Xuân Quỳnh',
    'Cân bằng phương trình hóa học',
    'Mẹo làm bài thi trắc nghiệm'
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/dashboard')}>
            <ArrowBack />
          </IconButton>
          {isAIEnabled ? <AutoAwesome sx={{ mr: 1 }} /> : <SmartToy sx={{ mr: 1 }} />}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {isAIEnabled ? 'Trợ Lý AI Gemini' : 'Chatbot Hỗ Trợ Học Tập'}
          </Typography>
          {messages.length > 0 && (
            <IconButton color="inherit" onClick={handleClearChat} title="Xóa cuộc trò chuyện">
              <DeleteOutline />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', py: 2 }}>
        <Paper elevation={3} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <Box sx={{ p: 2, bgcolor: isAIEnabled ? 'success.main' : 'primary.light' }}>
            <Typography variant="body2" color="white">
              {isAIEnabled 
                ? '🚀 Gemini AI đã sẵn sàng! Hỏi bất kỳ câu hỏi nào về học tập - Toán, Lý, Hóa, Sinh, Văn, Anh...'
                : '🤖 Chế độ Demo - Để có AI thông minh hơn, hãy cấu hình Gemini API Key'}
            </Typography>
          </Box>

          {!isAIEnabled && (
            <Alert severity="info" sx={{ m: 2 }}>
              <strong>Nâng cấp AI:</strong> Lấy API Key miễn phí tại{' '}
              <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer">
                Google AI Studio
              </a>
              {' '}rồi điền vào file <code>frontend/src/services/geminiApi.js</code>
            </Alert>
          )}

          {messages.length === 0 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Câu hỏi gợi ý:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {quickQuestions.map((q, index) => (
                  <Chip
                    key={index}
                    label={q}
                    onClick={() => setInput(q)}
                    variant="outlined"
                    color="primary"
                  />
                ))}
              </Box>
            </Box>
          )}

          <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2
                }}
              >
                {msg.sender === 'bot' && (
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>
                    <SmartToy />
                  </Avatar>
                )}
                <Paper
                  sx={{
                    p: 2,
                    maxWidth: '70%',
                    bgcolor: msg.sender === 'user' ? 'primary.main' : 'grey.200',
                    color: msg.sender === 'user' ? 'white' : 'text.primary'
                  }}
                >
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                    {msg.text}
                  </Typography>
                </Paper>
                {msg.sender === 'user' && (
                  <Avatar sx={{ bgcolor: 'secondary.main', ml: 1 }}>
                    <Person />
                  </Avatar>
                )}
              </Box>
            ))}
            {loading && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>
                  <SmartToy />
                </Avatar>
                <Paper sx={{ p: 2, bgcolor: 'grey.200' }}>
                  <Typography variant="body2">Đang suy nghĩ...</Typography>
                </Paper>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          <Box sx={{ p: 2, bgcolor: 'grey.100', display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              multiline
              maxRows={3}
              placeholder="Nhập câu hỏi của bạn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            <Button
              variant="contained"
              endIcon={<Send />}
              onClick={handleSend}
              disabled={loading || !input.trim()}
            >
              Gửi
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default Chatbot;
