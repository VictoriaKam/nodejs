import { Request, Response } from 'express';
import express = require('express');
import * as tasksService from './task.service';
import Task = require('./task.model');

const router = express.Router( {mergeParams: true} );

router.route('/').get(async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await tasksService.getAll(req.params.boardId);
    res.json(tasks.map(Task.toResponse));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:taskId').get(async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await tasksService.get(req.params.boardId, req.params.taskId);
    res.json(Task.toResponse(task));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req: Request, res: Response): Promise<void> => {
  const task = await tasksService.create(req.params.boardId,
    new Task({
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.params.boardId,
      columnId: req.body.columnId
    })
  );

  res.status(201);
  res.json(Task.toResponse(task));
});

router.route('/:taskId').put(async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await tasksService.update(req.params.boardId, req.params.taskId,
      {
        title: req.body.title,
        order: req.body.order,
        description: req.body.description,
        userId: req.body.userId,
        boardId: req.body.boardId,
        columnId: req.body.columnId
      });

      res.json(Task.toResponse(task));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:taskId').delete(async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await tasksService.remove(req.params.boardId, req.params.taskId);
    res.json(Task.toResponse(task));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

export = router;
