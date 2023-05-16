import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const QuizButton = styled(Button)(({ theme, selected }) => ({
    background: selected ? 'navy' : 'none',
    color: selected ? 'white' : 'inherit',
    '&:hover': {
      background: 'lightgray'
    }
  }));
  

const Quiz = ({ quiz }) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {quiz.questions.map((question, questionIndex) => (
        <Box key={questionIndex} sx={{ width: '70%', mb: 2 }}>
          <h2>{question}</h2>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {quiz.choices[questionIndex].map((choice, answerIndex) => (
              <QuizButton 
                key={answerIndex}
                variant="outlined"
                onClick={() => handleAnswerSelect(questionIndex, answerIndex)}
                selected={selectedAnswers[questionIndex] === answerIndex}
                correct={choice.isCorrect}
              >
                {choice.answerText}
              </QuizButton>
            ))}
          </Box>
        </Box>
      ))}
      <Button variant="contained">Submit</Button>
    </Box>
  );
};

export default Quiz;
