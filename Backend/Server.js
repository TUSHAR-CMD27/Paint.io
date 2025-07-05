let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors")

// Load environment variables
require("dotenv").config()
require("dotenv").config({ path: '.env.cloudinary' })

const authRoutes = require("./routes/Auth");
const postRoutes = require("./routes/Posts");

const app = express();
app.use(cors({
  origin: ['https://paint-io-frontend.onrender.com', 'http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json())
console.log("Mongo_url from env:", process.env.Mongo_url);

// Root route for testing
app.get("/", (req, res) => {
  res.json({ message: "Paint.io Backend is running!", status: "success" });
});

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`server ready on port ${PORT}`)
})
