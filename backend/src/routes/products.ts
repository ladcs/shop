import { Router } from 'express';
import ProductsController from '../controller/products';

const ROUTE = '/products';

const app = Router();

const controller = new ProductsController();

app.get(ROUTE, controller.getAllProducts);
app.get(`${ROUTE}/:code`, controller.getOneProductByCode);
app.patch(`${ROUTE}/:code`, controller.updatedPrice);

export default app;