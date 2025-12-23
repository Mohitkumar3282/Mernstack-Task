require("dotenv").config();


const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// DB connect
connectDB();

// routes
app.use("/api/company", require("./routes/companyRoutes"));
app.use("/api/review", require("./routes/reviewRoutes"));

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
