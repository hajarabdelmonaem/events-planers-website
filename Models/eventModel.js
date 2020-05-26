mongoose=require("mongoose");
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
eventSchema=new mongoose.Schema({
    title:{type:String,required:true},
    mainspeaker:{type:String,ref:"speakers"},
    otherspeaker:[{type:Number,ref:"speakers"}],
    eventdate:Date
    }
);

//mapping
eventSchema.plugin(autoIncrement.plugin,'events');
mongoose.model("events",eventSchema);