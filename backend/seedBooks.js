const mongoose=require("mongoose")
const Book=require("./models/book")
require("dotenv").config() 

const mongoURI=process.env.MONGO_URL || "mongodb://localhost:27017/readingClub"

mongoose.connect(mongoURI) 
.then(()=> console.log("mongodb connected"))
.catch(err => console.log(err))

const books = Array.from({length:100},(_,i)=>({ // all of this
    title:`Book ${i+1}`,
    author:`Author ${i+1}`,
    category:["روايات","تاريخي","ديني","علمي","تحفيز"][i%5],
    pdf:`/books/book${(i%10)+1}.pdf`,
    cover:`/images/b${(i%5)+1}.jpg`,
    audio:"https://www.youtube.com/watch?v=hhjujkj",
    price:((i%5)+1)*2,
    isPaid:i%2===0,
    addedBy:null
}))

const seedBooks=async()=>{
    try{
        await Book.deleteMany() 

        await Book.insertMany(books) 
        console.log("added 100 books successfully")
        mongoose.disconnect() 
    }catch(err){
        console.log(err)
    }
}



seedBooks()