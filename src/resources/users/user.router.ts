import { Request, Response } from 'express';
import express = require('express');
import { hashSync } from 'bcrypt';
import * as usersService from './user.service';
import { User } from '../../entities/user.model';

const router = express.Router();

router.route('/').get(async (_req: Request, res: Response): Promise<void> => {
  const users = await usersService.getAll();
  if (users) { res.send(users.map(User.toResponse)) };
});

router.route('/:id').get(async (req: Request, res: Response): Promise<void> => {
  const {id} = req.params;
  try {
    const user = await usersService.get(id);
    res.json(User.toResponse(user));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req: Request, res: Response): Promise<void> => {
  req.body.password = hashSync(req.body.password, 10);
  const user = await usersService.create(req.body);
  res.status(201);
  res.send(User.toResponse(user));
});

router.route('/:id').put(async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await usersService.update(req.params.id, req.body);
    res.json(User.toResponse(user));
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
