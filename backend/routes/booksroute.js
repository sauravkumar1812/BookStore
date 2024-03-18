import express from "express";
import { Book } from "../models/bookModel.js";
const router = express.Router();

// Route for save a new Book
router.post("/newbook", async (req, res) => {
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
  router.get("/allbook", async (req, res) => {
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
  router.get("/onebook/:id", async (req, res) => {
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
  router.put("/updatebook/:id", async(req, res) => {
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
  router.delete("/deletebook/:id", async (req, res) => {
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


   export default router;