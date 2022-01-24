const {Schema, model} = require("mongoose");

const smartPhone = new Schema({
    title:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    img:String,
    descr:{
        type:String,
        required:true
    },
    userId :{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});

smartPhone.method("toClient", function(){
    const smartPhone = this.toObject();
    smartPhone.id = smartPhone._id
    delete smartPhone._id;

    return smartPhone;
})


module.exports = model("SmartPhone", smartPhone)