import fs from "fs";
import Utility from "../utils/utility.js";
import db from "../database/database_mysql.js"

class Product{
    static data = this.find();
    constructor(title, imageUrl, description, price) {
        this.id = Utility.getUID();
        this.title = title ;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
    save(){ 
        return  db.execute(
                    'insert into products (title, description, imageUrl, price) values(?,?,?,?)',
                    [this.title, this.description, this.imageUrl, this.price]
                );
    }
    static find(){
        return db.execute('select * from products');
    }

    static findById(id){
        return  db.execute('select * from products where products.id = ?',[id]);
    }

    static findByIdex(id){
        return Product.data.findIndex(product =>(product.id === id))  ;
    }

    static update(){
        fs.writeFile((new URL('../database/products.json', import.meta.url)) , JSON.stringify(Product.data), (error)=>{
            if(!error)
                console.log("Save File Sucessfully.");
            else
                console.log(error);
        });
    }

    static deleteById(id){
        const index = Product.findByIdex(id); 
        Product.data.splice(index,1);
    }
    
}

//export default Product;