const express=require("express");
const adminRouter=express.Router();

adminRouter.get("/list",(request,response)=>{response.send("list admin")});
adminRouter.get("/add",(request,response)=>{response.send("list admin")});
adminRouter.get("/edit",(request,response)=>{response.send("edit admin")});
adminRouter.get("/delete",(request,response)=>{response.send("delete admin")});
adminRouter.get("/adminProfile",(request,response)=>{response.send("hello admin")});


module.exports=adminRouter;