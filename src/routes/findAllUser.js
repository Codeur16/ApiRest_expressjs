const {USER} = require ("../db/sequelize")

module.exports = (app)=>{
  app.get("/api/user/all", (req ,res)=>{
    USER.findAll()
      .then(users =>{
        const message ="La liste a bien ete recuperer!"
        res.status(200).json({message,data: users})

      })
})
}