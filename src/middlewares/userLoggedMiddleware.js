const db = require('../database/models')

async function userLoggedMiddleware(req,res,next) {
    res.locals.isLogged = false    
    
    let userFromCookies = await db.User.findOne({where:{mail:req.cookies.userMail ? req.cookies.userMail : 'notuserfound'}})

    if(userFromCookies){
        req.session.userLogged = userFromCookies
    }
    if(req.session.userLogged){
        res.locals.isLogged = true
        res.locals.userLogged = req.session.userLogged
    }
    next()
}

module.exports = userLoggedMiddleware