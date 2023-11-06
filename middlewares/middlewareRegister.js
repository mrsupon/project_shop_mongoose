import express from "express"
import methodOverride from "method-override"
import session from "express-session"
import {default as connectMongodbSession} from "connect-mongodb-session"

import DbMongoose from "../database/database_mongoose.js"
import CsrfMiddleware from "./csrfMiddleware.js"
import AuthMiddleware from "./authMiddleware.js"
import OldInputMiddleware from "./oldInputMiddleware.js"
import SanitizerMiddleware from "./sanitizerMiddleware.js"
import flash from "connect-flash"
import multer from "multer"

class MiddlewareRegister{

    static init(app){

        const MongodbStore = connectMongodbSession(session);
        const mongodbStore = new MongodbStore({
          uri:DbMongoose.connectionString,
          collection:'session'
        });

        const fileStorage = multer.diskStorage({
          destination: (req, file, cb) => {
            cb(null, 'public/assets/backEnd/images/upload/products');
          },
          filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
          }
        });
        const fileFilter = (req, file, cb)=>{
          if( file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' ){
            cb(null, true );
          }
          else{
            cb(null, false );
          }
        };
          

        app.use(express.urlencoded({ extended: true })); 
        app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
        app.use(express.static("public")); 
        app.use("/public", express.static("public/assets/backEnd/images/upload/products"));        
        app.use(express.static("node_modules"));
        app.use(methodOverride('_method'));
        app.use(session({secret:'my secret', resave:false, saveUninitialized:false, store:mongodbStore }));
        app.use(SanitizerMiddleware.sanitizeReqBody);
        app.use(CsrfMiddleware.verify);
        app.use(AuthMiddleware.setLocals);  
        app.use(OldInputMiddleware.set);
        app.use(flash());
        app.use((error, req, res, next)=>{
          // res.status(error.httpStatusCode).render(...);
          res.redirect('/500');
        });
    }
}

export default MiddlewareRegister;