import express from "express";
import mongoose from "mongoose";
import { PORT } from "./config.js";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksroute.js";
const app = express();

// middleware for passing request to body
app.use(express.json());

// Middleware for handling Cors policy
// option 1: allow all origin with Default of cors(*)
app.use(cors());
// option 2: allow custom origin

/*
app.use(cors({
   origin : "https://localhost:0000",
   methods: ['GET','POST','PUT','DELETE'],
   allowedHeaders: ['Content-Type'],
}))
*/

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Hey Saurav You are Good to Go");
});

app.use("/books", booksRoute);

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
