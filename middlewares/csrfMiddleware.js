import CSRF from "csrf"

class CsrfMiddleware{
    static isCreated = false;
    static _csrf = new CSRF();

    static verify(req, res, next) {
        if( req.method==="GET" ){
            res.locals.csrf = ()=>{
                    //CsrfMiddleware._csrf = new CSRF();
                    const csrfSecret = CsrfMiddleware._csrf.secretSync();
                    const csrfToken = CsrfMiddleware._csrf.create(csrfSecret); 
                    let tag = "<input type='hidden' name='csrfInput' value='"+csrfToken+"'>";
                    req.session.csrf = {secret:csrfSecret, token:csrfToken} ;
                    req.session.save(); 
                    return tag ;
            }           
        }
        next();
    }

    static csrf(req, res, next){ 
        if ( ! CsrfMiddleware._csrf.verify(req.session.csrf.secret, req.body.csrfInput) ) {                              
                        console.log('invalid token!') ; 
                        return res.redirect("/404");        
        }
        next();
    }
}

export default CsrfMiddleware;

