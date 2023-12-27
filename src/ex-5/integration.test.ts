import axios from 'axios';
import { port } from '../config';
import server from '../lib/server';

describe('Integration Tests', () => {
    beforeAll(() => {
        server;
    });

    it('GET request should return { answer: "0" }', async () => {
        const response = await axios.get(`http://localhost:${port}`);
        expect(response.status).toBe(200);
        expect(response.data).toEqual({ answer: '0' });
    });

    it('POST request with valid input should return the correct multiplication result', async () => {
        const response = await axios.post(`http://localhost:${port}`, { val1: 2, val2: 3 });
        expect(response.status).toBe(200);
        expect(response.data).toEqual({ answer: '6' });
    });

    it('POST request with invalid input should return an error message', async () => {
        const response = await axios.post(`http://localhost:${port}`, { invalidKey: 'value' });
        expect(response.status).toBe(200);
        expect(response.data).toEqual({
            error: 'Invalid input. val1, val2 are not found in data.',
        });
    });

    afterAll(() => {
        server.close();
    });
});
