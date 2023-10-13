
class ErrorController{

    static showStatus404(req, res){
        res.status(404).render('404.ejs', {
            pageTitle: '404',
            path: ''
        });
    }   
} 


export default ErrorController;
