import express, { Request, Response, Express } from 'express';
import { logger } from '../lib/logger';

class Server {
    private app: Express;
    private port: number;

    constructor(port: number) {
        this.port = port;
        this.app = express();
        this.app.use(express.json());
        this.app.get('', this.handleGetRequest);
        this.app.post('', this.handlePostRequest);
    }

    private handleGetRequest = (req: Request, res: Response) => {
        logger.info('Received a GET request.');
        res.send({ answer: '0' });
    };

    private handlePostRequest = (req: Request, res: Response) => {
        logger.info('Received a POST request.');
        const { val1, val2 } = req.body;
        val1 && val2
            ? res.send({ answer: `${val1 * val2}` })
            : res.send({ error: 'Invalid input. val1, val2 are not found in data.' });
    };

    public server = () => {
        const server = this.app.listen(this.port, () => {
            console.log(`Server is listening at http://localhost:${this.port}`);
        });
        return server;
    };
}

export default Server;
