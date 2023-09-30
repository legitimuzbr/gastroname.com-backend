import express from "express";
import router from "./routes.js";
import cors from "cors"

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use("/files", express.static("uploads"))

app.use(router);

app.listen(8800);