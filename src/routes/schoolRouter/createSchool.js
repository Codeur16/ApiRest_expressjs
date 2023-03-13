const { ValidationError } = require('sequelize');
const bcrypt = require('bcrypt');

const {schoolTable} = require("../../db/sequelize");
const auth = require('../../middleware/auth'); 

module.exports=(app) =>{
    app.post("/api/school/create",auth,(req,res)=>{
       
        schoolTable.create(req.body)
        .then(school =>{
            const message="L'ecole "+req.body.name+" a bien été créé";
            res.status(200).json({message, data: school});

        })
        .catch(err =>{
            if(err instanceof ValidationError){
                return res.status(400).json({message: err.message, data: err});

            }
            
            res.status(500).json({message: "Erreur lors de l'ajout d'un ecole! Reessayer plus tard",err})
          })
});

}
