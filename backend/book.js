const express =require("express")
const router=express.Router()
const auth=require("../middleware/auth")
const Book=require("../models/book")
const sendEmail=require("../utils/sendEmail")
const { moodMap } = require("../utils/moods");


//post/api/books
router.post("/",auth,async(req,res)=>{
    try{
        const{title,author,category,pdf,cover,audio,price,summary,description,published}=req.body
        const newBook=new Book({
            title,
            author,
            category,
            pdf,
            cover,
            audio,
            price,
            summary,
            description,
            published,
            addedBy:req.user.id
        })
        await newBook.save()
        res.status(201).json(newBook)
    }catch(err){
        console.error(err.message)
        res.status(500).send("server error")
    }
})
//get/api/book
router.get("/",async(req,res)=>{
    try{
        const books=await Book.find()
        res.json(books)
    }catch(err){
        console.log(err.message)
        res.status(500).json("server error")
    }
})

router.get("/mood/:mood", async (req, res) => {
  try {
    const subMoods = moodMap[req.params.mood];

    if (!subMoods) {
      return res.status(400).json({ msg: "Invalid mood" });
    }

    const books = await Book.find({
      moods: { $in: subMoods }
    });

    res.json(books);

  } catch (err) {
    res.status(500).json({ msg: "server error" });
  }
});



router.get("/search",async(req,res)=>{
    try{
        const title=req.query.title
        const books=await Book.find({
            title:{$regex:title, $options:"i"}
        })
        res.json(books)
    }catch(err){
        console.log(err.message)
        res.status(500).json({
            msg:"server error"
        })
    }
})

router.get("/isbn/:isbn", async (req, res) => {
  try {
    const { isbn } = req.params;

    const book = await Book.findOne({ isbn });

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.status(200).json(book);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});


router.get("/:id",auth,async(req,res)=>{
    try{
        const book=await Book.findById(req.params.id)
        res.json(book)
    }catch(err){
        console.log(err.message)
        res.status(500).json("server error")
    }
})

//put/api/book
router.put("/:id",auth,async(req,res)=>{
    try{
        const {title,author,category,pdf,cover,audio,price,summary,description,isPaid}=req.body

        let book=await Book.findById(req.params.id)
        if(!book){
            return res.status(404).json({
                msg:"Book not found"
            })
        }
        // if(!book.addedBy || ! book.addedBy.equals(req.user)){
        //     return res.status(401).json({
        //         msg:"user not authorized"
        //     })
        // }
        //above neet edit :)
        if (title) book.title=title
        if(author) book.author=author
        if(category) book.category=category
        if(pdf) book.pdf=pdf
        if(cover) book.cover=cover
        if(audio) book.audio=audio
        if(price!==undefined) book.price=price
        if(summary) book.summary=summary
        if(description) book.description=description
        if(isPaid!==undefined) book.isPaid=isPaid

        await book.save()

        res.json(book)
    }catch(err){
        console.error(err.message)
        res.status(500).send("server error")
    }
})

//dellete/api/book
router.delete("/:id",auth,async(req,res)=>{
    try{
        const book=await Book.findById(req.params.id)
        if(!book){
            return res.status(404).json({
                msg:"book not found"
            })
        }
        // if(!book.addedBy || book.addedBy.toString()!==req.user){
        //     return res.status(401).json({
        //         msg:"user not authorized"
        //     })
        // }
        
        await Book.findByIdAndDelete(req.params.id)

        // await Book.remove()
        res.json({
            msg:"book removed succesfully"
        })
    }catch(err){
        console.log(err.message)
        res.status(500).send("servr error")
    }
})


//post/api//buy
router.post("/buy/:id",async(req,res)=>{
    try{
        const book=await Book.findById(req.params.id)

        if(!book){
            return res.status(404).json({
                msg:"book not found"
            })
        }
        if(book.price===0){
            return res.status(400).json({
                msg:"this book is free!"
            })
        }

        if(book.isPaid){
            return res.status(400).json({
                msg:"this book is taken"
            })
        }

        book.isPaid=true
        await book.save()
        await sendEmail(
            req.user.email,
            "you got this book",
            `now you have ${book.title}`
        )

        res.json({
            msg:"you got this book successfully"
        })
    }catch(err){
        console.error(err.message)
        res.status(500).json({
            msg:"server error"
        })
    }
})

router.post("/:id/comment",auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    book.comments.push({
      userId: req.user.id,
      text: req.body.text
    });

    await book.save();

    res.json({
        msg:"comment added",
        comments:book.comments
    });
  } catch (err) {
    res.status(500).json({ msg: "server error" });
  }
});

router.post("/:id/rate", auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    book.rating = req.body.rating;

    await book.save();

    res.json({
      msg: "rating updated",
      rating: book.rating
    });

  } catch (err) {
    res.status(500).json({ msg: "server error" });
  }
});

router.get("/:id/comments",async(req,res)=>{
    try{
        const book=await Book.findById(req.params.id).populate("comments.userId","name")
        res.json(book.comments)
    }catch(err){
        res.status(500).json({
            msg:"server error"
        })
    }
})

router.get("/:id/rating",async(req,res)=>{
    try{
        const book=await Book.findById(req.params.id)
        res.json({
            rating:book.rating
        })
    }catch(err){
        res.status(500).json({
            msg:"server error"
        })
    }
})


router.put("/:bookId/comment/:commentId",auth,async(req,res)=>{
    try{
        const book=await Book.findById(req.params.bookId)
        if(!book){
            return res.status(404).json({
                msg:"book not found"
            })
        }
        const comment=book.comments.id(req.params.commentId)
        if(!comment){
            return res.status(404).json({
                msg:"comment not found"
            })
        }
        if(comment.userId.toString()!==req.user.id){
            return res.status(401).json({
                msg:"not authorized"
            })
        }
        comment.text=req.body.text
        await book.save()

        res.json({
            msg:"comment updated",
            comments:book.comments
        })
    }catch(err){
        res.status(500).json({
            msg:"server error"
        })
    }
})


router.delete("/:bookId/comment/:commentId",auth,async(req,res)=>{
    try{
        const book=await Book.findById(req.params.bookId)
        if(!book){
            return res.status(404).json({
                msg:"book not found"
            })
        }
        const comment=book.comments.id(req.params.commentId)
        if(!comment){
            return res.status(404).json({
                msg:"comment not found"
            })
        }
        if(comment.userId.toString()!==req.user.id){
            return res.status(401).json({
                msg:"not authorized"
            })
        }
        comment.deleteOne()
        await book.save()

        res.json({
            msg:"comment deleted",
            comments:book.comments
        })
    }catch(err){
        res.status(500).json({
            msg:"server error"
        })
    }
})


module.exports=router