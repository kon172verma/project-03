import { PORT } from './config';
import Server from './server';

const serverInstance = new Server(PORT);
serverInstance.server();
