require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5505;

app.get('/history/wikipedia/:month/:day', async (req, res) => {
    const { month, day } = req.params;
    try {
        const response = await axios.get(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/all/${month}/${day}`);
        res.json(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

app.get('/history/numbersapi/:month/:day', async (req, res) => {
    const { month, day } = req.params;
    try {
        const response = await axios.get(`http://numbersapi.com/${month}/${day}/date?json`);
        res.json(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

app.get('/history/numbersapi/year/:year', async (req, res) => {
    const { year } = req.params;
    try {
        const response = await axios.get(`http://numbersapi.com/${year}/year?json`);
        res.json(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
