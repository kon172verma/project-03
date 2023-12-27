import express, { Request, Response } from 'express';
import { logger } from './lib/logger';

const port = 8080;
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

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

// Testing URLs

// GET request
// curl - X GET http://localhost:8080 -w "\n"

// POST request
// curl -X POST -H "Content-Type: application/json" -d '{"val1": 2, "val2": 3}' http://localhost:8080 -w "\n"

// Note: -w "\n" is used to print a new line after the response body, and remove the % sign.
