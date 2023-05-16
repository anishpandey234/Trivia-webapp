import React from 'react';
import Quiz from './Quiz';

const QuizPage = ({ quiz }) => {
  if (!quiz) {
    return <p>No quiz available</p>;
  }

  return <Quiz quiz={quiz} />;
};

export default QuizPage;
