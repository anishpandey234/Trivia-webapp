import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase';

const QuizButton = styled(Button)(({ selected, correct, issubmitted }) => ({
  background: issubmitted 
              ? (selected ? (correct ? 'green' : 'red') : 'none') 
              : (selected ? '#265667' : 'none'),
  color: (issubmitted && !correct && !selected) ? 'black' : (!issubmitted && selected) ? 'white' : 'black',
  border: (issubmitted && correct) ? '3px solid green' : 'none',
  '&:hover': {
      background: issubmitted ? 'inherit' : 'lightgray'
  }
}));


const Quiz = ({ quiz, currentUser }) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [issubmitted, setissubmitted] = useState(false);
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
        quiz: quiz, 
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
    if (issubmitted) return;

    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleSubmit = () => {
    let score = 0;
    for(let i = 0; i < quiz.choices.length; i++){
      if(selectedAnswers[i] !== undefined && quiz.choices[i].options[selectedAnswers[i]].isCorrect){
        score++;
      }
    }
    setScore(score);
    setissubmitted(true);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10 }}>
      {issubmitted && <h2>Your Score: {score} / {quiz.choices.length}</h2>}
      {quiz.choices.map((choiceObj, questionIndex) => (
        <Box key={questionIndex} sx={{ width: '70%', mb: 2 }}>
          <h2>{choiceObj.question}</h2>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {choiceObj.options.map((optionObj, answerIndex) => (
              <QuizButton
              key={answerIndex}
              variant="outlined"
              onClick={() => handleAnswerSelect(questionIndex, answerIndex)}
              selected={selectedAnswers[questionIndex] === answerIndex}
              correct={optionObj.isCorrect}
              issubmitted={issubmitted}
            >
              {optionObj.answerText}
            </QuizButton>
          ))}
        </Box>
      </Box>
    ))}
    {!issubmitted && <Button sx={{mb:5}} variant="contained" onClick={handleSubmit}>Submit</Button>}
    {issubmitted && 
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
