const {USER} = require ("../db/sequelize")

const auth = require('../middleware/auth'); 


module.exports = (app)=>{
  app.get("/api/user/:id",auth, (req ,res)=>{
    USER.findByPk(req.params.id)
        .then(users =>{
        const message ="Le user nommé  "+users.name+" a bien été recuperer!"
        res.status(200).json({message,data: users})

      })
      .catch(err =>{
        res.status(500).json({message: "Erreur lors de la recuperation de l'utilisateur ! Reessayer plus tard",err})
      })
})
}   