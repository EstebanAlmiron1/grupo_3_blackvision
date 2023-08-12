const path=require('path')

const controller ={
    list:(req,res)=>{
        res.sendFile(path.join(__dirname,"../views/productList.html"))
    },
    detail:(req,res)=>{
        res.sendFile(path.join(__dirname,"../views/productDetail.html"))
    },
}




module.exports = controller