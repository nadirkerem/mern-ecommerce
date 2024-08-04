import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

import connectDB from './config/db';

import errorHandler from './middlewares/error-handler';

import authRoutes from './routes/auth-routes';
import productRoutes from './routes/product-routes';
import orderRoutes from './routes/order-routes';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app: Application = express();

app.use(morgan('dev'));
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/orders', orderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Ecommerce API');
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
