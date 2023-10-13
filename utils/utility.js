import { dirname } from "path"; 
import { fileURLToPath } from "url";
import path from "path";

class Utility{
    static getUID(){
        return Date.now().toString()+(100+(Math.floor(Math.random()*100))).toString().substring(-3) ;
    }

    static currencyFormat(number) {
        const fixedNumber = Number.parseFloat(number).toFixed(2);
        return String(fixedNumber).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    static getPath( loaction ){
        return path.join(process.cwd(), 'database/cart.json');
    }
}

const $ = Utility.currencyFormat;

export default Utility;
export {$};