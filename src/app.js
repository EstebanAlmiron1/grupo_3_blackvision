const express = require("express")
const app = express()
const path = require("path")
const methorOverride = require("method-override")
const session = require('express-session')

const mainRouter=require("./routers/mainRouter")
const productRouter=require("./routers/productRouter")
const userRouter=require("./routers/userRouter")
const userLogged= require("./middlewares/userLoggedMiddleware")
const cookie = require('cookie-parser')
const apiUser = require('./routers/apis/userRouteApis')
const apiProduct = require('./routers/apis/productRouteApis')


app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methorOverride('_method'))
app.use(session({
    secret:'shh its a secret',
    resave: false,
    saveUninitialized:false
}))
app.use(cookie());
app.use(userLogged);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(3001,()=>{
    console.log("BlackVision activado")
})

app.use("/",mainRouter)
app.use("/products",productRouter)
app.use("/user",userRouter)
app.use('/api/user', apiUser)
app.use('/api/product',apiProduct)





