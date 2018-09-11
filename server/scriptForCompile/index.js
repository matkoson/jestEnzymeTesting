//MAIN START
import express from "express";
import http, {createServer} from "http";
import bodyParser from "body-parser";
import morgan from "morgan";
const app = express();
import router from "./router";
import mongoose from "mongoose";

//DB SETUP
mongoose.connect("mongodb://localhost:auth/auth", {useNewUrlParser: true });

//APP SETUP
app.use(morgan("combined"));
app.use(bodyParser.json({type:"*/*"}));
router(app);

//SERVER SETUP
const port = process.env.PORT || 3090;
const server = createServer(app);
server.listen(port);
console.log(`Server listening on: ${port}`);
