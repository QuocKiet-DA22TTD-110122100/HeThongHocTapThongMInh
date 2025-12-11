import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, Card, CardContent, Grid, AppBar, Toolbar, IconButton, Chip
} from '@mui/material';
import { ArrowBack, TrendingUp, TrendingDown } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { analyticsAPI, predictionAPI, subjectAPI } from '../services/api';

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
    loadSubjects();
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      loadPrediction(selectedSubject);
    }
  }, [selectedSubject]);

  const loadData = async () => {
    try {
      const response = await analyticsAPI.getStrengthsWeaknesses();
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error loading analytics:', error);
    }
  };

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

  const loadPrediction = async (subjectId) => {
    try {
      const response = await predictionAPI.getResults(subjectId);
      setPrediction(response.data);
    } catch (error) {
      console.error('Error loading prediction:', error);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/dashboard')}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Phân Tích & Dự Đoán
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="success.main">
                  <TrendingUp sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Điểm Mạnh
                </Typography>
                {analytics?.strengths.length > 0 ? (
                  <Box>
                    {analytics.strengths.map((item, index) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Typography variant="body1">{item.topic}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box
                            sx={{
                              width: `${item.accuracy}%`,
                              height: 20,
                              bgcolor: 'success.main',
                              borderRadius: 1
                            }}
                          />
                          <Typography variant="body2">{item.accuracy.toFixed(1)}%</Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography color="textSecondary">Chưa có dữ liệu</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="error.main">
                  <TrendingDown sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Điểm Yếu
                </Typography>
                {analytics?.weaknesses.length > 0 ? (
                  <Box>
                    {analytics.weaknesses.map((item, index) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Typography variant="body1">{item.topic}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box
                            sx={{
                              width: `${item.accuracy}%`,
                              height: 20,
                              bgcolor: 'error.main',
                              borderRadius: 1
                            }}
                          />
                          <Typography variant="body2">{item.accuracy.toFixed(1)}%</Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography color="textSecondary">Chưa có dữ liệu</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Hiệu suất tổng thể
                </Typography>
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <Typography variant="h2" color="primary">
                    {analytics?.overall_performance.toFixed(1)}%
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Độ chính xác trung bình
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Dự đoán kết quả học tập
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {subjects.map((subject) => (
                    <Chip
                      key={subject.id}
                      label={subject.name}
                      onClick={() => setSelectedSubject(subject.id)}
                      color={selectedSubject === subject.id ? 'primary' : 'default'}
                      variant={selectedSubject === subject.id ? 'filled' : 'outlined'}
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
                {prediction ? (
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'primary.light', borderRadius: 2 }}>
                          <Typography variant="h4" color="white">
                            {prediction.predicted_score?.toFixed(1) || 'N/A'}
                          </Typography>
                          <Typography variant="body2" color="white">
                            Điểm dự đoán
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'secondary.light', borderRadius: 2 }}>
                          <Typography variant="h6" color="white">
                            {prediction.trend}
                          </Typography>
                          <Typography variant="body2" color="white">
                            Xu hướng
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'success.light', borderRadius: 2 }}>
                          <Typography variant="h6" color="white">
                            {prediction.confidence}
                          </Typography>
                          <Typography variant="body2" color="white">
                            Độ tin cậy
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    <Box sx={{ mt: 3, p: 2, bgcolor: 'info.light', borderRadius: 2 }}>
                      <Typography variant="body1" color="white">
                        <strong>Khuyến nghị:</strong> {prediction.recommendation}
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Typography color="textSecondary">Đang tải dữ liệu dự đoán...</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Analytics;
