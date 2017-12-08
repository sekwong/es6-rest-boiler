// src/ index.js

import express from 'express';
import dotenv from 'dotenv';
import changeCase from 'change-case';
import bodyParser from 'body-parser';
import routes from './routes';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

Object.keys(routes).forEach((routeName) => {
  const router = express.Router();
  routes[routeName].default(router);
  app.use(`/api/${changeCase.paramCase(routeName)}`, router);
});
export default app;
