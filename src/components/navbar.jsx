import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { collection, query, onSnapshot } from "firebase/firestore";
import { doc,getDoc } from 'firebase/firestore';
import { signInWithGoogle, signOutUser } from '../firebase';
import { db } from '../firebase';
import { useState, useEffect } from 'react';
import QuizDrawer from './quizDrawer';

const NavBar = ({currentUser, setCurrentUser,setQuiz}) => {
  const [profilePic, setProfilePic] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [quizzesList, setQuizzesList] = useState([]);


  useEffect(() => {
    if (currentUser) { // only run the query if the user is logged in
        const userQuizCollection = collection(db, 'users', currentUser, 'quizzes');
        const q = query(userQuizCollection);
    
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let quizzesArray = [];
        let quizTitlesArray= [];
        querySnapshot.forEach((doc) => {
            quizzesArray.push({ id: doc.id, ...doc.data() });
        });
        console.log(quizzesArray);
        quizzesArray.forEach((e)=>{
            quizTitlesArray.push(e.name);
        });
        console.log(quizTitlesArray);
        setQuizzesList(quizzesArray);
        });
    
        // Cleanup function to unsubscribe from the snapshot listener
        return () => unsubscribe();
    }
    }, [currentUser]); // re-run the effect when the currentUser changes

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        console.log(currentUser);
        const userDoc = doc(db, 'users', currentUser);
        const userData = await getDoc(userDoc);
        
        if (userData.exists()) {
          setProfilePic(userData.data().profilePic);
        }
      };

      fetchUserData();
    }
    else{
      setProfilePic(null);
    }
  }, [currentUser]);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <div>
    <AppBar position="fixed" style={{top: 0, left: 0, width: '100%'}}>
      <Toolbar>
      <IconButton color="inherit" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Saved Quizzes
        </Typography>
        {profilePic ? (
          <>
            <img src={profilePic} referrerPolicy="no-referrer" alt="Profile" style={{ height: '35px', width:'35px', borderRadius: '50%' }} />
            <Button color="inherit" onClick={() => signOutUser(() => setCurrentUser(null))} >Logout</Button>
          </>
        ) : (
          <Button color="inherit" onClick={() => signInWithGoogle(setCurrentUser)} >Login</Button>
        )}
      </Toolbar>
    </AppBar>
    <QuizDrawer quizzesList={quizzesList} drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} setQuiz={setQuiz} />
    </div>
  );
};

export default NavBar;
