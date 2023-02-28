const {USER} = require("../db/sequelize");

const auth = require('../middleware/auth'); 


module.exports = (app) =>{
    app.delete("/api/user/delete/:id",auth, (req, res) => {
        USER.findByPk(req.params.id)
        .then(users => {
            const userDeleted = users;
            return USER.destroy({where: {id:users.id}})
            .then(_=>{
                if(users===null){
                    const message= "Le user demande n'existe pas";
                    return res.status(404).json({message});

                }
                const message = "Le user  "+userDeleted.name+" a été supprimé";
                res.status(200).json({message, data:userDeleted});
            })
            })
            .catch(err => {
                res.status(500).json({message: "Utilisateur inexistant! \n Erreur lors de la suppression du user", data:err});
            });

        })
       


    }
