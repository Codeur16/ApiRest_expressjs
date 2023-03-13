const {studentTable} = require ("../../db/sequelize")

const auth = require('../../middleware/auth'); 


module.exports = (app)=>{
  app.get("/api/student/:id",auth, (req ,res)=>{
    studentTable.findByPk(req.params.id)
        .then(users =>{
        const message ="L'eleve nommé  "+users.name+" a bien été recuperer!"
        res.status(200).json({message,data: users})

      })
      .catch(err =>{
        res.status(500).json({message: "Erreur lors de la recuperation de L'eleve ! Reessayer plus tard",err})
      })
})
}   
