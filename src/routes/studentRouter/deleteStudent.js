const {studentTable} = require("../../db/sequelize");

const auth = require('../../middleware/auth'); 


module.exports = (app) =>{
    app.delete("/api/student/delete/:id",auth, (req, res) => {
        const id = req.params.id;
        studentTable.findByPk(req.params.id)
        .then(users => {
            if(users===null){
                        const message= "L'utilisateur demande n'existe pas";
                        return res.status(404).json({message});
            
                    }
            const userDeleted = users;
            return studentTable.destroy({where: {studentid:id}})
            .then(_=>{
               
                const message = "L'eleve "+userDeleted.name+" a été supprimé";
                res.status(200).json({message, data:userDeleted});
            })
            })
            .catch(err => {
                res.status(500).json({message: " Erreur lors de la suppression du user", data:err});
            });

        })
       


    }



    // const id = req.params.id;
    // userTable.findByPk(req.params.id)
    // .then(users => {
    //     if(users===null){
    //         const message= "L'utilisateur demande n'existe pas";
    //         return res.status(404).json({message});

    //     }
    //     const userDeleted = users;
    //    return userTable.destroy({where: {userid:id}})
    //     .then(_=>{
           
    //         const message = "L'utilisteur "+userDeleted.name+" a été supprimé";
    //         res.status(200).json({message, data:userDeleted});
    //     })
    //     })
    //     .catch(err => {
    //         res.status(500).json({message: "L'utilisateur inexistant! \n Erreur lors de la suppression du user", data:err});
    //     });

    // })
