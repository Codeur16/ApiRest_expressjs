const {schoolTable} = require ("../../db/sequelize")

const auth = require('../../middleware/auth'); 


module.exports = (app)=>{
  app.get("/api/school/:id",auth, (req ,res)=>{
    schoolTable.findByPk(req.params.id)
        .then(schools =>{
        const message ="L'ecole nommé  "+schools.name+" a bien été recuperer!"
        res.status(200).json({message,data: schools})

      })
      .catch(err =>{
        res.status(500).json({message: "Erreur lors de la recuperation de L'ecole ! Reessayer plus tard",err})
      })
})
}   
