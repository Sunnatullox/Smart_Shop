const {Schema, model}= require("mongoose");


const orderShema = new Schema({
    smartPhones:[
        {
            smartPhone:{
                type:Object,
                required:true,
            },
            count:{
                type:Number,
                required:true,
            },
        },
    ],
    user:{
        name:String,
        userId:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },
    },
    date:{
        type:Date,
        default:Date.now,
    }
})





module.exports= model("Order",orderShema );