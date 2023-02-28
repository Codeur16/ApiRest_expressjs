const { ValidationError } = require('sequelize');

const {USER} = require("../db/sequelize");
const users = require("../models/userModel");
const auth = require('../middleware/auth'); 

module.exports=(app) =>{
    app.post("/api/user/create",auth,(req,res)=>{
        USER.create(req.body)
        .then(users =>{
            const message="Le users "+req.body.name+" a bien été créé";
            res.status(200).json({message, data: users});

        })
        .catch(err =>{
            if(err instanceof ValidationError){
                return res.status(400).json({message: err.message, data: err});

            }
            
            res.status(500).json({message: "Erreur lors de l'ajout d'un user! Reessayer plus tard",err})
          })
});
}