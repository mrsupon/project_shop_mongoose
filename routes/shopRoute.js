import express from 'express';

import ProductController from '../controllers/shops/productController.js';
import CartController from '../controllers/shops/cartController.js';
import OrderController from '../controllers/shops/orderController.js';
import InvoiceController from '../controllers/shops/invoiceController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const ShopRoute = express.Router();

ShopRoute.get('/products', ProductController.index);
ShopRoute.get('/products/:id', ProductController.show);

ShopRoute.get('/carts', AuthMiddleware.auth, CartController.index);
ShopRoute.post('/carts', AuthMiddleware.auth, CartController.store);
ShopRoute.delete('/carts', AuthMiddleware.auth, CartController.destroy);

ShopRoute.get('/orders', AuthMiddleware.auth, OrderController.index);
ShopRoute.post('/orders', AuthMiddleware.auth, OrderController.store);

ShopRoute.get('/invoices/:id', AuthMiddleware.auth, InvoiceController.show);

export default ShopRoute;
