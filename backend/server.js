const express = require("express");
const connection = require("./db_connect");
const cors = require('cors')

connection();

const app = express();

app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api", require("./routes"));

app.listen(3000, () =>{
    console.log("SERVER LISTENING ON PORT 3000")
});