// src/ index.js

import express from 'express';
import dotenv from 'dotenv';
import changeCase from 'change-case';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import restify from 'express-restify-mongoose';
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
  res.json({ signin: 'ok' });
});

const router = express.Router();
restify.serve(router, userModel);

app.use(router);

Object.keys(routes).forEach((routeName) => {
  const customerRouter = express.Router();
  routes[routeName].default(router);
  app.use(`/api/${changeCase.paramCase(routeName)}`, customerRouter);
});

export default app;
