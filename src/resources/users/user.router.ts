import { Request, Response } from 'express';
import express = require('express');
import * as usersService from './user.service';

const router = express.Router();

router.route('/').get(async (_req: Request, res: Response): Promise<void> => {
  const users = await usersService.getAll();
  if (users) { res.send(users) };
});

router.route('/:id').get(async (req: Request, res: Response): Promise<void> => {
  const {id} = req.params;
  try {
    const user = await usersService.get(id);
    res.json(user);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req: Request, res: Response): Promise<void> => {
  const user = await usersService.create(req.body);
  const userToResponse = { id: user.id, login: user.login, name: user.name };
  res.status(201);
  res.send(userToResponse);
});

router.route('/:id').put(async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await usersService.update(req.params.id, req.body);
    res.json(user);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').delete(async (req: Request, res: Response): Promise<void> => {
  const {id} = req.params
  try {
    const user = await usersService.remove(id);
    res.send(user);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

export = router;
