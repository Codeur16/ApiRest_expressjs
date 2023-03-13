const { userTable } = require('../../db/sequelize');
const auth = require('../../middleware/auth'); 
module.exports=(app)=>{
    // delete user
    app.delete("/api/user/delete/:id",auth, (req, res) => {
        const id = req.params.id;
        userTable.findByPk(req.params.id)
        .then(users => {
            if(users===null){
                const message= "L'utilisateur demande n'existe pas";
                return res.status(404).json({message});

            }
            const userDeleted = users;
           return userTable.destroy({where: {userid:id}})
            .then(_=>{
               
                const message = "L'utilisteur "+userDeleted.name+" a été supprimé";
                res.status(200).json({message, data:userDeleted});
            })
            })
            .catch(err => {
                res.status(500).json({message: " Erreur lors de la suppression du user", data:err});
            });

        })

}