const path=require('path')

const controller ={
    home:(req,res)=>{        
        return res.sendFile(path.join(__dirname,"../views/index.html"))
    }
}






module.exports = controller