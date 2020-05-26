let express=require("express");
let path=require("path");
let authenticationRouter=require("./Routers/authRouter");
let adminRouter=require("./Routers/adminRouter");
let speakerRouter=require("./Routers/speakerRouter");
let eventRouter=require("./Routers/eventRouter");



//conecting database
mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/nodeDB").then(()=>{
    console.log("database is connected..");
})
.catch((error)=>{console.log(error+"")});


//server connection
const server=express();


server.listen(8085,()=>{
    console.log("I am listening on port number 8085");
});

//session
let session = require("express-session");
server.use(session({secret:"eman"}));




server.use(express.urlencoded({extended:false}));


//views settings

server.set("view engine","ejs");
server.set("views",path.join(__dirname,"Views"));
server.use(express.static(path.join(__dirname,"Public")));
server.use(express.static(path.join(__dirname,"node_modules","bootstrap","dist")));


server.get("/home",function(request,response){
    response.send("HOME Page");
});

server.use(authenticationRouter);

////sessionnn
server.use((request,response,next)=>{
    if(request.session.role)
    {
        next();
    }
    else{
        response.redirect("/login");
    }
});



server.use("/admins",adminRouter);
server.use("/speakers",speakerRouter);
server.use("/events",eventRouter);
server.use(function(request,response){
  
    response.send("There is the default MW");
});