import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const port = 8000;
const token = process.env.YA_TOKEN;

app.use(cors());

async function getCurrentTrack() {
    try {
        const response = await axios.get(`https://api.mipoh.ru/get_current_track_beta?ya_token=${token}`);
        const trackData = response.data;

        if (trackData && trackData.track) {
            const track = trackData.track;
            return {
                title: track.title,
                artist: track.artist
            };
        }
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

app.get('/current_track', async (req, res) => {
    const track = await getCurrentTrack();
    if (track) {
        res.json(track);
    } else {
        res.status(500).send('Error retrieving track');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
