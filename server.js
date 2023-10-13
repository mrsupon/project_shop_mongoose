import express from "express"
import { dirname } from "path" 
import { fileURLToPath } from "url"
import Route from "./routes/web.js"
import Middleware from "./middlewares/middleware.js"
import DbMongoose from "./database/database_mongoose.js"

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

Middleware.init(app);
Route.init(app); 

DbMongoose.sync()  
.then(result=>{
    app.listen(port, () => {
    console.log(`Successfully started server on port ${port}.`);   
    })
})
.catch(err => console.log(err));

