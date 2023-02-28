const {USER} = require ("../db/sequelize");
const {Op} = require('sequelize');
const auth = require('../middleware/auth'); 

module.exports = (app)=>{
  app.get("/api/user/all/",auth, (req ,res)=>{
    if(req.query.name){
      const name = req.query.name;
      if(name.length < 2){
        return res.status(400).json({error: "Name must be at least 2 characters long"});

      }

      return USER.findAndCountAll(
        {where:{name:{
          [Op.like]:'%'+name+'%' }},
          order:['name'],
           limit: 5
        })
      .then(({count, rows})=>{
        const message="Il ya au total "+ count + " users qui correspondent a la recherche  "+name;
        res.status(200).json({message , data:rows});
      })
      .catch(err=>{
        res.status(500).json({message:"La ressource recherche est introuvable",data:[]});
      })

    }
    else{
    USER.findAll()
      .then(users =>{
        const message ="La liste a bien ete recuperer!"
        res.status(200).json({message,data: users})

      })
      .catch(err =>{
        res.status(500).json({message: "Erreur lors de la recuperation de la liste! Reessayer plus tard",err})
      })
    }
})

}