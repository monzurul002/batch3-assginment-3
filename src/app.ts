import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './modules/products/product.route';
import { OrderRoutes } from './modules/orders/order.route';
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//api routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

//chicking server is running
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to product inverntroy server');
});

// if route does not match
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found!',
    status: 404,
  });
});

export default app;
