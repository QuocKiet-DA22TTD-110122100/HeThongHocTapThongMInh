import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, Card, CardContent, Button, AppBar, Toolbar,
  IconButton, Radio, RadioGroup, FormControlLabel, FormControl, Divider,
  LinearProgress, Chip, Grid, Paper, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { 
  ArrowBack, CheckCircle, Timer, NavigateNext, NavigateBefore,
  Quiz, EmojiEvents, School, AccessTime, Star
} from '@mui/icons-material';
import { lessonAPI, exerciseAPI, progressAPI } from '../services/api';
import { EXAM_TYPES, getQuestionsForExam, calculateScore, getGrade } from '../services/questionBank';

function LessonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Lesson state
  const [lesson, setLesson] = useState(null);
  const [allExercises, setAllExercises] = useState([]); // Tất cả câu hỏi có sẵn
  const [exercises, setExercises] = useState([]); // Câu hỏi cho bài kiểm tra hiện tại
  
  // Exam type selection
  const [showExamSelection, setShowExamSelection] = useState(false);
  const [selectedExamType, setSelectedExamType] = useState(null);
  
  // Exercise state
  const [showExercises, setShowExercises] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [answers, setAnswers] = useState({});
  const [startTime, setStartTime] = useState(null);
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(null);
  
  // Result state
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);

  // Các loại bài kiểm tra
  const examTypes = [
    { 
      key: 'PRACTICE', 
      name: '📝 Luyện tập', 
      questions: 10, 
      time: 10, 
      points: 1,
      description: '10 câu - 10 phút - 1đ/câu',
      color: '#4caf50'
    },
    { 
      key: 'QUIZ_15', 
      name: '📋 Kiểm tra 15 phút', 
      questions: 20, 
      time: 15, 
      points: 0.5,
      description: '20 câu - 15 phút - 0.5đ/câu',
      color: '#2196f3'
    },
    { 
      key: 'MIDTERM', 
      name: '📚 Giữa kỳ', 
      questions: 40, 
      time: 45, 
      points: 0.25,
      description: '40 câu - 45 phút - 0.25đ/câu',
      color: '#ff9800'
    },
    { 
      key: 'FINAL', 
      name: '🎓 Học kỳ', 
      questions: 50, 
      time: 60, 
      points: 0.2,
      description: '50 câu - 60 phút - 0.2đ/câu',
      color: '#f44336'
    }
  ];

  useEffect(() => {
    loadLesson();
  }, [id]);

  // Timer countdown
  useEffect(() => {
    if (!showExercises || timeLeft === null || showResult) return;
    
    if (timeLeft <= 0) {
      handleSubmitAll();
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [showExercises, timeLeft, showResult]);

  const loadLesson = async () => {
    try {
      const response = await lessonAPI.getLesson(id);
      setLesson(response.data.lesson);
      setAllExercises(response.data.exercises || []);
    } catch (error) {
      console.error('Error loading lesson:', error);
    }
  };

  const handleShowExamSelection = () => {
    setShowExamSelection(true);
  };

  const handleSelectExamType = (examType) => {
    setSelectedExamType(examType);
    
    // Lấy câu hỏi theo loại bài kiểm tra
    // Map bài học với môn học
    const lessonToSubject = {
      1: 'AI_ML', 2: 'AI_ML', 3: 'AI_ML', 4: 'AI_ML', 5: 'AI_ML'
    };
    const subjectCode = lessonToSubject[parseInt(id)] || 'AI_ML';
    
    // Lấy câu hỏi từ ngân hàng
    const questions = getQuestionsForExam(examType.key, subjectCode);
    
    // Format câu hỏi
    const formattedQuestions = questions.map((q, index) => ({
      id: q.id,
      question: q.question,
      type: 'multiple_choice',
      options: q.options,
      difficulty: q.difficulty,
      questionNumber: index + 1
    }));
    
    setExercises(formattedQuestions);
    setShowExamSelection(false);
    setShowExercises(true);
    setStartTime(Date.now());
    setTimeLeft(examType.time * 60);
    setAnswers({});
    setCurrentExercise(0);
    updateProgress('in_progress', 50);
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
    }
  };

  const handlePrevExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1);
    }
  };

  const handleGoToQuestion = (index) => {
    setCurrentExercise(index);
  };

  const handleSubmitAll = useCallback(async () => {
    if (!selectedExamType) return;
    
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    // Format answers for submission
    const formattedAnswers = exercises.map(ex => ({
      exercise_id: ex.id,
      answer: answers[ex.id] || null
    }));

    try {
      const response = await exerciseAPI.submitAll({
        lesson_id: parseInt(id),
        answers: formattedAnswers,
        time_taken: timeSpent,
        examType: selectedExamType.key
      });
      
      setResult(response.data);
      setShowResult(true);
      updateProgress('completed', 100);
    } catch (error) {
      console.error('Error submitting exercises:', error);
    }
  }, [exercises, answers, id, startTime, selectedExamType]);

  const updateProgress = async (status, completion) => {
    const timeSpent = startTime ? Math.floor((Date.now() - startTime) / 60000) : 0;
    try {
      await progressAPI.update({
        lesson_id: parseInt(id),
        status: status,
        completion: completion,
        time_spent: timeSpent
      });
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).filter(key => answers[key]).length;
  };

  const handleBackToLesson = () => {
    setShowExercises(false);
    setShowExamSelection(false);
    setShowResult(false);
    setSelectedExamType(null);
    setExercises([]);
    setAnswers({});
    setCurrentExercise(0);
    setTimeLeft(null);
    setResult(null);
  };

  if (!lesson) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <Typography>Đang tải...</Typography>
      </Container>
    );
  }

  // Show exam type selection
  if (showExamSelection) {
    return (
      <>
        <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => setShowExamSelection(false)}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Chọn loại bài kiểm tra
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom textAlign="center" fontWeight="bold">
            📝 Chọn loại bài kiểm tra cho: {lesson.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 4 }}>
            Thang điểm 10 cho tất cả loại bài kiểm tra
          </Typography>

          <Grid container spacing={3}>
            {examTypes.map((exam) => (
              <Grid item xs={12} sm={6} key={exam.key}>
                <Card 
                  sx={{ 
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    border: '2px solid transparent',
                    '&:hover': { 
                      transform: 'translateY(-5px)',
                      boxShadow: 6,
                      borderColor: exam.color
                    }
                  }}
                  onClick={() => handleSelectExamType(exam)}
                >
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                      {exam.name.split(' ')[0]}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {exam.name.substring(2)}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                      <Chip 
                        icon={<Quiz />} 
                        label={`${exam.questions} câu`} 
                        size="small"
                        sx={{ bgcolor: exam.color, color: 'white' }}
                      />
                      <Chip 
                        icon={<AccessTime />} 
                        label={`${exam.time} phút`} 
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                      {exam.points} điểm/câu
                    </Typography>
                    <Button 
                      variant="contained" 
                      fullWidth 
                      sx={{ mt: 2, bgcolor: exam.color }}
                    >
                      Bắt đầu
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </>
    );
  }

  // Show lesson content
  if (!showExercises) {
    return (
      <>
        <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => navigate('/lessons')}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {lesson.title}
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <School sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Typography variant="h4" fontWeight="bold">
                  {lesson.title}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                <Chip label={lesson.topic} color="primary" size="small" />
                <Chip label={`Độ khó: ${'⭐'.repeat(lesson.difficulty || 1)}`} size="small" />
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography 
                variant="body1" 
                sx={{ 
                  whiteSpace: 'pre-wrap',
                  lineHeight: 1.8
                }}
              >
                {lesson.content || 'Nội dung bài học sẽ được cập nhật sớm.'}
              </Typography>
              
              <Box sx={{ mt: 4, p: 3, bgcolor: 'primary.light', borderRadius: 2, color: 'white' }}>
                <Typography variant="h6" gutterBottom>
                  📝 Bài tập củng cố
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Chọn loại bài kiểm tra phù hợp với nhu cầu của bạn:
                </Typography>
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  <Grid item xs={6}>• Luyện tập: 10 câu - 10 phút</Grid>
                  <Grid item xs={6}>• Kiểm tra 15 phút: 20 câu</Grid>
                  <Grid item xs={6}>• Giữa kỳ: 40 câu - 45 phút</Grid>
                  <Grid item xs={6}>• Học kỳ: 50 câu - 60 phút</Grid>
                </Grid>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleShowExamSelection}
                  sx={{ 
                    mt: 2, 
                    bgcolor: 'white', 
                    color: 'primary.main',
                    '&:hover': { bgcolor: 'grey.100' }
                  }}
                  startIcon={<Quiz />}
                >
                  Chọn loại bài kiểm tra
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </>
    );
  }

  // Show result
  if (showResult && result) {
    return (
      <>
        <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Kết quả - {selectedExamType?.name || 'Bài tập'}
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, textAlign: 'center', p: 4 }}>
            <Typography variant="h1" sx={{ fontSize: 80, mb: 2 }}>
              {result.gradeEmoji}
            </Typography>
            
            <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
              {result.score}/{result.maxScore} điểm
            </Typography>
            
            <Chip 
              label={result.grade} 
              color={result.gradeColor} 
              sx={{ fontSize: 18, py: 2, px: 3, mb: 3 }}
            />

            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {selectedExamType?.name} - {selectedExamType?.questions} câu
            </Typography>
            
            <Grid container spacing={2} sx={{ mt: 3, mb: 4 }}>
              <Grid item xs={4}>
                <Paper sx={{ p: 2, bgcolor: 'success.light', color: 'white', borderRadius: 2 }}>
                  <Typography variant="h4">{result.correctCount}</Typography>
                  <Typography variant="body2">Đúng</Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper sx={{ p: 2, bgcolor: 'error.light', color: 'white', borderRadius: 2 }}>
                  <Typography variant="h4">{result.wrongCount}</Typography>
                  <Typography variant="body2">Sai</Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper sx={{ p: 2, bgcolor: 'grey.400', color: 'white', borderRadius: 2 }}>
                  <Typography variant="h4">{result.totalQuestions - result.correctCount - result.wrongCount}</Typography>
                  <Typography variant="body2">Bỏ qua</Typography>
                </Paper>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button 
                variant="outlined" 
                onClick={() => setShowDetailDialog(true)}
              >
                Xem chi tiết
              </Button>
              <Button 
                variant="contained"
                color="secondary" 
                onClick={handleBackToLesson}
              >
                Làm lại
              </Button>
              <Button 
                variant="contained" 
                onClick={() => navigate('/lessons')}
                startIcon={<EmojiEvents />}
              >
                Hoàn thành
              </Button>
            </Box>
          </Card>
        </Container>

        {/* Detail Dialog */}
        <Dialog 
          open={showDetailDialog} 
          onClose={() => setShowDetailDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Chi tiết kết quả - {selectedExamType?.name}</DialogTitle>
          <DialogContent dividers>
            {result.detailedResults?.map((item, index) => (
              <Box 
                key={index} 
                sx={{ 
                  p: 2, 
                  mb: 2, 
                  borderRadius: 2,
                  bgcolor: item.isCorrect ? 'success.light' : 'error.light',
                  color: 'white'
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  Câu {index + 1}: {item.question}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Đáp án của bạn: {item.yourAnswer || '(Không trả lời)'}
                </Typography>
                {!item.isCorrect && (
                  <Typography variant="body2">
                    Đáp án đúng: {item.correctAnswer}
                  </Typography>
                )}
              </Box>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDetailDialog(false)}>Đóng</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

  // Show exercises
  const exercise = exercises[currentExercise];
  const progress = ((currentExercise + 1) / exercises.length) * 100;
  const isTimeWarning = timeLeft !== null && timeLeft < 60;

  return (
    <>
      <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleBackToLesson}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {selectedExamType?.name || 'Bài tập'} - {lesson.title}
          </Typography>
          <Chip 
            icon={<Timer />}
            label={formatTime(timeLeft || 0)}
            color={isTimeWarning ? 'error' : 'default'}
            sx={{ 
              bgcolor: isTimeWarning ? 'error.main' : 'rgba(255,255,255,0.2)', 
              color: 'white',
              fontWeight: 'bold',
              animation: isTimeWarning ? 'pulse 1s infinite' : 'none'
            }}
          />
        </Toolbar>
      </AppBar>

      {/* Progress bar */}
      <LinearProgress 
        variant="determinate" 
        value={progress} 
        sx={{ height: 6 }}
      />

      <Container maxWidth="md" sx={{ mt: 3, mb: 4 }}>
        {/* Question navigation */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3, justifyContent: 'center' }}>
          {exercises.map((_, index) => (
            <Chip
              key={index}
              label={index + 1}
              onClick={() => handleGoToQuestion(index)}
              color={
                index === currentExercise ? 'primary' :
                answers[exercises[index].id] ? 'success' : 'default'
              }
              variant={index === currentExercise ? 'filled' : 'outlined'}
              sx={{ 
                minWidth: 36,
                cursor: 'pointer',
                fontWeight: index === currentExercise ? 'bold' : 'normal'
              }}
            />
          ))}
        </Box>

        {/* Status */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Câu {currentExercise + 1}/{exercises.length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Đã trả lời: {getAnsweredCount()}/{exercises.length}
          </Typography>
        </Box>

        {/* Question card */}
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Câu {currentExercise + 1}: {exercise?.question}
            </Typography>

            {exercise?.type === 'multiple_choice' && exercise?.options && (
              <FormControl component="fieldset" fullWidth sx={{ mt: 3 }}>
                <RadioGroup 
                  value={answers[exercise.id] || ''} 
                  onChange={(e) => handleAnswerChange(exercise.id, e.target.value)}
                >
                  {exercise.options.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      value={option}
                      control={<Radio />}
                      label={
                        <Typography sx={{ py: 1 }}>
                          {String.fromCharCode(65 + index)}. {option}
                        </Typography>
                      }
                      sx={{
                        mb: 1,
                        p: 1,
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: answers[exercise.id] === option ? 'primary.main' : 'grey.300',
                        bgcolor: answers[exercise.id] === option ? 'primary.light' : 'transparent',
                        '&:hover': { bgcolor: 'grey.100' }
                      }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )}

            {/* Navigation buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                variant="outlined"
                startIcon={<NavigateBefore />}
                onClick={handlePrevExercise}
                disabled={currentExercise === 0}
              >
                Câu trước
              </Button>
              
              {currentExercise < exercises.length - 1 ? (
                <Button
                  variant="contained"
                  endIcon={<NavigateNext />}
                  onClick={handleNextExercise}
                >
                  Câu tiếp
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSubmitAll}
                  startIcon={<CheckCircle />}
                >
                  Nộp bài ({getAnsweredCount()}/{exercises.length})
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Submit button (always visible) */}
        {currentExercise < exercises.length - 1 && (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button
              variant="outlined"
              color="success"
              onClick={handleSubmitAll}
              startIcon={<CheckCircle />}
            >
              Nộp bài ngay ({getAnsweredCount()}/{exercises.length} câu)
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
}

export default LessonDetail;
