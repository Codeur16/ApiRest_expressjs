const { ValidationError } = require('sequelize');


const {payTable} = require("../../db/sequelize");
const auth = require('../../middleware/auth'); 


module.exports = (app)=>{
    app.put("/api/pay/update/:id",auth,(req,res)=>{
        const id = req.params.id;
        payTable.update(req.body,{
            where:{payementId:id}
        })
        .then(()=>{
            return payTable.findByPk(id)
            .then((pays)=>{
                if(pays===null){
                    const message= "Le payement demande m'existe pas";
                    return res.status(404).json({message});
                }
                const message="pay"+pays.status+" updated successfully";
                res.status(200).json({message, data:pays});
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