import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Product from '../models/Product';
import Order from '../models/Order';

async function mockStripeAPI({
  amount,
  currency,
}: {
  amount: number;
  currency: string;
}) {
  const client_secret = 'mock_secret';
  return { client_secret, amount };
}

export async function getAllOrders(req: Request, res: Response) {}

export async function getSingleOrder(req: Request, res: Response) {}

export async function getCurrentUserOrders(req: Request, res: Response) {}

export async function createOrder(req: Request | any, res: Response) {
  const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    res.status(400).json({ message: 'Items are required' });
    return;
  }

  if (!tax || !shippingFee) {
    res.status(400).json({ message: 'Tax and shipping fee are required' });
    return;
  }

  let orderItems = [];
  let subTotal = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const product = await Product.findById(cartItems[i].product);

    if (!product) {
      res.status(400).json({ message: 'Product not found' });
      return;
    }

    const { name, price, image, _id } = product;

    const orderItem = {
      product: _id,
      name,
      price: Math.round(price * 100),
      image,
      amount: cartItems[i].amount,
    };

    orderItems.push(orderItem);

    subTotal += orderItem.price * orderItem.amount;
  }

  const total = tax + shippingFee + subTotal;

  const paymentIntent = await mockStripeAPI({
    amount: total,
    currency: 'usd',
  });

  const order = await Order.create({
    user: req.user.userId,
    orderItems,
    tax,
    shippingFee,
    subTotal,
    total,
    clientSecret: paymentIntent.client_secret,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret });
}

export async function updateOrder(req: Request, res: Response) {}

export async function deleteOrder(req: Request, res: Response) {}
