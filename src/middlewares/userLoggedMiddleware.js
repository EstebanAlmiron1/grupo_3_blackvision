const User = require("../../models/User")

function userLoggedMiddleware(req,res,next) {
    res.locals.isLogged = false
    let cookieEmail = req.cookies.userMail
    let userFromCookies = User.findByField('email', cookieEmail)
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