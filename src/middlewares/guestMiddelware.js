function guestMiddelware (req, res, next) {
    if (req.session.userLogged){
        let usuario =  req.session.userLogged
        return res.redirect('/user/profile/'+ usuario.id)
    }
    next()
}
module.exports = guestMiddelware