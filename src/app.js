const express = require("express")
const app = express()
const path = require("path")
const methorOverride = require("method-override")
const session = require('express-session')

const mainRouter=require("./routers/mainRouter")
const productRouter=require("./routers/productRouter")
const userRouter=require("./routers/userRouter")


app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methorOverride('_method'))
app.use(session({
    secret:'shh its a secret',
    resave: false,
    saveUninitialized:false
}))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(3000,()=>{
    console.log("BlackVision activado")
})

app.use("/",mainRouter)
app.use("/products",productRouter)
app.use("/user",userRouter)



