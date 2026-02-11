const express = require("express");
const connection = require("./db_connect");

connection();

const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api", require("./routes"));

app.listen(3000, () =>{
    console.log("SERVER LISTENING ON PORT 3000")
});