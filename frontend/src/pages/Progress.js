import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, Card, CardContent, LinearProgress,
  Grid, AppBar, Toolbar, IconButton, Button, Chip
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { progressAPI, subjectAPI } from '../services/api';

function Progress() {
  const [progressData, setProgressData] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadSubjects();
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      loadProgress(selectedSubject);
    }
  }, [selectedSubject]);

  const loadSubjects = async () => {
    try {
      const response = await subjectAPI.getAll();
      setSubjects(response.data.subjects);
      if (response.data.subjects.length > 0) {
        setSelectedSubject(response.data.subjects[0].id);
      }
    } catch (error) {
      console.error('Error loading subjects:', error);
    }
  };

  const loadProgress = async (subjectId) => {
    try {
      const response = await progressAPI.get(subjectId);
      setProgressData(response.data);
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const pieData = progressData ? [
    { name: 'Đã hoàn thành', value: progressData.summary.completed },
    { name: 'Đang học', value: progressData.summary.in_progress },
    { name: 'Chưa bắt đầu', value: progressData.summary.total_lessons - progressData.summary.completed - progressData.summary.in_progress }
  ] : [];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/dashboard')}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Tiến Độ Học Tập
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>Chọn môn học</Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
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
        </Box>

        {progressData && (
          <>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Tổng số bài học
                    </Typography>
                    <Typography variant="h3">
                      {progressData.summary.total_lessons}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Đã hoàn thành
                    </Typography>
                    <Typography variant="h3" color="success.main">
                      {progressData.summary.completed}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Tỷ lệ hoàn thành
                    </Typography>
                    <Typography variant="h3" color="primary">
                      {progressData.summary.completion_rate.toFixed(1)}%
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Phân bố tiến độ
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Chi tiết bài học
                    </Typography>
                    <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                      {progressData.progress.map((item, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                          <Typography variant="body2">{item.lesson_title}</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={item.completion}
                              sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                            />
                            <Typography variant="body2">{item.completion.toFixed(0)}%</Typography>
                          </Box>
                          <Typography variant="caption" color="textSecondary">
                            Thời gian: {item.time_spent} phút
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </>
  );
}

export default Progress;
