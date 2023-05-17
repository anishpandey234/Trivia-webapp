import * as React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

const StyledButton = styled(Button)({
  marginTop: '1rem'
});

const HomePage = ({ setQuiz, currentUser }) => {
const [text, setText] = useState("");
const navigate = useNavigate();

const handleSubmit = async (event) => {
event.preventDefault();

try {
    const response = await axios.post("/api/submit-text", { text });
    if (response.status === 200) {
    const data =response.data;
    const tokens = data.usage.total_tokens;
    console.log(data.choices[0].message.content);
    const parsedQuiz = parseQuiz(data.choices[0].message.content);

    setQuiz(parsedQuiz);
    navigate("/quiz");
    }
} catch (error) {
    console.error("An error occurred:", error);
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
    <StyledButton variant="contained" type="submit">
    Create Quiz
    </StyledButton>
</Box>
</div>
);
};

export default HomePage;
