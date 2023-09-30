import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Book } from "./models/bookModel.js";

const app = express();

//Middleware for parcing request body
app.use(express.json());


dotenv.config();
const port = process.env.PORT || 5000;

//Route
app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .send({ message: "All field Required ( title , author , publishYear )" });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    res.status(201).send({ book });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
});

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("WElCOM to my Project (ALI NAZARi)  ");
});

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
