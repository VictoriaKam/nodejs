import { Request, Response } from 'express';
import express = require('express');
import * as tasksService from './task.service';

const router = express.Router( {mergeParams: true} );

router.route('/').get(async (req: Request, res: Response): Promise<void> => {
  const {boardId} = req.params;
  try {
    const tasks = await tasksService.getAll(boardId);
    res.send(tasks);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:taskId').get(async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await tasksService.get(req.params.boardId, req.params.taskId);
    res.json(task);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req: Request, res: Response): Promise<void> => {
  const task = await tasksService.create(req.params.boardId, req.body);
  res.status(201);
  res.send(task);
});

router.route('/:taskId').put(async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await tasksService.update(req.params.boardId, req.params.taskId, req.body);

    res.send(task);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:taskId').delete(async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await tasksService.remove(req.params.boardId, req.params.taskId);
    res.send(task);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

export = router;
