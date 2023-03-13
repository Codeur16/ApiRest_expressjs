// const { ValidationError } = require('sequelize');
// const bcrypt = require('bcrypt');

// const {payTable} = require("../../db/sequelize");
// const auth = require('../../middleware/auth'); 

// module.exports=(app) =>{
//     app.post("/api/pay/create/:userId/:studentId",auth,(req,res)=>{
       
//         payTable.create(req.body)
//         .then(pays =>{
//             const message="Le payement "+req.body.status+" a bien été créé";
//             res.status(200).json({message, data: pays});

//         })
//         .catch(err =>{
//             if(err instanceof ValidationError){
//                 return res.status(400).json({message: err.message, data: err});

//             }
            
//             res.status(500).json({message: "Erreur lors de l'ajout d'un payement! Reessayer plus tard",err})
//           })
// });

// }



const { ValidationError } = require('sequelize');
const { payTable } = require("../../db/sequelize");
const { studentTable } = require("../../db/sequelize");
const auth = require('../../middleware/auth');
const moment = require('moment');
const student = require('../../models/studentModel');

module.exports = (app) => {
    app.post("/api/pay/create/:userId/:studentId",auth, (req, res) => {
        const userId = req.params.userId;
        const studentId = req.params.studentId;
        

studentTable.findByPk(studentId)
.then(student=>{
   
    if(!student){
       return  res.status(404).send({message: "Eleve inexistante ! "});
    }
    

        const Pay = payTable.create({
            ...req.body,
            studentId: student.studentid,
            userId: userId 
          });
          
          Pay
            .then((Pay) => {
              const message = `Le payement' ${Pay.motif} a bien été effectué`;
              return res.status(201).json({ message, data: Pay });
            })
            .catch((err) => {
              console.error(err);
              res.status(500).json({ message : "Erreur lors de la création d'un étudiant", err });
            });
          
        });
    });
}