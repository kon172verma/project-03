import express, { Request, Response } from 'express';
import { logger } from '../lib/logger';
import { port } from '../config';

const app = express();
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
    logger.info('Received a GET request.');
    res.send({ answer: '0' });
});

app.post('/', (req: Request, res: Response) => {
    logger.info('Received a POST request.');
    const { val1, val2 } = req.body;
    val1 && val2
        ? res.send({ answer: `${val1 * val2}` })
        : res.send({ error: 'Invalid input. val1, val2 are not found in data.' });
});

const server = app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

export default server;
