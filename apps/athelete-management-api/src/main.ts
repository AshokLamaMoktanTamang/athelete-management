import express from 'express';
import { config } from '@config/index';

const app = express();

const port: number = config.port;

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
