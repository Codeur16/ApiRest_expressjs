const { ValidationError } = require('sequelize');
const bcrypt = require('bcrypt');
const {userTable}= require("../../db/sequelize");

module.exports=(app) =>{
    app.post("/api/user/register",(req,res)=>{
        const {name,email,role,password} = req.body;
        if(!name ||!email ||!role ||!password){
            return res.status(400).json({
                message:"Entrer le nom, l'email et le role, le mot de passe"
            });
        }
        const hash = bcrypt.hashSync(password,10);
        const newuser = {
            name,
            email,
            role,
            password:hash
        };
        userTable.create(newuser)
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