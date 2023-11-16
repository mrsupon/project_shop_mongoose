import ErrorController from '../controllers/errorController.js';
import ShopController from '../controllers/shops/shopController.js';
import AuthRoute from './authRoute.js';
import AdminRoute from './adminRoute.js';
import ShopRoute from './shopRoute.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

class Route {
  static init(app) {
    app.use('/auth', AuthRoute);
    app.use('/admins', AdminRoute);
    app.use('/shops', ShopRoute);

    app.get('/', ShopController.index);
    app.get('/500', AuthMiddleware.auth, ErrorController.show500);
    app.all('*', AuthMiddleware.auth, ErrorController.show404);
  }
}

export default Route;
