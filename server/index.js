import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import { install } from 'source-map-support';
import nconf from './config';
import logger from './utils/logger';
import router from './routes';
import './config/rethink';

install();

const apiPath = `/${nconf.get('api:version')}`;
const app = express();

app.use(cors());
app.use(morgan('short', { stream: logger.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(apiPath, router);

app.use((req, res, next) => {
  next({ status: 404, message: 'Not Found' });
});

// error handlers
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (err.stack) {
    logger.error(err.stack);
    if (!res.headersSent) {
      return res.status(500).send({ message: 'Internal Server Error' });
    }
  }
  return res.status(err.status).send({ message: err.message });
});

export default app;

if (!module.parent) {
  const server = app.listen(nconf.get('PORT'), () => {
    logger.info(`Express server litening on port ${server.address().port}`);
  });
}
