
class ErrorController{

    static show404(req, res){
        res.status(404).render('404.ejs', {
            pageTitle: '404',
            path: ''
        });
    }  
    static show500(req, res){
        res.status(500).render('500.ejs', {
            pageTitle: '500',
            path: '/500'
        });
    }  
} 


export default ErrorController;
