import React from 'react';
import Quiz from './Quiz';

const QuizPage = ({ quiz,currentUser }) => {
  if (!quiz) {
    return <p>No quiz available</p>;
  }

  return <Quiz quiz={quiz} currentUser={currentUser} />;
};

export default QuizPage;
