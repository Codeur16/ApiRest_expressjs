const {studentTable, schoolTable} = require ("../../db/sequelize");
const {Op} = require('sequelize');
const auth = require('../../middleware/auth'); 
//const student = require("../../models/studentModel");
module.exports = (app)=>{
    app.get("/api/student/all/:id",auth, (req ,res)=>{
      const id = req.params.id;
      const classs = req.query.class;
      studentTable.findAll({ 
          // where: { class: classs },
          include: [
            {
              model: schoolTable,
              where: { schoolid: id }
            }
          ]
        })
        .then(students => {
          const message = "La liste des élèves a bien été récupérée.";
          res.status(200).json({ message , data: students });
        })
        .catch(err => {
          res.status(500).json({ message: "Une erreur s'est produite lors de la récupération de la liste des élèves.", data: [] });
        });
  
       
  });
}

 // else{
    //   studentTable.findAll()
    //   .then(users =>{
    //     const message ="La liste a bien ete recuperer!"
    //     res.status(200).json({message,data: users})

    //   })
    //   .catch(err =>{
    //     res.status(500).json({message: "Erreur lors de la recuperation de la liste! Reessayer plus tard",err})
    //   })
    // }