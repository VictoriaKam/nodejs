import { Request, Response } from 'express';
import express = require('express');
import * as boardsService from './board.service';
import Board = require('./board.model');

const router = express.Router();

router.route('/').get(async (req: Request, res: Response): Promise<void> => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req: Request, res: Response): Promise<void> => {
  try {
    const board = await boardsService.get(req.params.id);
    res.json(Board.toResponse(board));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req: Request, res: Response): Promise<void> => {
  const board = await boardsService.create(
    new Board({
      title: req.body.title,
      columns: req.body.columns
    })
  );

  res.status(201);
  res.json(Board.toResponse(board));
});

router.route('/:id').put(async (req: Request, res: Response): Promise<void> => {
  try {
    const board = await boardsService.update(req.params.id,
      {
        title: req.body.title,
        columns: req.body.columns
      });

      res.json(Board.toResponse(board));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').delete(async (req: Request, res: Response): Promise<void> => {
  try {
    const board = await boardsService.remove(req.params.id);
    res.json(Board.toResponse(board));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

export = router;
