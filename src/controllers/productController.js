const path=require('path')

const controller ={
    list:(req,res)=>{
        res.render(path.join(__dirname,"../views/productList.ejs"))
    },
    detail:(req,res)=>{
        res.render(path.join(__dirname,"../views/productDetail.ejs"))
    },
}




module.exports = controller