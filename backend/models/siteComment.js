const mongoose = require("mongoose");


const siteCommentSchema =
    new mongoose.Schema(
        {
            userId: {

                type:
                    mongoose.Schema.Types.ObjectId,

                ref:
                    "User",

                required:
                    true
            },


            text: {

                type:
                    String,

                required:
                    false,

                trim:
                    true,

                maxlength:
                    50,

                default:
                    ""
            },


            rating: {

                type:
                    Number,

                required:
                    true,

                min:
                    1,

                max:
                    5
            }
        },


        {
            timestamps:
                true
        }
    );


module.exports =
    mongoose.model(
        "SiteComment",
        siteCommentSchema
    );