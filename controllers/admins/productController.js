import Product from "../../models/mongoose/product.js"
import z from "zod"
import Utility from "../../utils/utility.js"

class ProductController{

    static index(req, res){
        Product.find()  // if alot of data use .cursor().next() to do pagination
        //.select('title description price imageUrl -_id')
        //.populate('userId', 'email password')
        .then( (products) => { 
            res.render('admins/products/index.ejs', {
            products: products ,
            pageTitle: 'Products',
            path: '/admins/products',
            errorFields: req.flash('errorFields'),                
            messages: req.flash(),
            });
        })
        .catch( err=>console.log(err) );
        
    }

    static create(req, res){ 
            res.render("admins/products/create.ejs", { 
                pageTitle: 'Add Product',
                path: '/admins/products/create',
                errorFields: req.flash('errorFields'),                
                messages: req.flash(),
            });       
    }

    static store(req, res){
        const data = {};
        data.title = req.body.title.trim();
        data.imageUrl = req.body.imageUrl.trim();
        data.description = req.body.description.trim();
        data.price = parseFloat(req.body.price); 
        data.userId = req.session.user._id;
        // Zod Input Validation////////// 
        const schema = z.object({
            data: z.object({
                    title: z.string({
                                required_error: "Title is required",
                                invalid_type_error: "Title must be a string",
                            }).min(5,'Title should be /n at least 5 character(s)').max(256,'Title should be /n at most 256 character(s)'), //.regex(new RegExp('^[a-zA-Z0-9]*$'), 'Title should be /n alphanumeric'),
                    imageUrl: z.string({
                                required_error: "ImageUrl is required",
                                invalid_type_error: "ImageUrl must be URL format",
                            }).url('ImageUrl should be /n URL format'),//.regex(new RegExp('/^\w+$/'),'Password should be /n an alphanumeric' ),//.regex(new RegExp('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'), 'Password should be /n contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'),
                    price: z.coerce.number({
                                required_error: "Price is required",
                                invalid_type_error: "Price must be a number",
                            }).positive('Price should be /n positive number'),
                    description: z.string().optional(), 
                })
        });
        const validateResult = Utility.validate(schema, data);   
        if( validateResult !== null ){ 
            req.flash('error', validateResult.errorMessages);
            req.flash('errorFields', validateResult.errorFields);
            return res.redirect("/admins/products/create");
        } 
        ////////////////////////////////// 

        const product = new Product(data);
        product.save()
        .then( result=>{
            req.flash('success', 'Add New Product Successfully');
            res.redirect('/admins/products');  
        })
        .catch( err=>console.log(err) );

    }  

    static edit(req, res){
        const productId = req.params.id ;
        let error ;
        Product.findById(productId)
        .then((product)=>{  
            if(product.userId.toString() !== (req.session.user._id).toString() ){   //Authorization
                req.flash('error', 'Invalid Authorization');
                return res.redirect('/admins/products');
            }            
            res.render('admins/products/edit.ejs', { 
                products: product ,
                pageTitle: 'Edit Product',
                path: '/admins/products/edit',
                errorFields: req.flash('errorFields'),                
                messages: req.flash(),
            });
        })
        .catch( err=>console.log(err) );     
    }

    static update(req, res){
        const productId = req.params.id ;
 
        Product.findById(productId)
        .then((product)=>{ 
            if(product.userId.toString() !== (req.session.user._id).toString() ){   //Authorization
                req.flash('error', 'Invalid Authorization');
                return res.redirect('/admins/products');
            } 
            product.title = req.body.title.trim();
            product.imageUrl = req.body.imageUrl.trim();
            product.description = req.body.description.trim();
            product.price = parseFloat(req.body.price); 
            // Zod Input Validation////////// 
            const schema = z.object({
                data: z.object({ 
                        title: z.string({
                                    required_error: "Title is required",
                                    invalid_type_error: "Title must be a string",
                                }).min(5,'Title should be /n at least 5 character(s)').max(256,'Title should be /n at most 256 character(s)'), //.regex(new RegExp('^[a-zA-Z0-9]*$'), 'Title should be /n alphanumeric'),
                        imageUrl: z.string({
                                    required_error: "ImageUrl is required",
                                    invalid_type_error: "ImageUrl must be URL format",
                                }).url('ImageUrl should be /n URL format'),//.regex(new RegExp('/^\w+$/'),'Password should be /n an alphanumeric' ),//.regex(new RegExp('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'), 'Password should be /n contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'),
                        price: z.coerce.number({
                                    required_error: "Price is required",
                                    invalid_type_error: "Price must be a number",
                                }).positive('Price should be /n positive number'),
                        description: z.string().optional(), 
                    })
            });
    
            const validateResult = Utility.validate(schema, product);  
            if( validateResult !== null ){ 
                req.flash('error', validateResult.errorMessages);
                req.flash('errorFields', validateResult.errorFields);
                return res.render('admins/products/edit.ejs', { 
                    products: product ,
                    pageTitle: 'Edit Product',
                    path: '/admins/products/edit',
                    errorFields: req.flash('errorFields'),                
                    messages: req.flash(),
                });
            }
            //////////////////////////////////  
            return product.save();
        })    
        .then( result =>{
            req.flash('success', 'Updated Product Successfully');
            return res.redirect("/admins/products");            
        })
        .catch( err=>console.log(err) );  
    } 

    static destroy(req, res){ 

        const productId = req.params.id ; 
        Product.findById(productId)
        .then((product)=>{ 
            if(product.userId.toString() !== (req.session.user._id).toString() ){   //Authorization
                req.flash('error', 'Invalid Authorization');
                return res.redirect('/admins/products');
            } 
        })
        .catch( err=>console.log(err) );

        Product.deleteOne({_id: productId, userId: req.session.user._id})
        .then( result => {
            req.flash('success', 'Deleted Product Successfully');
            return res.redirect("/admins/products");            
        })
        .catch( err=>console.log(err) );
    } 

    
}

export default ProductController ;

  
  
