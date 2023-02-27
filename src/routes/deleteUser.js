const {USER} = require("../db/sequelize");

module.exports = (app) =>{
    app.delete("/api/user/delete/:id", (req, res) => {
        USER.findByPk(req.params.id)
        .then(users => {
            const userDeleted = users;
            USER.destroy({where: {id:users.id}})
            .then(_=>{
                const message = "Le user  "+userDeleted.name+" a été supprimé";
                res.status(200).json({message, data:userDeleted});
            })
            .catch(err => {
                res.status(500).json({message: " Erreur lors de la suppression du user", data:err});
            });
            })
            .catch(err => {
                res.status(500).json({message: "Utilisateur inexistant! \n Erreur lors de la suppression du user", data:err});
            });

        })
       


    }
