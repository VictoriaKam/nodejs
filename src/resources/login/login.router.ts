import { Request, Response } from 'express';
import express = require('express');
import * as loginService from './login.service';

const router = express.Router();

router.route('/').post(async (req: Request, res: Response): Promise<void> => {
  try {
    const token = await loginService(req.body.login, req.body.password);
    res.json({ token });
  } catch (e) {
    res.status(403).send(e.message);
  }
});

export = router;
