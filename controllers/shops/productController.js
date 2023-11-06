import Product from "../../models/mongoose/product.js";
import Pagination from "../../utils/pagination.js";

class ProductController{

    static index(req, res){
        const currentPage = parseInt(req.query.page||1) ; 
        const itemsPerPage = 3;
        const pagination = new Pagination();
        pagination.getResultSet(Product, itemsPerPage, currentPage)
        .then( (products) => {
            res.render('shops/products/index.ejs', {
            products: products ,
            pageTitle: 'All Products',
            path: '/shops/products',
            pagination: pagination
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
                path: '/shops/products/show'
            });
        })
        .catch( err=>console.log(err) );
    }

}

export default ProductController;
