import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, Card, CardContent, Button, AppBar, Toolbar,
  IconButton, Radio, RadioGroup, FormControlLabel, FormControl, Alert, Divider
} from '@mui/material';
import { ArrowBack, CheckCircle, Cancel } from '@mui/icons-material';
import { lessonAPI, exerciseAPI, progressAPI } from '../services/api';

function LessonDetail() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null);
  const [showExercises, setShowExercises] = useState(false);
  const [startTime] = useState(Date.now());
  const navigate = useNavigate();

  useEffect(() => {
    loadLesson();
  }, [id]);

  const loadLesson = async () => {
    try {
      const response = await lessonAPI.getLesson(id);
      setLesson(response.data.lesson);
      setExercises(response.data.exercises);
    } catch (error) {
      console.error('Error loading lesson:', error);
    }
  };

  const handleStartExercises = () => {
    setShowExercises(true);
    updateProgress('in_progress', 50);
  };

  const handleSubmitAnswer = async () => {
    const exercise = exercises[currentExercise];
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    try {
      const response = await exerciseAPI.submit({
        exercise_id: exercise.id,
        answer: answer,
        time_taken: timeSpent
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  const handleNextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setAnswer('');
      setResult(null);
    } else {
      updateProgress('completed', 100);
      alert('Bạn đã hoàn thành bài học!');
      navigate('/lessons');
    }
  };

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

  if (!lesson) {
    return <Typography>Đang tải...</Typography>;
  }

  if (!showExercises) {
    return (
      <>
        <AppBar position="static">
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
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {lesson.title}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-wrap' }}>
                {lesson.content || 'Nội dung bài học sẽ được cập nhật sớm.'}
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleStartExercises}
                  disabled={exercises.length === 0}
                >
                  {exercises.length > 0 ? 'Làm bài tập' : 'Chưa có bài tập'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </>
    );
  }

  const exercise = exercises[currentExercise];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setShowExercises(false)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Bài tập {currentExercise + 1}/{exercises.length}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {exercise.question}
            </Typography>

            {!result && exercise.type === 'multiple_choice' && exercise.options && (
              <FormControl component="fieldset" fullWidth sx={{ mt: 3 }}>
                <RadioGroup value={answer} onChange={(e) => setAnswer(e.target.value)}>
                  {exercise.options.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )}

            {result && (
              <Alert
                severity={result.is_correct ? 'success' : 'error'}
                icon={result.is_correct ? <CheckCircle /> : <Cancel />}
                sx={{ mt: 3 }}
              >
                <Typography variant="h6">
                  {result.is_correct ? 'Chính xác!' : 'Chưa đúng'}
                </Typography>
                {!result.is_correct && (
                  <>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Đáp án đúng: {result.correct_answer}
                    </Typography>
                    {result.explanation && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Giải thích: {result.explanation}
                      </Typography>
                    )}
                  </>
                )}
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Điểm: {result.score}/{exercise.points}
                </Typography>
              </Alert>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              {!result ? (
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSubmitAnswer}
                  disabled={!answer}
                >
                  Kiểm tra
                </Button>
              ) : (
                <Button variant="contained" fullWidth onClick={handleNextExercise}>
                  {currentExercise < exercises.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành'}
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default LessonDetail;
