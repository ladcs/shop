import { Router } from 'express';
import PackController from '../controller/Pack';

const ROUTE = '/pack';

const app = Router();

const controller = new PackController();

app.get(ROUTE, controller.getAllPack);
app.get(`${ROUTE}/:packId`, controller.getOnePackByPackId);
app.get(`${ROUTE}_price/`, controller.getAllPackPrices);
app.get(`${ROUTE}_price/:packId`, controller.getOnePackPriceByPackId);

export default app;