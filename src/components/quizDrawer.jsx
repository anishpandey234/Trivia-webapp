import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { useNavigate } from "react-router-dom";
import ListItem from '@mui/material/ListItem';
import {db} from '../firebase'
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { doc, deleteDoc } from "firebase/firestore";


export default function QuizDrawer({ currentUser,quizzesList, drawerOpen, toggleDrawer, setQuiz }) {
    const navigate = useNavigate();
  
    const handleQuizClick = (quiz) => {
      setQuiz(quiz.quiz);
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
              <ListItemText primary={quiz.name} />
              <IconButton 
                edge="end" 
                aria-label="delete"
                onClick={async (event) => {
                  event.stopPropagation(); // Prevents the click event from bubbling up to the ListItem
                  const quizDocRef = doc(db, 'users', currentUser, 'quizzes', quiz.id);
                  await deleteDoc(quizDocRef);
                }}
              >
                <DeleteIcon />
              </IconButton>
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