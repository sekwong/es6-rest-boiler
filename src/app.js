// src/ index.js

import express from 'express';
import dotenv from 'dotenv';
import changeCase from 'change-case';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import restify from 'express-restify-mongoose';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import expressListRoutes from 'express-list-routes';

import routes from './routes';
import userModel from './models/userModel';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(methodOverride());

mongoose.connect('mongodb://localhost:27017/database');

// @todo move to auth.js
app.post('/api/v1/auth/signup', (req, res) => {
  res.json({ signup: 'ok' });
});

app.post('/api/v1/auth/signin', (req, res) => {
  const token = jwt.sign({ signin: true }, process.env.JWT_SECRET);
  res.json({ signin: 'ok', apiToken: token });
});

app.get('/api/v1/protected', expressJwt({ secret: process.env.JWT_SECRET }), (req, res) => {
  if (!req.user.signin) return res.sendStatus(401);
  res.sendStatus(200);
});

const router = express.Router();
restify.serve(router, userModel);

app.use(router);

Object.keys(routes).forEach((routeName) => {
  const customerRouter = express.Router();
  routes[routeName].default(customerRouter);
  app.use(`/api/${changeCase.paramCase(routeName)}`, customerRouter);
});

expressListRoutes({ prefix: '/api/v1' }, 'API:', router);
export default app;
