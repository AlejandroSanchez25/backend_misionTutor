const User = require('../models/user');
const TokenController = require('./tockenController');
const jsonwebtoken = require('jsonwebtoken');

class UserController {

    register(req, res) {
        let objUser = req.body;
        console.log(objUser);
        if (objUser.firstName && objUser.lastname && objUser.email && objUser.password) {
            console.log("linea 10")
            User.create(objUser, (error, doc) => {
                console.log("linea 12", "error "+error+ " doc "+doc);
                if (error) {
                    res.status(500).json({ info: 'Error de inserción' });
                } else {
                    console.log(doc);
                    let token = jsonwebtoken.sign({id: doc._id}, process.env.NODE_PRIVATE_KEY);
                    res.status(201).json({ token });
                }
            });
        } else {
            res.status(400).json({ info: 'Datos incompletos' })
        }
    }

    login(req, res) {
        let { email, password } = req.body;
        User.find({ email, password }, (error, docs) => {
            if (error) {
                console.log(error);
                res.status(500).send();
            } else {
                //si el array es mayor a cero, las credenciales corresponden
                if (docs.length > 0) {
                    //Generar token
                    let token = jsonwebtoken.sign({id: docs[0]._id}, process.env.NODE_PRIVATE_KEY);
                    res.status(200).json({ token });
                }else{
                    res.status(401).json({info: 'Credenciales inválidas'});
                }
            }
        })
    }

    user(req,res){
        let tokenC = new TokenController();
        let token = tokenC.getToken(req);
        let decode = jsonwebtoken.decode(token, process.env.NODE_PRIVATE_KEY); 
        let user_id = decode.id;
        User.find({_id: user_id},(error, docs)=>{
            if(error){
                res.status(500).json({error});
            }else{
                res.status(200).json(docs);
            }
        })
    }

    userByRol(req,res){
        let tokenC = new TokenController();
        let token = tokenC.getToken(req);
        let {rol} = req.body;
        let decode = jsonwebtoken.decode(token, process.env.NODE_PRIVATE_KEY); 
        let user_id = decode.id;
        User.find({rol: rol},(error, docs)=>{
            if(error){
                res.status(500).json({error});
            }else{
                res.status(200).json(docs);
            }
        })
    }
}


module.exports = UserController;