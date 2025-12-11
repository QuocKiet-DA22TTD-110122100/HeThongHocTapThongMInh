import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, Card, CardContent, Button, AppBar, Toolbar,
  IconButton, Radio, RadioGroup, FormControlLabel, FormControl, Alert, Divider,
  LinearProgress, Chip, Grid, Paper, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { 
  ArrowBack, CheckCircle, Cancel, Timer, NavigateNext, NavigateBefore,
  Quiz, EmojiEvents, School
} from '@mui/icons-material';
import { lessonAPI, exerciseAPI, progressAPI } from '../services/api';

function LessonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Lesson state
  const [lesson, setLesson] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [exerciseInfo, setExerciseInfo] = useState(null);
  
  // Exercise state
  const [showExercises, setShowExercises] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [answers, setAnswers] = useState({});
  const [startTime] = useState(Date.now());
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(null);
  
  // Result state
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);

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
      setExercises(response.data.exercises || []);
      setExerciseInfo(response.data.exerciseInfo || {
        totalQuestions: response.data.exercises?.length || 0,
        pointPerQuestion: 1,
        maxScore: 10,
        timeLimit: 10
      });
    } catch (error) {
      console.error('Error loading lesson:', error);
    }
  };

  const handleStartExercises = () => {
    setShowExercises(true);
    setTimeLeft((exerciseInfo?.timeLimit || 10) * 60); // Convert to seconds
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
        time_taken: timeSpent
      });
      
      setResult(response.data);
      setShowResult(true);
      updateProgress('completed', 100);
    } catch (error) {
      console.error('Error submitting exercises:', error);
    }
  }, [exercises, answers, id, startTime]);

  const updateProgress = async (status, completion) => {
    const timeSpent = Math.floor((Date.now() - startTime) / 60000);
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

  if (!lesson) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <Typography>Đang tải...</Typography>
      </Container>
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
                  lineHeight: 1.8,
                  '& h1, & h2, & h3': { mt: 3, mb: 2 }
                }}
              >
                {lesson.content || 'Nội dung bài học sẽ được cập nhật sớm.'}
              </Typography>
              
              {exercises.length > 0 && (
                <Box sx={{ mt: 4, p: 3, bgcolor: 'primary.light', borderRadius: 2, color: 'white' }}>
                  <Typography variant="h6" gutterBottom>
                    📝 Bài tập củng cố
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    • Số câu hỏi: {exerciseInfo?.totalQuestions || exercises.length} câu
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    • Thời gian: {exerciseInfo?.timeLimit || 10} phút
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    • Thang điểm: {exerciseInfo?.maxScore || 10} điểm
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleStartExercises}
                    sx={{ 
                      mt: 2, 
                      bgcolor: 'white', 
                      color: 'primary.main',
                      '&:hover': { bgcolor: 'grey.100' }
                    }}
                    startIcon={<Quiz />}
                  >
                    Bắt đầu làm bài tập
                  </Button>
                </Box>
              )}
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
              Kết quả bài tập - {lesson.title}
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

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button 
                variant="outlined" 
                onClick={() => setShowDetailDialog(true)}
              >
                Xem chi tiết
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
          <DialogTitle>Chi tiết kết quả</DialogTitle>
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
          <IconButton edge="start" color="inherit" onClick={() => setShowExercises(false)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Bài tập - {lesson.title}
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
                minWidth: 40,
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
              Câu {currentExercise + 1}: {exercise.question}
            </Typography>

            {exercise.type === 'multiple_choice' && exercise.options && (
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
