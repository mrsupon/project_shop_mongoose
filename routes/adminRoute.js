import express from 'express';
import AdminsProductController from '../controllers/admins/productController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const AdminRoute = express.Router();

AdminRoute.get('/products', AuthMiddleware.auth, AdminsProductController.index);
AdminRoute.get('/products/create', AuthMiddleware.auth, AdminsProductController.create);
AdminRoute.post('/products', AuthMiddleware.auth, AdminsProductController.store);
AdminRoute.get('/products/:id/edit', AuthMiddleware.auth, AdminsProductController.edit);
AdminRoute.put('/products/:id', AuthMiddleware.auth, AdminsProductController.update);
AdminRoute.delete('/products/:id', AuthMiddleware.auth, AdminsProductController.destroy);

export default AdminRoute;
