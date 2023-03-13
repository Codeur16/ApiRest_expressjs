const { ValidationError } = require('sequelize');


const {schoolTable} = require("../../db/sequelize");
const auth = require('../../middleware/auth'); 


module.exports = (app)=>{
    app.put("/api/school/update/:id",auth,(req,res)=>{
        const id = req.params.id;
        schoolTable.update(req.body,{
            where:{ schoolid:id}
        })
        .then(()=>{
            return schoolTable.findByPk(id)
            .then((schools)=>{
                if(schools===null){
                    const message= "L'ecole demande m'existe pas";
                    return res.status(404).json({message});
                }
                const message="school"+schools.name+" updated successfully";
                res.status(200).json({message, data:schools});
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