import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Container, Typography, Box, Card, CardContent, Button, AppBar, Toolbar,
  IconButton, Chip, Grid
} from '@mui/material';
import { ArrowBack, Star } from '@mui/icons-material';
import { lessonAPI, subjectAPI } from '../services/api';

function Lessons() {
  const [searchParams] = useSearchParams();
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [userLevel, setUserLevel] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadSubjects();
    const subjectId = searchParams.get('subject');
    if (subjectId) {
      setSelectedSubject(parseInt(subjectId));
    }
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      loadLessons(selectedSubject);
    }
  }, [selectedSubject]);

  const loadSubjects = async () => {
    try {
      const response = await subjectAPI.getAll();
      setSubjects(response.data.subjects);
    } catch (error) {
      console.error('Error loading subjects:', error);
    }
  };

  const loadLessons = async (subjectId) => {
    try {
      const response = await lessonAPI.getRecommended(subjectId);
      setLessons(response.data.lessons);
      setUserLevel(response.data.user_level);
    } catch (error) {
      console.error('Error loading lessons:', error);
    }
  };

  const getDifficultyColor = (difficulty) => {
    if (difficulty <= 2) return 'success';
    if (difficulty <= 3) return 'warning';
    return 'error';
  };

  const getDifficultyText = (difficulty) => {
    if (difficulty <= 2) return 'Dễ';
    if (difficulty <= 3) return 'Trung bình';
    return 'Khó';
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/dashboard')}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Bài Học
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>Chọn môn học</Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            {subjects.map((subject) => (
              <Chip
                key={subject.id}
                label={subject.name}
                onClick={() => setSelectedSubject(subject.id)}
                color={selectedSubject === subject.id ? 'primary' : 'default'}
                variant={selectedSubject === subject.id ? 'filled' : 'outlined'}
              />
            ))}
          </Box>
          {userLevel && (
            <Chip
              icon={<Star />}
              label={`Trình độ của bạn: ${userLevel === 'beginner' ? 'Cơ bản' : userLevel === 'intermediate' ? 'Trung bình' : 'Nâng cao'}`}
              color="primary"
              variant="outlined"
            />
          )}
        </Box>

        {lessons.length > 0 ? (
          <Grid container spacing={3}>
            {lessons.map((lesson) => (
              <Grid item xs={12} md={6} key={lesson.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                      <Typography variant="h6" component="h2">
                        {lesson.title}
                      </Typography>
                      <Chip
                        label={getDifficultyText(lesson.difficulty)}
                        color={getDifficultyColor(lesson.difficulty)}
                        size="small"
                      />
                    </Box>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      {lesson.content?.substring(0, 150)}...
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => navigate(`/lessons/${lesson.id}`)}
                    >
                      Học ngay
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Card>
            <CardContent>
              <Typography variant="body1" color="textSecondary" align="center">
                {selectedSubject
                  ? 'Chưa có bài học nào. Vui lòng hoàn thành bài đánh giá năng lực trước.'
                  : 'Vui lòng chọn môn học để xem bài học.'}
              </Typography>
              {selectedSubject && (
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Button variant="contained" onClick={() => navigate('/assessment')}>
                    Làm bài đánh giá
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        )}
      </Container>
    </>
  );
}

export default Lessons;
