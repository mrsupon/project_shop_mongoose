import express from "express"
import { dirname } from "path" 
import { fileURLToPath } from "url"
import methodOverride from "method-override"

import Route from "./routes/web.js"
import DbRelationship from "./models/sequelize/dbRelationship.js"
import db from "./database/database_sequelize.js"
import User from "./models/sequelize/user.js"
  

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.urlencoded({ extended: true })); 
app.use(express.static("public")); 
app.use(express.static("node_modules"));
app.use(methodOverride('_method'));
app.use((req,res,next)=>{
  User.findByPk(1).then((user)=>{req.user=user; next();}).catch( err=> console.log(err));
}); 

Route.start(app); 
DbRelationship.set();

db.sync( ) // {force:true} or {alter:true}
.then(result=>{
    app.listen(port, () => {
    console.log(`Successfully started server on port ${port}.`);   
    })
})
.catch(err => console.log(err));



    
  


 