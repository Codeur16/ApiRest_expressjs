const {payTable} = require ("../../db/sequelize");
const {Op} = require('sequelize');
const auth = require('../../middleware/auth'); 

module.exports = (app)=>{
  app.get("/api/pay/all/",auth, (req ,res)=>{
    if(req.query.name){
      const name = req.query.name;
      if(name.length < 2){
        return res.status(400).json({error: "Name must be at least 2 characters long"});

      }

      return payTable.findAndCountAll(
        {where:{name:{
          [Op.like]:'%'+name+'%' }},
          order:['name'],
           limit: 5
        })
      .then(({count, rows})=>{
        const message="Il ya au total "+ count + " payement qui correspondent a la recherche  "+name;
        res.status(200).json({message , data:rows});
      })
      .catch(err=>{
        res.status(500).json({message:"La ressource recherche est introuvable",data:[]});
      })

    }
    else{
      payTable.findAll()
      .then(pays =>{
        const message ="La liste a bien ete recuperer!"
        res.status(200).json({message,data: pays})

      })
      .catch(err =>{
        res.status(500).json({message: "Erreur lors de la recuperation de la liste! Reessayer plus tard",err})
      })
    }
})


// find all payement by studentId
app.get("/api/pay/student/all/:id",auth, (req,res)=>{
  const id = req.params.id;
  payTable.findAll({where:{studentId:id}})
  .then(pays =>{
    const message ="La liste a bien ete recuperer!"
    res.status(200).json({message,data: pays})

  })
  .catch(err =>{
    res.status(500).json({message: "Erreur lors de la recuperation de la liste! Reessayer plus tard",err})
  })
})

// find all payement by userId
app.get("/api/pay/user/all/:id",auth, (req,res)=>{
  const id = req.params.id;
  payTable.findAll({where:{userId:id}})
  .then(pays =>{
    const message ="La liste a bien ete recuperer!"
    res.status(200).json({message,data: pays})

  })
  .catch(err =>{
    res.status(500).json({message: "Erreur lors de la recuperation de la liste! Reessayer plus tard",err})
  })
})



// find all pay by student id and user id 
app.get("/api/pay/studentUser/all/:userId/:studentId",auth, (req,res)=>{
  const id = req.params.userId;
  const studentId = req.params.studentId;
  payTable.findAll({where:{studentId:id,userId:studentId}})
  .then(pays =>{
    const message ="La liste a bien ete recuperer!"
    res.status(200).json({message,data: pays})

  })
  .catch(err =>{
    res.status(500).json({message: "Erreur lors de la recuperation de la liste! Reessayer plus tard",err})
  })
})











}