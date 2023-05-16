import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase';

const QuizButton = styled(Button)((props) => {
    const { selected, correct, isSubmitted } = props;
    return {
      background: isSubmitted 
                  ? (selected ? (correct ? 'green' : 'red') : 'none') 
                  : (selected ? '#265667' : 'none'),
      color: (isSubmitted && !correct && !selected) ? 'black' : (!isSubmitted && selected) ? 'white' : 'black',
      border: (isSubmitted && correct) ? '3px solid green' : 'none',
      '&:hover': {
        background: isSubmitted ? 'inherit' : 'lightgray'
      }
    };
  });
  

const Quiz = ({ quiz,currentUser }) => {
    console.log(quiz);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [quizName, setQuizName] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (quizName === '') {
      alert('Please enter a name for your quiz.');
      return;
    }
  
    // Save quiz to Firestore
    try {
      const userQuizCollection = collection(db, 'users', currentUser, 'quizzes');
      const quizDoc = {
        name: quizName,
        quiz: quiz, // the quiz object
        // any other data you want to save for this quiz
      };
      await addDoc(userQuizCollection, quizDoc);
  
      handleClose();
      alert('Quiz saved successfully!');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleSaveQuiz = () => {
    handleClickOpen();
  };
  const handleAnswerSelect = (questionIndex, answerIndex) => {
    if (isSubmitted) return;

    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleSubmit = () => {
    let score = 0;
    for(let i = 0; i < quiz.choices.length; i++){
      if(selectedAnswers[i] !== undefined && quiz.choices[i][selectedAnswers[i]].isCorrect){
        score++;
      }
    }
    setScore(score);
    setIsSubmitted(true);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10 }}>
      {isSubmitted && <h2>Your Score: {score} / {quiz.questions.length}</h2>}
      {quiz.questions.map((question, questionIndex) => (
        <Box key={questionIndex} sx={{ width: '70%', mb: 2 }}>
          <h2>{question}</h2>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {quiz.choices[questionIndex].map((choiceObj, answerIndex) => (
              <QuizButton 
                key={answerIndex}
                variant="outlined"
                onClick={() => handleAnswerSelect(questionIndex, answerIndex)}
                selected={selectedAnswers[questionIndex] === answerIndex}
                correct={choiceObj.isCorrect}
                isSubmitted={isSubmitted}
              >
                {choiceObj.answerText}
              </QuizButton>
            ))}
          </Box>
        </Box>
      ))}
      {!isSubmitted && <Button sx={{mb:5}} variant="contained" onClick={handleSubmit}>Submit</Button>}
      {isSubmitted && 
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '70%', mt: 2, mb:4 }}>
          <Button variant="contained" onClick={() => { navigate('/')}}>Home</Button>
          <Button variant="contained" onClick={handleSaveQuiz}>Save Quiz</Button>
        </Box>
      }
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Quiz</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your quiz.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Quiz Name"
            type="text"
            fullWidth
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
    }  

export default Quiz;
