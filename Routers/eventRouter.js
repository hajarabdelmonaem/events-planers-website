const express=require("express");
const eventRouter=express.Router();


let speakersnames=[];
//database connection
mongoose=require("mongoose");
require("./../Models/eventModel");
eventModel=mongoose.model("events");
speakerModel=mongoose.model("speakers");

//list events

eventRouter.use((request,response,next)=>{
    if (request.session.role=="admin")
    {
        next();
    }
    else{
        response.redirect("/login");
    }
 
 })
eventRouter.get("/list",(request,response)=>{
    eventModel.find({}).populate({path:"mainspeaker otherspeaker"

}).then((data)=>{
    console.log(data);
    response.render("events/eventsList",{data});
}).catch((error)=>{

    console.log(error+"");

});
});


//add events in database
eventRouter.get("/add",function(request,response){
    speakerModel.find({},{fullname:1,usename:1,_id:1}).then((data)=>{
        speakersnames=data;
        // console.log(speakersnames);
    }).catch((error)=>{
         console.log(error+"");
    });
    speakerModel.find({},{fullname:1,usename:1,_id:1}).
    then((data)=>
    {
        // console.log(data);
        // response.render("events/addEvents");
        response.render("events/addEvents",{data:data,speakersnames});
        //response.render("styleEvents");

    }).catch((error)=>{
        console.log(error);
    });
    
});
eventRouter.post("/add",(request,response)=>{
    let newEvent= new eventModel({
        title:request.body.title,
        mainspeaker:request.body.mainspeaker,
        otherspeaker:request.body.otherspeaker,
        eventdate:request.body.eventdate


    });
    newEvent.save().then((data)=>{
        
        // console.log("event add is success");
        // response.send(data);
        // console.log(data);
        response.redirect("/events/list");

    }).catch((error)=>{

        console.log(error+"");
    });
});

//edit events

eventRouter.get("/edit/:_id",function(request,response){
    
    speakerModel.find({},{fullname:1,usename:1,_id:1}).then((data)=>{
        speakersnames=data;
        console.log(speakersnames);
    }).catch((error)=>{
         console.log(error+"");
    });
    eventModel.find({_id:request.params._id},{}).populate({path:"mainspeaker otherspeaker"})
    .then((data)=>
    {
        // console.log(data, speakernames);
        response.render("events/editevent",{data:data[0],speakersnames});
    })

})

eventRouter.post("/edit",(request,response)=>{
eventModel.updateOne({_id:request.body._id},{$set:request.body})
.then((data)=>{
    
    //    console.log(data);
    // response.send("event edit is succeess");
    response.redirect("/events/list");
})
.catch((error)=>{console.log(error+" ")});

});

//delete event
eventRouter.get("/delete/:_id",(request,response)=>{
eventModel.deleteOne({_id:request.params._id})
.then((data)=>{
    
    // response.send("event delete is succeess");
    // response.render("events/eventsList",{data});
    response.redirect("/events/list");
})
.catch((error)=>{console.log(error+" ")});});


module.exports=eventRouter;