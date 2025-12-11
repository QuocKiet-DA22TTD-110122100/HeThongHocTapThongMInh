import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, Card, CardContent, Button, Radio, RadioGroup,
  FormControlLabel, FormControl, AppBar, Toolbar, IconButton, Chip, Alert, 
  CircularProgress, Grid, LinearProgress, Dialog, DialogTitle, DialogContent,
  DialogActions, Table, TableBody, TableCell, TableHead, TableRow
} from '@mui/material';
import { ArrowBack, Timer, CheckCircle, Cancel, Quiz, School } from '@mui/icons-material';
import { assessmentAPI } from '../services/api';

function Assessment() {
  const [examTypes, setExamTypes] = useState([]);
  const [selectedExamType, setSelectedExamType] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [examInfo, setExamInfo] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadExamTypes();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (started && !completed && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [started, completed, timeLeft]);

  const handleTimeUp = useCallback(() => {
    alert('⏰ Hết giờ làm bài! Bài của bạn sẽ được nộp tự động.');
    submitAssessment();
  }, [answers, selectedExamType, questions]);

  const loadExamTypes = async () => {
    try {
      const response = await assessmentAPI.getExamTypes();
      if (response?.data?.examTypes) {
        setExamTypes(response.data.examTypes);
      } else {
        // Fallback nếu API chưa có
        setExamTypes([
          { id: 'PRACTICE', name: 'Luyện tập', questionCount: 10, timeLimit: 10, description: 'Bài luyện tập nhanh' },
          { id: 'QUIZ_15', name: 'Kiểm tra 15 phút', questionCount: 20, timeLimit: 15, description: 'Kiểm tra thường xuyên' },
          { id: 'MIDTERM', name: 'Kiểm tra giữa kỳ', questionCount: 40, timeLimit: 45, description: 'Kiểm tra giữa học kỳ' },
          { id: 'FINAL', name: 'Thi học kỳ', questionCount: 50, timeLimit: 60, description: 'Thi cuối học kỳ' }
        ]);
      }
    } catch (error) {
      console.error('Error loading exam types:', error);
    }
  };

  const startAssessment = async () => {
    if (!selectedExamType) return;
    setLoading(true);
    try {
      const response = await assessmentAPI.start(1, selectedExamType);
      setQuestions(response.data.questions);
      setExamInfo(response.data.examInfo);
      setTimeLeft(response.data.examInfo.timeLimit * 60); // Convert to seconds
      setStarted(true);
    } catch (error) {
      console.error('Error starting assessment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const goToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const submitAssessment = async () => {
    setLoading(true);
    try {
      const formattedAnswers = Object.entries(answers).map(([id, answer]) => ({
        id: parseInt(id),
        exercise_id: parseInt(id),
        answer: answer
      }));

      const response = await assessmentAPI.submit({
        examType: selectedExamType,
        answers: formattedAnswers
      });

      setResult(response.data);
      setCompleted(true);
    } catch (error) {
      console.error('Error submitting assessment:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeLeft <= 60) return 'error';
    if (timeLeft <= 300) return 'warning';
    return 'primary';
  };

  // Màn hình chọn loại bài kiểm tra
  if (!started) {
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => navigate('/dashboard')}>
              <ArrowBack />
            </IconButton>
            <Quiz sx={{ mr: 1 }} />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Đánh Giá Năng Lực
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Chọn loại bài kiểm tra
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Hệ thống sẽ tự động chọn câu hỏi phù hợp với loại bài kiểm tra. Điểm được tính theo thang 10.
              </Typography>
            </CardContent>
          </Card>

          <Grid container spacing={3}>
            {examTypes.map((exam) => (
              <Grid item xs={12} sm={6} key={exam.id}>
                <Card 
                  sx={{ 
                    cursor: 'pointer',
                    border: selectedExamType === exam.id ? '2px solid #1976d2' : '1px solid #e0e0e0',
                    bgcolor: selectedExamType === exam.id ? 'primary.light' : 'white',
                    '&:hover': { boxShadow: 3 }
                  }}
                  onClick={() => setSelectedExamType(exam.id)}
                >
                  <CardContent>
                    <Typography variant="h6" color={selectedExamType === exam.id ? 'white' : 'primary'}>
                      {exam.name}
                    </Typography>
                    <Typography variant="body2" color={selectedExamType === exam.id ? 'white' : 'textSecondary'} sx={{ mt: 1 }}>
                      {exam.description}
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip 
                        size="small" 
                        label={`${exam.questionCount} câu`}
                        color={selectedExamType === exam.id ? 'default' : 'primary'}
                        variant="outlined"
                      />
                      <Chip 
                        size="small" 
                        label={`${exam.timeLimit} phút`}
                        color={selectedExamType === exam.id ? 'default' : 'secondary'}
                        variant="outlined"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={startAssessment}
              disabled={!selectedExamType || loading}
              startIcon={loading ? <CircularProgress size={20} /> : <School />}
            >
              {loading ? 'Đang tải...' : 'Bắt đầu làm bài'}
            </Button>
          </Box>
        </Container>
      </>
    );
  }


  // Màn hình kết quả
  if (completed && result) {
    return (
      <>
        <AppBar position="static" color={result.score >= 5 ? 'primary' : 'error'}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => navigate('/dashboard')}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Kết Quả {result.examName}
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          {/* Điểm số */}
          <Card sx={{ mb: 3, bgcolor: result.gradeColor, color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
                {result.score.toFixed(1)}
              </Typography>
              <Typography variant="h4">/ 10 điểm</Typography>
              <Typography variant="h5" sx={{ mt: 2 }}>
                {result.gradeEmoji} {result.grade}
              </Typography>
            </CardContent>
          </Card>

          {/* Thống kê */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6} sm={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main">{result.correctCount}</Typography>
                  <Typography variant="body2">Câu đúng</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="error.main">{result.wrongCount}</Typography>
                  <Typography variant="body2">Câu sai</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">{result.totalQuestions}</Typography>
                  <Typography variant="body2">Tổng câu</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="info.main">{result.level}</Typography>
                  <Typography variant="body2">Trình độ</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Phân tích theo độ khó */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>📊 Phân tích theo độ khó</Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2">Câu dễ: {result.difficultyBreakdown?.easy || 0}/{result.difficultyBreakdown?.easyTotal || 0}</Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={result.difficultyBreakdown?.easyTotal ? (result.difficultyBreakdown.easy / result.difficultyBreakdown.easyTotal) * 100 : 0}
                  color="success"
                  sx={{ height: 10, borderRadius: 5 }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2">Câu trung bình: {result.difficultyBreakdown?.medium || 0}/{result.difficultyBreakdown?.mediumTotal || 0}</Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={result.difficultyBreakdown?.mediumTotal ? (result.difficultyBreakdown.medium / result.difficultyBreakdown.mediumTotal) * 100 : 0}
                  color="warning"
                  sx={{ height: 10, borderRadius: 5 }}
                />
              </Box>
              <Box>
                <Typography variant="body2">Câu khó: {result.difficultyBreakdown?.hard || 0}/{result.difficultyBreakdown?.hardTotal || 0}</Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={result.difficultyBreakdown?.hardTotal ? (result.difficultyBreakdown.hard / result.difficultyBreakdown.hardTotal) * 100 : 0}
                  color="error"
                  sx={{ height: 10, borderRadius: 5 }}
                />
              </Box>
            </CardContent>
          </Card>

          {/* Điểm mạnh/yếu */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" color="success.main" gutterBottom>💪 Điểm mạnh</Typography>
                  {result.strengths?.map((s, i) => (
                    <Chip key={i} label={`${s.topic}: ${s.accuracy}%`} color="success" sx={{ m: 0.5 }} />
                  ))}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" color="error.main" gutterBottom>📚 Cần cải thiện</Typography>
                  {result.weaknesses?.map((w, i) => (
                    <Chip key={i} label={`${w.topic}: ${w.accuracy}%`} color="error" sx={{ m: 0.5 }} />
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Nút xem chi tiết */}
          <Button 
            variant="outlined" 
            fullWidth 
            onClick={() => setShowReview(true)}
            sx={{ mb: 2 }}
          >
            Xem chi tiết từng câu
          </Button>

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={() => navigate('/lessons')}
          >
            Xem bài học được đề xuất
          </Button>

          {/* Dialog xem chi tiết */}
          <Dialog open={showReview} onClose={() => setShowReview(false)} maxWidth="md" fullWidth>
            <DialogTitle>Chi tiết bài làm</DialogTitle>
            <DialogContent>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Câu</TableCell>
                    <TableCell>Câu hỏi</TableCell>
                    <TableCell>Đáp án của bạn</TableCell>
                    <TableCell>Đáp án đúng</TableCell>
                    <TableCell>Kết quả</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {result.detailedResults?.map((r, i) => (
                    <TableRow key={i} sx={{ bgcolor: r.isCorrect ? 'success.light' : 'error.light' }}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell sx={{ maxWidth: 200 }}>{r.question}</TableCell>
                      <TableCell>{r.yourAnswer || '(Chưa trả lời)'}</TableCell>
                      <TableCell>{r.correctAnswer}</TableCell>
                      <TableCell>
                        {r.isCorrect ? <CheckCircle color="success" /> : <Cancel color="error" />}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowReview(false)}>Đóng</Button>
            </DialogActions>
          </Dialog>
        </Container>
      </>
    );
  }

  // Màn hình làm bài
  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => {
            if (window.confirm('Bạn có chắc muốn thoát? Bài làm sẽ không được lưu.')) {
              navigate('/dashboard');
            }
          }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {examInfo?.name} - Câu {currentQuestion + 1}/{questions.length}
          </Typography>
          <Chip 
            icon={<Timer />}
            label={formatTime(timeLeft)}
            color={getTimeColor()}
            sx={{ fontWeight: 'bold' }}
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 2, mb: 4 }}>
        {/* Progress bar */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Tiến độ: {answeredCount}/{questions.length} câu đã trả lời</Typography>
            <Typography variant="body2">{Math.round(progress)}%</Typography>
          </Box>
          <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4 }} />
        </Box>

        {/* Bảng câu hỏi nhanh */}
        <Card sx={{ mb: 2, p: 1 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {questions.map((q, index) => (
              <Chip
                key={index}
                label={index + 1}
                size="small"
                onClick={() => goToQuestion(index)}
                color={answers[q.id] ? 'success' : currentQuestion === index ? 'primary' : 'default'}
                variant={currentQuestion === index ? 'filled' : 'outlined'}
                sx={{ minWidth: 32 }}
              />
            ))}
          </Box>
        </Card>

        {/* Câu hỏi */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Chip label={question?.topic} size="small" color="info" />
              <Chip 
                label={question?.difficulty === 1 ? 'Dễ' : question?.difficulty === 2 ? 'Trung bình' : 'Khó'} 
                size="small" 
                color={question?.difficulty === 1 ? 'success' : question?.difficulty === 2 ? 'warning' : 'error'}
              />
            </Box>

            <Typography variant="h6" gutterBottom>
              Câu {currentQuestion + 1}: {question?.question}
            </Typography>

            <FormControl component="fieldset" fullWidth sx={{ mt: 3 }}>
              <RadioGroup
                value={answers[question?.id] || ''}
                onChange={(e) => handleAnswer(question?.id, e.target.value)}
              >
                {question?.options?.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option}
                    control={<Radio />}
                    label={`${String.fromCharCode(65 + index)}. ${option}`}
                    sx={{
                      border: '1px solid #e0e0e0',
                      borderRadius: 1,
                      mb: 1,
                      mx: 0,
                      '&:hover': { bgcolor: 'action.hover' }
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                variant="outlined"
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
              >
                ← Câu trước
              </Button>

              {currentQuestion === questions.length - 1 ? (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    if (answeredCount < questions.length) {
                      if (!window.confirm(`Bạn còn ${questions.length - answeredCount} câu chưa trả lời. Vẫn nộp bài?`)) {
                        return;
                      }
                    }
                    submitAssessment();
                  }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : '✓ Nộp bài'}
                </Button>
              ) : (
                <Button variant="contained" onClick={nextQuestion}>
                  Câu tiếp →
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default Assessment;
