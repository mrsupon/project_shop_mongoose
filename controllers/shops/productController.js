import Product from "../../models/mongoose/product.js";

class ProductController{

    static index(req, res){
        Product.find()
        .then( (products) => {
            res.render('shops/products/index.ejs', {
            products: products ,
            pageTitle: 'Products in shop',
            path: '/shops/products'
            });
        })
        .catch( err=>console.log(err) );
    }

    static show(req, res){
        let id = req.params.id ; 
        Product.findById(id)
        .then((product)=>{ 
            res.render('shops/products/show.ejs', { 
                products: product ,
                pageTitle: product.title,
                path: ''
            });
        })
        .catch( err=>console.log(err) );
    }

}

export default ProductController;