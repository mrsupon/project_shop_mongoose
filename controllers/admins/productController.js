import Product from "../../models/mongoose/product.js"
import z from "zod"
import Utility from "../../utils/utility.js"
import Pagination from "../../utils/pagination.js"

class ProductController{
    static pagination = new Pagination();

    static index(req, res){
        const currentPage = parseInt(req.query.page||1) ; 
        const itemsPerPage = 3;
        ProductController.pagination.getResultSet(Product, itemsPerPage, currentPage)
        //Product.find()  // if alot of data use .cursor().next() to do pagination
        //.select('title description price imageUrl -_id')
        //.populate('userId', 'email password')
        .then( (products) => { 
            res.render('admins/products/index.ejs', {
            products: products ,
            pageTitle: 'Products',
            path: '/admins/products',
            errorFields: req.flash('errorFields'),                
            messages: req.flash(),
            pagination: ProductController.pagination
            });
        })
        .catch( err=>console.log(err) );
        
    }

    static create(req, res){ 
            res.render("admins/products/create.ejs", { 
                pageTitle: 'Add Product',
                path: '/admins/products/create',
                errorFields: req.flash('errorFields'),      // red input border active            
                messages: req.flash(),                      // toastr active
            });       
    }

    static store( req, res ){
        const image = req.file;   
        if(!image){  
            req.flash('error', 'Attached file is not .png .jpg .jpeg');
            return res.status(422).redirect("/admins/products/create");            
        }       
        const data = {};
        data.title = req.body.title.trim();
        data.imageUrl = image.filename;
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
                                invalid_type_error: "ImageUrl must be string",
                            }),//.url('ImageUrl should be /n URL format'),//.regex(new RegExp('/^\w+$/'),'Password should be /n an alphanumeric' ),//.regex(new RegExp('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'), 'Password should be /n contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'),
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
            return res.status(422).redirect("/admins/products/create");
        } 
        ////////////////////////////////// 
        const product = new Product(data);
        product.save()
        .then( result=>{
            req.flash('success', 'Add New Product Successfully');
            res.redirect('/admins/products');  
        })
        .catch(err => {
            console.log(err);
            res.redirect('/500');  
        });

    }  

    static edit(req, res){
        const productId = req.params.id ;
        let error ;
        Product.findById(productId)
        .then((product)=>{  
            if(product.userId.toString() !== (req.session.user._id).toString() ){   //Authorization
                req.flash('error', 'Invalid Authorization');
                return res.status(401).redirect('/admins/products');
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
                return res.status(401).redirect('/admins/products');
            } 
            product.title = req.body.title.trim();    
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
                                    invalid_type_error: "ImageUrl must be string",
                                }), //.url('ImageUrl should be /n URL format'),//.regex(new RegExp('/^\w+$/'),'Password should be /n an alphanumeric' ),//.regex(new RegExp('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'), 'Password should be /n contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'),
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
                return res.status(422).render('admins/products/edit.ejs', { 
                    products: product ,
                    pageTitle: 'Edit Product',
                    path: '/admins/products/edit',
                    errorFields: req.flash('errorFields'),                
                    messages: req.flash(),
                });
            }
            //////////////////////////////////     
            const image = req.file;
            if(image){
                Utility.deleteFile('public/assets/backEnd/images/upload/products/'+product.imageUrl);
                product.imageUrl = image.filename;
            }                       
            return product.save();
        })    
        .then( result =>{
            req.flash('success', 'Updated Product Successfully');
            res.redirect("/admins/products?page="+ProductController.pagination.currentPage);            
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
            if(!product){
                req.flash('error', 'Product was not found.');
                return res.redirect('/admins/products');
            }
            Utility.deleteFile('public/assets/backEnd/images/upload/products/'+product.imageUrl);
            Product.deleteOne({_id: productId, userId: req.session.user._id})
            .then( result => {
                req.flash('success', 'Deleted Product Successfully');
                res.redirect("/admins/products");            
            })
            .catch( err=>console.log(err) );
        })
        .catch( err=>console.log(err) );

    } 

    
}

export default ProductController ;

  
  
