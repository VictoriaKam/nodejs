import { Request, Response } from 'express';
import express = require('express');
import * as boardsService from './board.service';

const router = express.Router();

router.route('/').get(async (req: Request, res: Response): Promise<void> => {
  const boards = await boardsService.getAll();
  res.send(boards);
});

router.route('/:id').get(async (req: Request, res: Response): Promise<void> => {
  try {
    const board = await boardsService.get(req.params.id);
    res.json(board);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req: Request, res: Response): Promise<void> => {
  const board = await boardsService.create(req.body);
  res.status(201);
  res.send(board);
});

router.route('/:id').put(async (req: Request, res: Response): Promise<void> => {
  try {
    const board = await boardsService.update(req.params.id, req.body);
    res.send(board);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').delete(async (req: Request, res: Response): Promise<void> => {
  try {
    const board = await boardsService.remove(req.params.id);
    res.send(board);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

export = router;
