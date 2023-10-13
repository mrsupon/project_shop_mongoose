import express from "express"
import { dirname } from "path" 
import { fileURLToPath } from "url"
import Route from "./routes/web.js"
import methodOverride from "method-override"

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true })); 
app.use(express.static("public")); 
app.use(methodOverride('_method'));

const __dirname = dirname(fileURLToPath(import.meta.url));

Route.start(app);

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`); 
}); 
 