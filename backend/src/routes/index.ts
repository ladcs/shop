import { Router } from 'express';
import products from './products';

const app = Router();

app.use(products);

export default app;