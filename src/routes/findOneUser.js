const {USER} = require ("../db/sequelize")

module.exports = (app)=>{
  app.get("/api/user/:id", (req ,res)=>{
    USER.findByPk(req.params.id)
        .then(users =>{
        const message ="Un user a bien ete recuperer!"
        res.status(200).json({message,data: users})

      })
})
}