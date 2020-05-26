const express=require("express");
const authenticationRouter=express.Router();
require("./../Models/speakerModel");
speakerModel=mongoose.model("speakers");
//database connection
mongoose=require("mongoose");
require("./../Models/speakerModel");
speakerModel=mongoose.model("speakers");


authenticationRouter.get("/login",(request,response)=>{
  response.render("auth/login");

    // console.log(request.query);
    // console.log(request.params);
    // response.send("/login, get")
});


//login validation...
authenticationRouter.post("/login",(request,response)=>{
    // request.body.userName=theName;
    // request.body.userPassword=thePassword;
   
    if(request.body.username=="eman" && request.body.userpassword=="123")
    {
        //response.send("admin");
        console.log("adminnnn");
        // response.redirect("/adminProfile");
        
        request.session.role="admin";
        response.render("auth/HelloAdmin");
        console.log(request.body);
    }
    else{
      speakerModel.find({username:request.body.username,userpassword:request.body.userpassword})
      .then((data)=>{
        if(Array.isArray(data)&&data.length)
        {
        //  response.redirect("/speakerProfile");
        console.log("userrrrr");
        request.session.name = request.body.username;
        response.locals.speakerName = request.session.name;
          request.session.role="speaker";
           response.render("auth/HelloSpeaker",{data : data});
        }
        else
        {
            //response.send("invalid username or password!!!");
            
            response.redirect("/login");
            console.log("data not found, please login first");
            ///console.log(request.body);
           //response.send("/login, get");
        }
      }).catch((error)=>{

        console.log(error+"");
    });
        
        }

    //console.log(request.body);
    //response.send("/login, post");
});

// authenticationRouter.get("/register",(request,response)=>
// {
  
//   // response.send("/register, get")
//   response.redirect("speakers/add");
//   // response.render("auth/register");



// });
// authenticationRouter.post("/register",(request,response)=>{
//   response.send("/register, post")});
authenticationRouter.get("/logout",(request,response)=>{
  request.session.destroy((err) =>{
    if(err)
      console.log(err);
      response.redirect("/login");
  });
  // response.send("/logout, get");
  

});

//add speakers
//registration
authenticationRouter.get("/register",(request,response)=>{
  // response.render("speakers/addSpeaker");
  response.render("auth/register");
});

authenticationRouter.post("/register",(request,response)=>{
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

authenticationRouter.post("/editSpeaker",(request,response)=>{

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
      response.redirect("/login");
  
  })
  .catch((error)=>{
      console.log(error+"");
  })
  
    
});

module.exports=authenticationRouter;