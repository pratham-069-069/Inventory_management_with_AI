import dotenv from 'dotenv';
dotenv.config(); // ✅ Load environment variables

import express from 'express';
import pg from 'pg';
import cors from 'cors';

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false 
  });
  
  
  pool.connect()
    .then(() => console.log("✅ Connected to PostgreSQL successfully!"))
    .catch(err => console.error("PostgreSQL Connection Error: ", err));

    const app = express();
    app.use(cors()); // 
    app.use(express.json()); 


// Get all products
app.get('/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get inventory alerts
app.get('/alerts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inventory_alerts');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Chatbot integration (DeepSeek)
app.post('/chatbot', async (req, res) => {
  const { message } = req.body;
  try {
    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NVIDIA_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-ai/deepseek-r1",
        messages: [{ "role": "user", "content": message }],
        temperature: 0.6,
        top_p: 0.7,
        max_tokens: 1025
      })
    });

    const data = await response.json();
    res.json({ reply: data.choices[0]?.message?.content || "I'm not sure." });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error connecting to chatbot API' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
