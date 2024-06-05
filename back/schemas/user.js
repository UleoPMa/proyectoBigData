const Mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require("../auth/generateTokens");
const Token = require("../schemas/token");
const getUserInfo = require("../lib/getUserInfo");

const UserSchema = new Mongoose.Schema({
    id: { type: Object },
    nombre: { type: String, required: true},
    aPaterno: { type: String, required: true },
    aMaterno: { type: String, required: true },
    nombreUsuario: { type: String, required: true, unique: true },
    correo: { type: String, required: true },
    contrasenia: { type: String, required: true },
});


UserSchema.pre('save', function(next){
    if(this.isModified('contrasenia') || this.isNew){
        const document = this;

        bcrypt.hash(document.contrasenia,10, (err, hash) =>{
            if(err){
                next(err);
            } else{
                document.contrasenia = hash;
                next();
            }
        })
    }else{
        next();
    }
});


UserSchema.methods.nombreUsuarioExist = async function (nombreUsuario) {
    const result = await Mongoose.model("user").findOne({ nombreUsuario });

    return !!result;
};


UserSchema.methods.compareContrasenia = async function (contrasenia, hash) {
    const same = await bcrypt.compare(contrasenia, hash);
    return same;
};

UserSchema.methods.createAccessToken = function(){
    return generateAccessToken(getUserInfo(this));
}

UserSchema.methods.createRefreshToken = async function(){
    const refreshToken = generateRefreshToken(getUserInfo(this));

    try{
        await new Token({token: refreshToken }).save();

        return refreshToken;
    } catch(error){
        console.log(error);
    }
}

module.exports = Mongoose.model("user",UserSchema);