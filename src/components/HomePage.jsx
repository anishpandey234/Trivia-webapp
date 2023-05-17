import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress'; 
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import parseQuiz from '../utils/parseQuiz';
axios.defaults.baseURL = 'http://localhost:5000';

const InputField = styled(TextField)({
    width: '90%',
    marginBottom: '1rem',
    '& .MuiInputBase-inputMultiline': {
      minHeight: '2rem',
    },
  });

  const StyledButton = styled(Button)(({ theme, loading }) => ({
    marginTop: '1rem',
    backgroundColor: loading ? 'white' : theme.palette.primary.main, // Change 'white' to the color you want
  }));

const HomePage = ({ setQuiz, currentUser }) => {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false); // add this line
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // set loading to true when the request starts

        try {
            const response = await axios.post("/api/submit-text", { text });
            if (response.status === 200) {
                const data = response.data;
                console.log(data.choices[0].message.content);
                const parsedQuiz = parseQuiz(data.choices[0].message.content);

                setQuiz(parsedQuiz);
                navigate("/quiz");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        } finally {
            setLoading(false); // set loading to false when the request finishes
        }
    };

return (
    <div>

    <Box
    component="form"
    noValidate
    autoComplete="off"
    onSubmit={handleSubmit}
    sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    m: 2,
    width: '90vh'
    }}
>
    <h1>Quizzify</h1>
    <InputField
    id="outlined-multiline-static"
    label="Enter your text"
    multiline
    rows={10}
    variant="outlined"
    value={text}
    onChange={e => setText(e.target.value)}
    />
    <StyledButton variant="contained" type="submit" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : "Create Quiz"}
                </StyledButton>
</Box>
</div>
);
};

export default HomePage;
