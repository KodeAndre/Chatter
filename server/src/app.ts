import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import config from 'config';
import logger from './utils/logger';
import { version } from '../package.json'
import socket from './socket'

const port = config.get<number>('port');
const host = config.get<string>('host');
const corsOrigin = config.get<string>('corsOrigin');

const app = express()

const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: corsOrigin,
        credentials: false,
    }
});

app.get('/', (req, res) => res.send(`Server is up and running on Version ${version}`))

httpServer.listen(port, host, () => {
    logger.info(`server is Version: ${version}`);
    logger.info(`server is listening on http://${host}:${port} on Version: ${version}`);

    socket({ io })
});