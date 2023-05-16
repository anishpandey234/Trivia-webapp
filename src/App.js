import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import QuizPage from './components/QuizPage';
import NavBar from './components/navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { onAuthStateChanged } from "firebase/auth";
import './styles/App.css';
import { auth } from './firebase';

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
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        const uid = user.uid;
        setCurrentUser(uid);
      } else {
        // User is signed out.
        setCurrentUser(null);

      }
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Router>
        <Routes>
          <Route path="/quiz" element={<QuizPage quiz={quiz} currentUser={currentUser} />} />
          <Route path="/" element={<HomePage setQuiz={setQuiz} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
