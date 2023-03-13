const {schoolTable} = require("../../db/sequelize");

const auth = require('../../middleware/auth'); 


module.exports = (app) =>{
    app.delete("/api/school/delete/:id",auth, (req, res) => {
        const id = req.params.id;
        schoolTable.findByPk(req.params.id)
        .then(schools => {
            if(schools===null){
                        const message= "L'ecole demande n'existe pas";
                        return res.status(404).json({message});
            
                    }
            const schoolDeleted = schools;
            return schoolTable.destroy({where: {schoolid:id}})
            .then(_=>{
               
                const message = "L'ecole "+schoolDeleted.name+" a été supprimé";
                res.status(200).json({message, data:schoolDeleted});
            })
            })
            .catch(err => {
                res.status(500).json({message: " Erreur lors de la suppression du ecole", data:err});
            });

        })
       


    }


