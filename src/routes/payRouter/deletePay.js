const {payTable} = require("../../db/sequelize");

const auth = require('../../middleware/auth'); 


module.exports = (app) =>{
    app.delete("/api/pay/delete/:id",auth, (req, res) => {
        const id = req.params.id;
        payTable.findByPk(req.params.id)
        .then(pays => {
            if(pays===null){
                        const message= "Le payement demande n'existe pas";
                        return res.status(404).json({message});
            
                    }
            const payDeleted = pays;
            return payTable.destroy({where: {payementId:id}})
            .then(_=>{
               
                const message = "Le payement "+payDeleted.status+" a été supprimé";
                res.status(200).json({message, data:payDeleted});
            })
            })
            .catch(err => {
                res.status(500).json({message: " Erreur lors de la suppression du pay", data:err});
            });

        })
       


    }


