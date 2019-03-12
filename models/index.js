const mongoose= require('mongoose');
const{User}=require('./User');
const URL_MONGO='mongodb+srv://prueba:prueba@cluster0-x624n.mongodb.net/proyectoFinal?retryWrites=true'

mongoose.connect(URL_MONGO,{useNewUrlParser:true},(err)=>{
    !err
    ? console.log('Conexión Exitosa')
    : console.log('Error en la conexión')
});

module.exports={
    User
}