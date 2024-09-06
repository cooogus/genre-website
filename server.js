const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000;

// Load API key from environment variables 
const LASTFM_API_KEY = process.env.LASTFM_API_KEY;

// Serve static files from 'public' directory 
app.use(express.static('public'));

app.get('/recommend', async (req, res) => {
    const genre = req.query.genre;
    const LASTFM_API_KEY = process.env.LASTFM_API_KEY;

    if (!LASTFM_API_KEY) {
        console.error('API key is undefined');
        return res.status(500).json({ error: 'Missing API key' });
    }

    const url = `http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=${genre}&api_key=${LASTFM_API_KEY}&format=json`;
    console.log('Request URL:', url);

    try {
        const response = await axios.get(url);
        const albums = response.data.albums.album;

        if (albums && albums.length > 0) {
            // Randomly select one album from the array
            const randomAlbum = albums[Math.floor(Math.random() * albums.length)];
            res.json(randomAlbum);
        } else {
            console.log('No albums found for the genre:', genre);
            res.status(404).json({ error: 'No albums found for this genre' });
        }
    } catch (error) {
        console.error('Error fetching data from Last.fm API:', error.message);
        res.status(500).json({ error: 'Error fetching data from Last.fm API' });
    }
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
