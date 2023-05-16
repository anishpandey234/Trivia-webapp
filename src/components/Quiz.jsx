import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const QuizButton = styled(Button)(({ theme, selected, correct, isSubmitted }) => ({
  background: isSubmitted 
                ? (selected ? (correct ? 'green' : 'red') : 'none') 
                : (selected ? '#265667' : 'none'),
  color: (isSubmitted && !correct && !selected) ? 'black' : 'black',
  color : (!isSubmitted && selected) ? 'white': 'black',
  border: isSubmitted && correct ? '3px solid green' : 'none',
  '&:hover': {
    background: isSubmitted ? 'inherit' : 'lightgray'
  }
}));

const Quiz = ({ quiz }) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

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

  const handleSaveQuiz = () => {
    // your logic to save the quiz goes here
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
    </Box>
  );
};

export default Quiz;
