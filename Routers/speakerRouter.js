const express=require("express");
const speakerRouter=express.Router();

//database connection
mongoose=require("mongoose");
require("./../Models/speakerModel");
speakerModel=mongoose.model("speakers");



//get speakers profile
speakerRouter.get("/speakerProfile",(request,response)=>{response.send("speaker profile")});


speakerRouter.use((request,response,next)=>{
   if (request.session.role !="admin")
   {
    response.redirect("/login");
    
   }
   else
    next()

})

//list speakers
speakerRouter.get("/list",(request,response)=>{speakerModel.find({})
.then((data)=>

{
    response.render("speakers/speakersList",{data});
    //   console.log(data);   
})
.catch((error)=>{
    console.log(error+"");
})});

//add speakers
//registration
speakerRouter.get("/add",(request,response)=>{
    // response.render("speakers/addSpeaker");
    response.render("auth/register");
});

speakerRouter.post("/add",(request,response)=>{
    let newSpeaker=new speakerModel({
        // _id:request.body._id,
        fullname:request.body.fullname,
        username:request.body.username,
        userpassword:request.body.userpassword,
        "address.city":request.body.city,
        "address.street":request.body.street,
        "address.building":request.body.building
    
    })
    newSpeaker.save()
    .then((data)=>{response.render("auth/login")})
.catch((error)=>{
    console.log(error+"");
})});

//update speakers

speakerRouter.get("/edit/:_id",function(request,response){
    speakerModel.find({_id:request.params._id},{}).then(function(data){
        // console.log(data)
        response.render("speakers/editspeaker",{data:data[0]});
    })
})
speakerRouter.post("/edit",(request,response)=>{

    speakerModel.update({
        _id:request.body._id
    },
    {
        $set:{ fullname:request.body.fullname,
            username:request.body.username,
            userpassword:request.body.userpassword,
            "address.city":request.body.city,
            "address.street":request.body.street,
            "address.building":request.body.building}

    }).then((data)=>{
        
        // response.send("edit is success");
        // console.log(data);
        response.redirect("/speakers/list");
    
    })
    .catch((error)=>{
        console.log(error+"");
    })
    
      
});


//delete speakers
speakerRouter.get("/delete/:_id",(request,response)=>{
    
    speakerModel.deleteOne({_id:request.params._id

})
.then(()=>{
    
    // response.send("delete is successful");
    response.redirect("/speakers/list");



})
.catch((error)=>{
    console.log(error+"");
})
});



module.exports=speakerRouter;