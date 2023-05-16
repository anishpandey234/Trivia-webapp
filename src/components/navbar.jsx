import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import { doc,getDoc } from 'firebase/firestore';
import { signInWithGoogle, signOutUser } from '../firebase';
import { db } from '../firebase';
import { useState, useEffect } from 'react';

const NavBar = ({currentUser,setCurrentUser}) => {
  const [profilePic, setProfilePic] = useState(null);

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

  

  return (
    <AppBar position="fixed" style={{top: 0, left: 0, width: '100%'}}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          {/* <MenuIcon /> */}
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Saved Quizzes
        </Typography>
        {profilePic ? (
          <>
            <img src={profilePic} alt="Profile" style={{ height: '35px', width:'35px', borderRadius: '50%' }} />
            <Button color="inherit" onClick={() => signOutUser(() => setCurrentUser(null))} >Logout</Button>
          </>
        ) : (
          <Button color="inherit" onClick={() => signInWithGoogle(setCurrentUser)} >Login</Button>

        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
