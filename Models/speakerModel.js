mongoose=require("mongoose");
autoincrement=require('mongoose-auto-increment');
autoincrement.initialize(mongoose.connection);
speakerSchema=new mongoose.Schema({
    // _id:Number,
    fullname:String,
    username:String,
    userpassword:String,
    address:{
            city:String,
            street:String,
            building:Number
        }  
    }
);

speakerSchema.plugin(autoincrement.plugin,'speakers');
//mapping
mongoose.model("speakers",speakerSchema);