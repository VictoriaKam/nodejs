import { Request, Response } from 'express';
import express = require('express');
import * as usersService from './user.service';
import User = require('./user.model');

const router = express.Router();

router.route('/').get(async (_req: Request, res: Response): Promise<void> => {
  const users = await usersService.getAll();
  if (users) { res.json(users.map(User.toResponse)) };
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
  const user = await usersService.create(
    new User({
      login: req.body.login,
      password: req.body.password,
      name: req.body.name
    })
  );

  res.status(201);
  res.json(User.toResponse(user));
});

router.route('/:id').put(async (req: Request, res: Response): Promise<void> => {
  const {id} = req.params
  try {
    const user = await usersService.update(id,
      {
        login: req.body.login,
        password: req.body.password,
        name: req.body.name
      });

      res.json(User.toResponse(user));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').delete(async (req: Request, res: Response): Promise<void> => {
  const {id} = req.params
  try {
    const user = await usersService.remove(id);
    res.json(User.toResponse(user));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

export = router;
