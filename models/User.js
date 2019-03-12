const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },

    apellido: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    genre: {
        type: String,
        required: true,
        enum: ['F', 'M']

    },


    birthdate: {
        type: Date,
        required: true

    },

    fotoPerfil: {
        type: String,
        default: 'https://bit.ly/2tTZs48'
    },

    publicacion: [{
        post: {
            type: String,
            required: true
        },
        date_posts:{
            type:Date,
            default:Date.now
        },
        comment: [{
            text: {
                type: String,
                required: true
            },
            comment_user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            date_comment:{
                type:Date,
                default:Date.now

            }
        }]
    }],

    is_active: {
        type: Boolean,
        defaul: true
    },

   

}, { timestamps: true })

const User = mongoose.model('User', userSchema);

module.exports = {
    User
}