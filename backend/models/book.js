const mongoose=require("mongoose")


const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    author:{
        type:String,
        required:true,
        trim:true
    },
      published:{
      type:String,
      required:false
      },
    favoritesCount: {
         type: Number,
         default: 0
    }
,
    category:{
        type:[String]
    },
    pdf:{
        type:String
    },
    cover:{
        type:String
    },
    audio:{
        type:String
    },
    price:{
        type:Number,
        default: 0
    },
    summary:{
        type:String
    },
    description:{
        type:String
    },
    isPaid:{
        type:Boolean,
        default:false
    },
    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    rating:{
        type:Number,
        default:0
    },
    comments:[
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            text:String,
            createdAt:{
                type:Date,
                default:Date.now
            }
        }
    ],
    moods:[String],
    createdAt:{
        type:Date,
        default:Date.now
    },
    isbn: { type: String, required: true,},
    status:{
      type:String,
      enum:["active","suspended"],
      default:"active"
    }
    
})

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);
module.exports = Book;


