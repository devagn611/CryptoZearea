const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const apiKey = 'CG-VUfNPSRGQNpPxYw32c3eBF98';
const headers = { accept: 'application/json', 'x-cg-demo-api-key': apiKey };

// Endpoint to fetch trending coins
app.get('/fetch-trending', async (req, res) => {
  const trendingUrl = 'https://api.coingecko.com/api/v3/search/trending';
  try {
    const response = await axios.get(trendingUrl, { headers });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trending data', error: error.message });
  }
});

// Endpoint to search coins by query
app.get('/search-coin', async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: "Query parameter 'query' is required" });
  }

  const searchUrl = `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}`;
  try {
    const response = await axios.get(searchUrl, { headers });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error searching for coin', error: error.message });
  }
});

// Refactored Endpoint to fetch market chart data for a specific coin
app.get('/fetch-chart-data', async (req, res) => {
  const { coin } = req.query;
  if (!coin) {
    return res.status(400).json({ message: 'Coin ID is required as a query parameter' });
  }

  const chartUrl = `https://api.coingecko.com/api/v3/coins/${encodeURIComponent(coin)}/market_chart?vs_currency=usd&days=1`;
  try {
    const response = await axios.get(chartUrl, { headers });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chart data', error: error.message });
  }
});

// Refactored Endpoint to fetch detailed market data for specific coins
app.get('/fetch-all-details', async (req, res) => {
  const { ids } = req.query; // List of coin IDs to fetch (comma-separated)
  if (!ids) {
    return res.status(400).json({ message: 'Coin IDs are required as a query parameter' });
  }

  const detailsUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${encodeURIComponent(ids)}`;
  try {
    const response = await axios.get(detailsUrl, { headers });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching coin details', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
