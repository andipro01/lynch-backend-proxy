const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());

const API_KEY = 'fC8FnJcc6XVKt8JFrSMLsWj1WBSG8E8B';

app.get('/api/screen', async (req, res) => {
  try {
    const { exchange } = req.query;
    
    const url = `https://financialmodelingprep.com/api/v3/stock/list?apikey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    
    // Check if data is array, if not send error
    if (!Array.isArray(data)) {
      return res.json({ error: 'Unexpected API response', data: data });
    }
    
    // Filter by exchange if provided
    const filtered = exchange 
      ? data.filter(s => s.exchangeShortName === exchange)
      : data;
    
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(process.env.PORT || 3000);
module.exports = app;
