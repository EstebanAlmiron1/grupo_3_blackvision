const express = require("express")
const app = express()
const path = require("path")

const mainRouter=require("./routers/mainRouter")
const productRouter=require("./routers/productRouter")
const userRouter=require("./routers/userRouter")


app.use(express.static("public"))

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.listen(3000,()=>{
    console.log("BlackVision activado")
})

app.use("/",mainRouter)
app.use("/product",productRouter)
app.use("/user",userRouter)



