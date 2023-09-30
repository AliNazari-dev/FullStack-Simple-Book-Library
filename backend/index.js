import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Book } from "./models/bookModel.js";

const app = express();

//Middleware for parcing request body
app.use(express.json());

dotenv.config();
const port = process.env.PORT || 5000;

//Routes
app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("WElCOM to my Project (ALI NAZARi)  ");
});

//GetAll books Route
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(201).json({ count: books.length, data: books });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
});

//Get one books Route
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(201).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
});

//create new Book Route
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
    return res.status(201).json({ book });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
});

//Update books Route
app.put("/books/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .send({ message: "All field Required ( title , author , publishYear )" });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: "Book not Found" });
    }
    return res.status(200).send({ message: "Book Updated Succsesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
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
