import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import ShortenerPage from './pages/ShortenerPage';
import StatisticsPage from './pages/StatisticsPage';
import loggingMiddleware from './middleware/loggingMiddleware';

function App() {
  const handleNavigation = (to, from) => {
    loggingMiddleware.logNavigation(to, from);
  };

  return (
    <Router>
      <AppBar position="static" sx={{ background: 'linear-gradient(90deg, #1976d2, #42a5f5)' }}>

        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            🚀 URL Shortener
          </Typography>
          <Button
            color="inherit"
            component={Link}
            to="/"
            onClick={() => handleNavigation('/', window.location.pathname)}
          >
            Shortener
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/statistics"
            onClick={() => handleNavigation('/statistics', window.location.pathname)}
          >
            Statistics
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<ShortenerPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
