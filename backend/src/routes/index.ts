import { Router } from 'express';
import products from './products';
import packs from './packs';

const app = Router();

app.use(products);
app.use(packs);

export default app;