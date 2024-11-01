const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./db/db");
const port = process.env.PORT;
const authRoutes = require("./routes/authRoutes");
const lendRoutes = require("./routes/lendRoutes");
const helmet = require('helmet'); 
const morgan = require('morgan');
const path = require("path");

const app = express();

// app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true 
}));
app.use(helmet());  
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev")); 
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 



app.use("/", authRoutes);
app.use("/games", lendRoutes);  
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
  
connectDB(); 

app.listen(port, () => { 
    console.log(`App is running on ${port}`);
});
  