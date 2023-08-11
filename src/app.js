const express = require("express")
const app = express()
const path = require("path")

const mainRouter=require("./routers/mainRouter")
const productRouter=require("./routers/productRouter")
const userRouter=require("./routers/userRouter")


app.use(express.static("public"))

app.listen(3000,()=>{
    console.log("BlackVision activado")
})

app.use("/",mainRouter)
//app.use("/product",productRouter)
//app.use("/user",userRouter)

//app.set("views",path.join(__dirname,"views"))//
//app.set("view engine","ejs")//




app.get("/productCart",(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/productCart.html"))
})

app.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/login.html"))
})

app.get("/perfil",(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/perfil.html"))
})

app.get("/productDetail",(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/productDetail.html"))
})

app.get("/register",(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/register.html"))
})

app.get("/productList",(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/productList.html"))
})