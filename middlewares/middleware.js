import express from "express"
import methodOverride from "method-override"
import session from "express-session"
import {default as connectMongodbSession} from "connect-mongodb-session"

import DbMongoose from "../database/database_mongoose.js"
import CsrfMiddleware from "./csrfMiddleware.js"
import AuthMiddleware from "./authMiddleware.js"


class Middleware{

    static init(app){
        const MongodbStore = connectMongodbSession(session);
        const store = new MongodbStore({
          uri:DbMongoose.connectionString,
          collection:'session'
        });
          

        app.use(express.urlencoded({ extended: true })); 
        app.use(express.static("public")); 
        app.use(express.static("node_modules"));
        app.use(methodOverride('_method'));
        app.use(session({secret:'my secret', resave:false, saveUninitialized:false, store:store }));
        app.use((req, res, next)=>CsrfMiddleware.verify(req, res, next));
        app.use((req, res, next)=>AuthMiddleware.setLocals(req, res, next));  
    }
}

export default Middleware;