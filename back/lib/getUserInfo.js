function getUserInfo(user){
    return {
        nombre: user.nombre,
        aPaterno: user.aPaterno,
        aMaterno: user.aMaterno,
        nombreUsuario: user.nombreUsuario,
        correo: user.correo,
        id: user.id || user._id,
    };
}

module.exports = getUserInfo;