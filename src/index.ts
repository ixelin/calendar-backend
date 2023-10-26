import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./db/connect";
import { notFound } from "./middleware/not-found";
import { errorHandlerMiddleware } from "./middleware/error-handler";
import authRoute from "./routes/auth";
import protectedRoutes from "./routes/protected";
const app = express();
dotenv.config();

const port = process.env.PORT || 3001;

// middleware
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Define the HTTP methods you want to allow
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Define the headers you want to allow

  // Handle preflight requests (OPTIONS method)
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Routes
app.use("/api/user", authRoute);
app.use("/api/protected", protectedRoutes); // just for example
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    //! if the server is not launching, try commented one
    // const db = await connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017');
    const db = await connectDB("mongodb://0.0.0.0:27017/");
    if (db) {
      console.log("Connected to the database!!!");
    }
    app.listen(port, () => console.log(`Server listening on port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
