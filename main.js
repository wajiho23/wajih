const express = require('express');
const app = express();

// Replace with your actual Gemini API key
const geminiApiKey = 'AIzaSyB71tax9PltgOkgqhNngmqJmD6a2ptyeGg';

app.use(express.json());

app.post('/api/analyze', async (req, res) => {
  const { fen } = req.body;

  try {
    // Construct the request to the Gemini API
    const geminiResponse = await fetch('https://api.gemini.com/v1/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${geminiApiKey}`
      },
      body: JSON.stringify({ 
        fen: fen,
        // Add other parameters as needed (e.g., depth, format) 
      })
    });

    const geminiData = await geminiResponse.json();

    // Process the Gemini API response and extract relevant data
    const analysis = {
      ideas: geminiData.ideas,
      strategy: geminiData.strategy, 
      plans: geminiData.plans,
      kingSafety: geminiData.kingSafety // Assuming Gemini provides this
    };

    res.json(analysis);
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => console.log('Server listening on port 3000'));