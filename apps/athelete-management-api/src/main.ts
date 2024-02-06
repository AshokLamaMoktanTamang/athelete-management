import express from 'express';

import { config } from '@config/index';
import { router } from '@routes/main.route';

const app = express();

app.use(express.json());
app.use('/api/v1', router);

const port: number = config.port;

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
