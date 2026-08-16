const mongoose = require("mongoose");
const Book = require("./models/book");

mongoose.connect("mongodb://127.0.0.1:27017/readingClub")
.then(async ()=>{

   await Book.deleteMany();

   console.log("ALL BOOKS DELETED");

   process.exit();

});