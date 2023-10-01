import express from "express";
import router from "./routes.js";
import cors from "cors"

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use("/files", express.static("uploads"))

app.use(router);


// Use PORT provided in environment or default to 3000
const port = process.env.PORT || 4000;

// Listen on `port` and 0.0.0.0
app.listen(port, "0.0.0.0");