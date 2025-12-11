import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Grid, Card, CardContent, Typography, Button, AppBar, Toolbar,
  Box, IconButton, Menu, MenuItem
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  MenuBook as LessonsIcon,
  TrendingUp as ProgressIcon,
  Analytics as AnalyticsIcon,
  Chat as ChatIcon,
  AccountCircle,
  ExitToApp
} from '@mui/icons-material';
import { subjectAPI } from '../services/api';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    try {
      const response = await subjectAPI.getAll();
      setSubjects(response.data.subjects);
    } catch (error) {
      console.error('Error loading subjects:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    { 
      title: 'Đánh giá năng lực', 
      icon: <AssessmentIcon />, 
      path: '/assessment', 
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      description: 'Kiểm tra trình độ hiện tại'
    },
    { 
      title: 'Bài học', 
      icon: <LessonsIcon />, 
      path: '/lessons', 
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      description: 'Học tập theo lộ trình cá nhân'
    },
    { 
      title: 'Tiến độ học tập', 
      icon: <ProgressIcon />, 
      path: '/progress', 
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      description: 'Theo dõi quá trình học'
    },
    { 
      title: 'Phân tích', 
      icon: <AnalyticsIcon />, 
      path: '/analytics', 
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      description: 'Xem điểm mạnh & yếu'
    },
    { 
      title: 'Chatbot hỗ trợ', 
      icon: <ChatIcon />, 
      path: '/chatbot', 
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      description: 'Trợ lý AI 24/7'
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            🎓 Hệ Thống Học Tập AI
          </Typography>
          <IconButton 
            color="inherit" 
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.1)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
            }}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            PaperProps={{
              sx: { borderRadius: 2, mt: 1 }
            }}
          >
            <MenuItem disabled>
              <Typography fontWeight={600}>{user?.full_name}</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ExitToApp sx={{ mr: 1 }} /> Đăng xuất
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Xin chào, {user?.full_name}! 👋
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Lớp {user?.grade} • Hệ thống học tập cá nhân hóa với AI
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 5 }}>
          {menuItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                  },
                  background: item.gradient,
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onClick={() => navigate(item.path)}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ fontSize: 48, mb: 2, opacity: 0.9 }}>
                    {item.icon}
                  </Box>
                  <Typography variant="h5" fontWeight={700} gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {item.description}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -20,
                    right: -20,
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    bgcolor: 'rgba(255,255,255,0.1)',
                  }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
            📚 Môn học
          </Typography>
          <Grid container spacing={3}>
            {subjects.map((subject) => (
              <Grid item xs={12} sm={6} md={4} key={subject.id}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                      {subject.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                      {subject.description}
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => navigate(`/lessons?subject=${subject.id}`)}
                      sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                      }}
                    >
                      Xem bài học
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Dashboard;
