import express from "express";
import mongoose from "mongoose";
import { PORT } from "./config.js";
import { Book } from "./models/bookModel.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Hey Saurav You are Good to Go");
});
 
app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: " please send all  required fileds : title,author,publish,publishyear",
      });
    }
    const newBook = {
        title : req.body.title,
        author : req.body.author,
        publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("App is connect to database");
    app.listen(PORT, () => {
      console.log(`App is listing to port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
