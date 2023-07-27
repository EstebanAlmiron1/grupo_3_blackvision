const express = require("express")
const app = express()
const path = require("path")


app.listen(3000,()=>{
    console.log("BlackVision activado")
})
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/index.html"))
})
app.get("/carrito",(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/productCart.html"))
})

app.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/login.html"))
}) 