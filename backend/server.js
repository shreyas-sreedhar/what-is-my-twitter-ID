const express = require('express');
const axios = require('axios');
const rateLimit = require('express-rate-limit'); 
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.static('frontend'))
const btokn = process.env.BEARER_TOKEN;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 100 requests per windowMs
   message: 'Too many requests from this IP, please try again later.'
});

app.use(limiter);
app.get('/api/gettwtid', async (req, res) => {
    const username = req.query.username;

    if (!username) {
        return res.status(400).json({ error: 'No username provided' });
    }

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api.twitter.com/2/users/by/username/${username}`,
        headers: {
            'Authorization': `Bearer ${btokn}`
        }
    };

    try {
        const response = await axios.request(config);
        const twitterId = response.data.data.id;
        res.send(twitterId); // Send just the ID to the frontend
    } catch (error) {
        console.error('Error: Try after sometime.. Its Twitters fault', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch data from Twitter API' });
     
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
