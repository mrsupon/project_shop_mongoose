import Product from "../../models/mongoose/product.js";

class ShopController{

    static index(req, res){
        Product.find()
        .then( (products) => {
            res.render('shops/index.ejs', {
            products: products ,
            pageTitle: 'Our Shop',
            path: '/',
            errorFields: req.flash('errorFields'),                
            messages: req.flash(),
            });
        })
        .catch( err=>console.log(err) );
    }

}

export default ShopController;