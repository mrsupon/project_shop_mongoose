
class OldInputMiddleware{
    static _old = {}; 
    static route = '';

    static set (req, res, next) { 
        if( req.method==="POST" && (req.body !== null) ){
           OldInputMiddleware._old = {...req.body};
            //    for (const key in req.body) {
            //         if(key.match(/password/gi))
            //             OldInputMiddleware._old[key] = "";
            //     }        
        }  
        
        if( req.method==="GET" ){ 
            if( OldInputMiddleware.route===(req.baseUrl + req.path)) {
                res.locals.old = OldInputMiddleware._old;   
            }    
            else{
                res.locals.old = {};
                OldInputMiddleware.route = (req.baseUrl + req.path);
            }
                
        }
                
        // res.locals.old = (key)=>{
        //     let data = OldInputMiddleware._old[key]||"" ; 
        //     OldInputMiddleware._old[key] = "";
        //     return data ;
        // }        
        next(); 
    }

    static clear () { 
           OldInputMiddleware._old = {};
    }    
}

export default OldInputMiddleware;





// import oldInput from "old-input";

// class OldInput{
//     static _old = {}; 
//     static _url = "";
//     static _isFirstTime = true;

//     static set (req, res, next) { 
//         if(req.method==="POST"){
//             OldInput._old = {...req.body}; console.log("post "+req.get('origin')+"/"+req.get('referrer'));
//         }
//         else if(req.method==="GET" ){ console.log("get "+req.get('origin')+"/"+req.get('referrer'));
//             if(OldInput._isFirstTime){
//                 OldInput._url = req.url;
//                 OldInput._isFirstTime = !OldInput._isFirstTime;
//             }
//             else if(req.url !== OldInput._url){
//                 OldInput._old = {};
//                 OldInput._isFirstTime = !OldInput._isFirstTime;
//             }
//         }   
               
//         res.locals.old = (key)=>{
//             console.log("view "+req.get('origin')+"/"+req.get('referrer')); 
//             return OldInput._old[key]||"" ;
//         }
        
//         next();
//     }
        

// }

// export default OldInput;

