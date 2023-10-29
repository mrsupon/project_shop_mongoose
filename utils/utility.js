import { dirname } from "path"; 
import { fileURLToPath } from "url";
import path from "path";
import z from "zod"

class Utility{
    static getUID(){
        return Date.now().toString()+(100+(Math.floor(Math.random()*100))).toString().substring(-3) ;
    }

    static currencyFormat(number) {
        const fixedNumber = Number.parseFloat(number).toFixed(2);
        return String(fixedNumber).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    static getPath( loaction ){
        return path.join(process.cwd(), loaction);
    }

    static validate(schema, req) {
        try {
            schema.parse({
                data: req,
                body: req.body,
                query: req.query,
                params: req.params,
            });
            return null;
        } 
        catch ( err) { //console.log(err); 
            let messages = [];
            if( err.errors.length > 0) 
                messages = err.errors.map( error=> error.message );

            let paths = [];
            if( err.errors.length > 0) 
                paths = err.errors.map( error=> error.path[error.path.length-1] );

            return { errorMessages:messages.sort(), errorFields:paths };
        }
    }

}

const $ = Utility.currencyFormat;

export default Utility;
export {$};