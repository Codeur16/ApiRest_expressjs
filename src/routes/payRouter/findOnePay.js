const {payTable} = require ("../../db/sequelize")

const auth = require('../../middleware/auth'); 


module.exports = (app)=>{
  app.get("/api/pay/:id",auth, (req ,res)=>{
    payTable.findByPk(req.params.id)
        .then(pays =>{
        const message ="Le payement intitule  "+pays.status+" a bien été recuperer!"
        res.status(200).json({message,data: pays})

      })
      .catch(err =>{
        res.status(500).json({message: "Erreur lors de la recuperation de Le payement ! Reessayer plus tard",err})
      })
})
}   
