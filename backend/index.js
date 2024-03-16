import express from "express";
import { PORT, mongoDBURL } from "./config.js";

const app = express();

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Hey Saurav You are Good to Go");
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
