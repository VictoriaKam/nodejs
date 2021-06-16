import { Request, Response } from 'express';

import express = require('express');
import swaggerUI = require('swagger-ui-express');
import path = require('path');
import YAML = require('yamljs');
import {
  StatusCodes,
  getReasonPhrase,
} from 'http-status-codes';
import winston = require('winston');
import stream = require('stream');
import userRouter = require('./resources/users/user.router');
import boardRouter = require('./resources/boards/board.router');
import taskRouter = require('./resources/tasks/task.router');
import HttpException = require('./types/error');

const app = express();

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.cli()
  ),
  transports: [
    new winston.transports.File({ filename: 'request-response.log' }),
    new winston.transports.File({ filename: 'error.log', level: 'error', format: winston.format.combine(
      winston.format.uncolorize(),
      winston.format.json()
    ), }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'exceptions.log' }),
    new winston.transports.File({ filename: 'combined.log' })
  ],
  exitOnError: false,
});

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use((req, res, next) => {
  const { method, url, body, query } = req;
  next();

  stream.finished(res, () => {
    const { statusCode } = res;
    logger.info(`${method} url: ${url}; query: ${JSON.stringify(query)}; body: ${JSON.stringify(body)}; status code: ${statusCode}`)
  })
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

// Here You can test that middleware will return 500 Internal Server Error for unhandled errors
app.get('/error', (req, res) => {
  throw new Error("500");
})

app.use((err: HttpException, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);

  const error500 = StatusCodes.INTERNAL_SERVER_ERROR;

  res.status(error500).send(getReasonPhrase(error500));

  logger.error(`${error500} (${getReasonPhrase(error500)})`);

  next();
});

process.on('unhandledRejection', (reason, p) => {
  logger.debug(reason);
});

// To test unhandledRejection handler please uncomment next line
// Promise.reject(Error('Unhandled Rejection Err'));

process.on('uncaughtException', err => {
  logger.debug(err);
});

// To test uncaughtException handler please uncomment next line
// throw Error('Uncaught Exception Err');

export = app;
