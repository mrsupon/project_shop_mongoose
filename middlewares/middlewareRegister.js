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

class MiddlewareRegister{

    static init(app){

        const MongodbStore = connectMongodbSession(session);
        const mongodbStore = new MongodbStore({
          uri:DbMongoose.connectionString,
          collection:'session'
        });
          

        app.use(express.urlencoded({ extended: true })); 
        app.use(express.static("public")); 
        app.use(express.static("node_modules"));
        app.use(methodOverride('_method'));
        app.use(session({secret:'my secret', resave:false, saveUninitialized:false, store:mongodbStore }));
        app.use(SanitizerMiddleware.sanitizeReqBody);
        app.use(CsrfMiddleware.verify);
        app.use(AuthMiddleware.setLocals);  
        app.use(OldInputMiddleware.set);
        app.use(flash());
    }
}

export default MiddlewareRegister;