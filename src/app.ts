import express = require('express');
import swaggerUI = require('swagger-ui-express');
import path = require('path');
import YAML = require('yamljs');
import userRouter = require('./resources/users/user.router');
import boardRouter = require('./resources/boards/board.router');
import taskRouter = require('./resources/tasks/task.router');
import HttpException = require('./types/error');

const app = express();
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

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.use((err: HttpException, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
  next();
});

export = app;