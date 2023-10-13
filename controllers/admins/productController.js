import Product from "../../models/mongoose/product.js"

class ProductController{

    static index(req, res){
        Product.find()  // if alot of data use .cursor().next() to do pagination
        //.select('title description price imageUrl -_id')
        //.populate('userId', 'name email')
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
        const product = new Product({
            title:title,
            description:description,
            imageUrl:imageUrl,
            price:price,  
            userId:req.session.user._id               
        });
        product.save()
        .then( result=>res.redirect('/admins/products') )
        .catch( err=>console.log(err) );

    }    

    static edit(req, res){
        const id = req.params.id ;
        Product.findById(id)
        .then((product)=>{ 
            res.render('admins/products/edit.ejs', { 
                products: product ,
                pageTitle: 'Edit Product',
                path: ''
            });
        })
        .catch( err=>console.log(err) );     
    }

    static update(req, res){
        const id = req.params.id ;
        Product.findById(id)
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
        const id = req.params.id ;
        Product.findByIdAndRemove(id)
        .then( result =>{
            console.log("Deleted Products Successfully")
            res.redirect("/admins/products");            
        })
        .catch( err=>console.log(err) );
    } 

    
}

export default ProductController ;