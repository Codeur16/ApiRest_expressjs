const {USER} = require("../db/sequelize");
const users = require("../models/userModel");

module.exports=(app) =>{
    app.post("/api/user/create",(req,res)=>{
        USER.create(req.body)
        .then(users =>{
            const message="Le users "+req.body.name+" a bien été créé";
            res.status(200).json({message, data: users});

        })
        .catch(err =>{
            res.status(500).json({message: "Erreur lors de l'ajout d'un user! Reessayer plus tard",err})
          })
});
}