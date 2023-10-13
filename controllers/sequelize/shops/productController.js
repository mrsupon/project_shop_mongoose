import Product from "../../models/sequelize/product.js"

class ProductController{

    static index(req, res){
        Product.findAll()
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
        //Product.findByPk(id)
        Product.findAll({where: {id: id}})
        .then((product)=>{ 
            res.render('shops/products/show.ejs', { 
                products: product[0] ,
                pageTitle: product[0].title,
                path: ''
            });
        })
        .catch( err=>console.log(err) );
    }

}

export default ProductController;