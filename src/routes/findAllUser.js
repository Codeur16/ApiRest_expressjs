const {USER} = require ("../db/sequelize")

module.exports = (app)=>{
  app.get("/api/user/all", (req ,res)=>{
    USER.findAll()
      .then(users =>{
        const message ="La liste a bien ete recuperer!"
        res.status(200).json({message,data: users})

      })
      .catch(err =>{
        res.status(500).json({message: "Erreur lors de la recuperation de la liste! Reessayer plus tard",err})
      })

})
}