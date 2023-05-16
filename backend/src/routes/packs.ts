import { Router } from 'express';
import PackController from '../controller/Pack';

const ROUTE = '/pack';

const app = Router();

const controller = new PackController();

app.get(ROUTE, controller.getAllPack);
app.get(`${ROUTE}/:packId`, controller.getOnePackByPackId);

export default app;