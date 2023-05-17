import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { useNavigate } from "react-router-dom";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function QuizDrawer({ quizzesList, drawerOpen, toggleDrawer, setQuiz }) {
  const navigate = useNavigate();

  const handleQuizClick = (quiz) => {

    quiz= quiz.quiz;
    console.log(quiz);
    setQuiz(quiz);
    toggleDrawer(false)(); // Close the drawer
    navigate("/quiz");
  };

  const list = (
    <Box
      sx={{ width: 250, mt:3 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {quizzesList.map((quiz, index) => (
          <ListItem button key={quiz.id} onClick={() => handleQuizClick(quiz)}>
            <ListItemButton>
              <ListItemIcon>
                {/* Add any icon here */}
              </ListItemIcon>
              <ListItemText primary={quiz.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor='left'
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list}
      </SwipeableDrawer>
    </div>
  );
}
