const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/test", {
    family: 4,
    serverSelectionTimeoutMS: 3000
})
.then(() => console.log("CONNECTED OK"))
.catch(err => console.log("FAILED:", err));
