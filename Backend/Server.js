let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors")

// Load environment variables
require("dotenv").config()
require("dotenv").config({ path: '.env.cloudinary' })

const authRoutes = require("./routes/Auth");
const postRoutes = require("./routes/Posts");

const app = express();
app.use(cors());
app.use(express.json())
console.log("Mongo_url from env:", process.env.Mongo_url);

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);


//Mongo connection 
mongoose.connect(process.env.Mongo_url)
.then(()=>{
    console.log("MongoDb Connected")
})
.catch((e)=>{
    console.log(e)
})

app.listen(5000, ()=>{
    console.log("server ready")
})
