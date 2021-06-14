function autorizarUsuario(req, res, next) {
    if (req.usuario == null) {
        res.status(403)
        return res.send('Necesitas loggearte.')
    }
    next();
}

function autorizarRol(role) {
    return (req, res, next) => {
        if (req.usuario.role !== role) {
            res.status(401);
            return res.send('No está permitido')
        }
        next();
    }
}

module.exports = { autorizarUsuario, autorizarRol }