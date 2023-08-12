const path=require('path')

const controller ={
    home:(req,res)=>{        
        return res.render(path.join(__dirname,"../views/index.ejs"))
    }
}






module.exports = controller