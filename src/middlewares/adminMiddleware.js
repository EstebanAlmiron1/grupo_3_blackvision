function adminMiddleware (req, res, next) {
    if (req.session.userLogged.id_roles != 1){
        return res.redirect('/')
    }
   
    next()
}

module.exports = adminMiddleware