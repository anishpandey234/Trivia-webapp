import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import QuizPage from './components/QuizPage';
import NavBar from './components/navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './styles/App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5', // Change this to match your color scheme
    },
    secondary: {
      main: '#f44336', // Change this to match your color scheme
    },
  },
});

const App = () => {
  
  const [quiz, setQuiz] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/quiz" element={<QuizPage quiz={quiz} />} />
          <Route path="/" element={<HomePage setQuiz={setQuiz} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
