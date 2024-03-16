import express from "express";
import { PORT } from "./config.js";

const app = express();

app.get('/',(req,res)=>{
            console.log(req);
            return res.status(234).send("Hey Saurav You are Good to Go");
});

app.listen(PORT, () => {
    console.log(`App is listing to port : ${PORT}`);
  });