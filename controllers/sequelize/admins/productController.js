import Product from "../../models/sequelize/product.js"

class ProductController{

    static index(req, res){
        Product.findAll()
        .then( (products) => {
            res.render('admins/products/index.ejs', {
            products: products ,
            pageTitle: 'Products',
            path: '/admins/products'
            });
        })
        .catch( err=>console.log(err) );
    }

    static create(req, res){
        res.render("admins/products/create.ejs", {
            pageTitle: 'Add Product',
            path: '/admins/products/create'
        });
    }

    static store(req, res){
        const title = req.body.title;
        const imageUrl = req.body.imageUrl;
        const description = req.body.description;
        const price = parseFloat(req.body.price); 

        req.user.createProduct({
            title:title,
            description:description,
            imageUrl:imageUrl,
            price:price                
        })
        .then( result=>res.redirect('/admins/products') )
        .catch( err=>console.log(err) );

    }    

    static edit(req, res){
        req.user.getProducts({where:{id:req.params.id}})
        .then((products)=>{ 
            res.render('admins/products/edit.ejs', { 
                products: products[0] ,
                pageTitle: 'Edit Product',
                path: ''
            });
        })
        .catch( err=>console.log(err) );     
    }

    static update(req, res){
        Product.findByPk(req.params.id)
        .then((product)=>{ 
            product.title = req.body.title;
            product.imageUrl = req.body.imageUrl;
            product.description = req.body.description;
            product.price = req.body.price;
            return product.save();
        })
        .then( result =>{
            console.log("Updated Products Successfully")
            res.redirect("/admins/products");            
        })
        .catch( err=>console.log(err) );  

    } 

    static destroy(req, res){ 
        Product.findByPk(req.params.id)
        .then((product)=>{ 
            product.destroy();
        })
        .then( result =>{
            console.log("Deleted Products Successfully")
            res.redirect("/admins/products");            
        })
        .catch( err=>console.log(err) );
    } 

    
}

export default ProductController ;