import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";

const app = express();

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Hey Saurav You are Good to Go");
});
 
app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishyear) {
      return res.status(400).send({
        message: "send all  required fileds : title,author,publish,publishyear",
      });
    }
    const newBook = {
        title : req.body.title,
        author : req.body.author,
        publishyear: req.body.publishyear,
    };
    const book = await Book.create(newBook);
    return res.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


mongoose
  .connect("mongodb://localhost:27017/bookstore")
  .then(() => {
    console.log("App is connect to database");
    app.listen(PORT, () => {
      console.log(`App is listing to port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
