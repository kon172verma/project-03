import Server from '../lib/server';

const serverInstance = new Server(8080);
const server = serverInstance.server();

export default server;
