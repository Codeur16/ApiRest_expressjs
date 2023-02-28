const { ValidationError } = require('sequelize');


const { USER} = require("../db/sequelize");
const auth = require('../middleware/auth'); 


module.exports = (app)=>{
    app.put("/api/user/update/:id",auth,(req,res)=>{
        const id = req.params.id;
        USER.update(req.body,{
            where:{id:id}
        })
        .then(()=>{
            return USER.findByPk(id)
            .then((users)=>{
                if(users===null){
                    const message= "Le user demende m'existe pas";
                    return res.status(404).json({message});

                }

                const message="User"+users.name+" updated successfully";
                res.status(200).json({message, data:users});
            })
        })
        .catch(err =>{
            if(err instanceof ValidationError){
               return res.status(400).json({message: err.message, data: err});

            }
            res.status(500).json({message: "Erreur lors de la modification! Reessayer plus tard",err})
          })
    })

}