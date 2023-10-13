import CSRF from "csrf"

class CsrfMiddleware{
    static _csrf = new CSRF();

    static csrf (req, res, next) {  //protect at route
        const csrfSecret = CsrfMiddleware._csrf.secretSync();
        const csrfToken = CsrfMiddleware._csrf.create(csrfSecret); 
        res.locals.csrf = "<input type='hidden' name='csrfInput' value='"+csrfToken+"'>";
        req.session.csrf = {secret:csrfSecret, token:csrfToken} ;
        req.session.save();           
        next();
    }

    static verify(req, res, next) {
        if(req.body.csrfInput) {
            if (! CsrfMiddleware._csrf.verify(req.session.csrf.secret, req.session.csrf.token) ) {
                req.session.destroy((result)=>{
                    console.log('invalid token!') ;
                    res.redirect("/404");
                });     
            }
        }
        next();
    }
}

export default CsrfMiddleware;

