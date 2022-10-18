import express from 'express';
import F1Service from './F1Service';
import cors from 'cors'

const f1Service = new F1Service();
const app = express();
app.use(cors());
const port = 8080;

const apiBaseUrl = '/api/f1/:year/'

app.get(`/`, async (req, res) => {
    res.send('healthcheck');
});

app.get(`${apiBaseUrl}standings`, async (req, res) => {
    try {
        const year = req.params.year;
        const data = await f1Service.getStandings(year);
        res.send(data);
    } catch (err) {
        res.status(500).send('Error retrieving data');
    }
});

app.get(`${apiBaseUrl}:round/results`, async (req, res) => {
    try {
        const year = req.params.year;
        const round = req.params.round;
        const data = await f1Service.getResults(year, round);
        res.send(data);
    } catch (err) {
        res.status(500).send('Error retrieving data');
    }
});

export const server = app.listen(port, () => {
    return console.log(`Server listening http://localhost:${port}`);
});

export default app;