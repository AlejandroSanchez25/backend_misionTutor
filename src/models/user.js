const { Schema, model } = require('mongoose');

const userSchema = Schema({
    firstName: {
        type: String,
    },
    lastname: {
        type: String,
    },
    cellphoneNumber: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    
    age: {
        type: String,
    },
    rol: {
        type: String,
    },
    departamento: {
        type: String,
    },
    city:{
        type: String,
    },
    assignature:{
        type: String,
    },
}, {
    collection: 'users'
});

module.exports = model('User', userSchema);