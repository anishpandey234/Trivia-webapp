require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/api/submit-text', async (req, res) => {
  const text = req.body.text;
  
  try {
    const gptResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{"role":"user","content":
      `Generate 5 multiple-choice quiz questions with 4 choices each and 
      indicate the correct answer about the following text: "${text}. 
      Make sure you do it in the following format:
      Question text (space)
      A. Option A (space)
      B. Option B (space)
      C. Option C (space)
      D. Option D (space)
      Answer: X"`}],
      max_tokens: 1500
    });

    res.json(gptResponse.data);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});


const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
