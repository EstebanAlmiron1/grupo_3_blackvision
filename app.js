const express = require("express")
const app = express()
const path = require("path")

app.use(express.static("public"))

app.listen(3000,()=>{
    console.log("BlackVision activado")
})

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/index.html"))
})
app.get("/carrito",(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/carrito.html"))
})

app.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/login.html"))
}) 