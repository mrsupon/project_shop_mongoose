import fs from "fs";
import Product from "./product.js";
import Utility from "../utils/utility.js";

class Cart{
    static filePath = Utility.getPath('database/cart.json');
    static data = this.find() ;
    
    constructor(products, totalPrice) { 
        this.products = products ;
        this.totalPrice = parseFloat(totalPrice); 
    }

    static save( data ){  
        fs.writeFile( this.filePath , JSON.stringify(data), (err)=>{ if(err) console.log(err) });
    }

    static find(){  //console.log(path.join(process.cwd(), 'database/cart.json') );
        fs.open( this.filePath ,'r+', (err, fileDescriptor )=>{
            if(err){ 
                this.data = {products:[], totalPrice:0};
                this.save(this.data);
            }
            else{
                fs.readFile( this.filePath ,(err, foundData)=>{ if(!err) this.data = JSON.parse(foundData); });
            }
        });
        return this.data ;   
    }

    static findProductById(id){ 
        return this.data.products.find(product =>(product.id === id));
    }

    static findProductIndex(id){
        return this.data.products.findIndex(product =>(product.id === id))  ;
    }

    static deleteProductById(id){
        const productPrice = Product.findById(id).price; 
        const index = this.findProductIndex(id);
        this.data.totalPrice -= (this.data.products[index].qty * productPrice) ;        
        this.data.products.splice(index, 1) ;
        this.save(this.data);
    }

    static joinWithProduct( ){ 
        const joinedCart = {...this.data};//clone Object
        let sum = 0.0; 
        if(joinedCart.products.length > 0){
            joinedCart.products = joinedCart.products.map((product, index)=>{
                const foundProduct = Product.findById(product.id) ;
                if(foundProduct){
                    let total = product.qty*foundProduct.price;
                    sum += total;
                    return {...product, title:foundProduct.title, price:foundProduct.price, total:total};                 
                }
                else{
                    return  {id:product.id, qty:0, title:'out of stock', price:0.0, total:0.0}                  
                }
            });
        }
        joinedCart.totalPrice = sum; 
        return joinedCart;
    }
}

export default Cart ;