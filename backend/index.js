import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bookRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

//cors Policy
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

//Middleware for parcing request body
app.use(express.json());

dotenv.config();
const port = process.env.PORT || 5000;

//Routes
app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("WElCOM to my Project (ALI NAZARi)  ");
});

app.use("/books", bookRoute);

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("APP connected to Mongo");
    app.listen(port, () => {
      console.log(`App is Listening to port : ${port}`);
    });
  })
  .catch((error) => {
    console.log(console.log(error));
  });
