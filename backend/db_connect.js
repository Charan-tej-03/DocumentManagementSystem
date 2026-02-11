const mongoose = require("mongoose");

const connection = async() => {
  try{
    await mongoose.connect("mongodb://localhost:27017/project_db");
    console.log("Connection sucessfull!!");
  }catch(err){
    console.error(err.message);
  }
};

module.exports = connection;

// connection();