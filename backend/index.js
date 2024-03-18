import express from "express";
import mongoose from "mongoose";
import { PORT } from "./config.js";
import { Book } from "./models/bookModel.js";

const app = express();

// middleware for passing request to body
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Hey Saurav You are Good to Go");
});

// Route for save a new Book
app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message:
          " please send all  required fileds : title,author,publish,publishyear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for get all Books form DataBase
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      Count: books.length,
      Data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for get one Books form DataBase
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for update a book in database
app.put("/books/:id", async(req, res) => {
try {
     if(!req.body.title || !req.body.author || !req.body.publishYear){
      return res.status(400).send({
        message:"please send all  required fileds : title,author,publish,publishyear",
      });
     }

     const {id} = req.params;
     const result = await Book.findByIdAndUpdate(id,req.body);

     if(!result) {
      return res.status(400).send({message:"Book Not Found"});
     }
    return res.status(200).send({message:"Book Updated"});
} catch (error) {
  console.log(error.message);
    res.status(500).send({ message: error.message });
}
})

// Route forDelete a book
 app.delete("/books/:id", async (req, res) => {
  try {
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
          return res.status(400).send({message:"Book Not Found"});
        }
        return res.status(200).send({message:"Book Deleted Successfully"})
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
 })
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
