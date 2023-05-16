const parseQuiz = (text) => {
    const quiz = { questions: [], choices: [], answers: [] };
    const lines = text.split('\n');
  
    for (let i = 0; i < lines.length; i += 7) {
      quiz.questions.push(lines[i]);
  
      const choiceTexts = [lines[i + 1], lines[i + 2], lines[i + 3], lines[i + 4]];
      const answerLine = lines[i + 5];
      const answerIndex = answerLine.split(' ')[1];
      const answerMap = { "A": 0, "B": 1, "C": 2, "D": 3 };
      const correctIndex = answerMap[answerIndex];
  
      const choices = choiceTexts.map((choiceText, index) => {
        return {
          answerText: choiceText,
          isCorrect: index === correctIndex
        }
      });
  
      quiz.choices.push(choices);
    }
  
    return quiz;
  }
  
  export default parseQuiz;
  