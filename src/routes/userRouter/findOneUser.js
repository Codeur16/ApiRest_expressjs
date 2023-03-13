const {userTable} = require ("../../db/sequelize")

const auth = require('../../middleware/auth'); 


module.exports = (app)=>{
  app.get("/api/user/:id",auth, (req ,res)=>{
    userTable.findByPk(req.params.id)
        .then(users =>{
            if(!users){
                const message ="L'utilisateur n'existe pas!"
                res.status(400).json({message})
                return
            }
        const message ="L'utilisateur nommé  "+users.name+" a bien été recuperer!"
        res.status(200).json({message,data: users})

      })
      .catch(err =>{
        res.status(500).json({message: "Erreur lors de la recuperation de L'utilisateur ! Reessayer plus tard",err})
      })
})
}   
