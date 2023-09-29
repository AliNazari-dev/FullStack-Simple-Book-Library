import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

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

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("WElCOM to my Project (ALI NAZARi)  ");
});
