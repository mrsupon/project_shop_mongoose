import DOMPurify from 'isomorphic-dompurify';

// Singleton pattern example 
class Sanitizer{

    constructor() {
      //this.data = "Hello";
      if (!Sanitizer._instance) {
        Sanitizer._instance = this;
      }
      return Sanitizer._instance;
    }

    static sanitizeReqBody(req, res, next){ 
        if( ["POST","PUT","PATCH"].includes(req.method.toUpperCase()) && req.body ){ 
            const dataObj = req.body;
            Object.keys(dataObj).forEach(function (key) { 
                dataObj[key]=(DOMPurify.sanitize(dataObj[key]));
            });            
        }
        next();
    } 
    
    getInstance() {
      return this._instance;
    }
  
    getData() {
        //return this.data ;
    }
  
    setData(data) {
        //this.data = data;
    }

    clean(dataObj){
        if( dataObj){
            Object.keys(dataObj).forEach(function (key) {
                dataObj[key]=(DOMPurify.sanitize(dataObj[key]));
            });            
        }
    }   
}

export default Sanitizer ;