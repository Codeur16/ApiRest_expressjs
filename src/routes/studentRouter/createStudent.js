
const { ValidationError } = require('sequelize');
const { studentTable } = require("../../db/sequelize");
const { schoolTable } = require("../../db/sequelize");
const auth = require('../../middleware/auth');
const moment = require('moment');

module.exports = (app) => {
    app.post("/api/student/createFromSchool/:schoolId", (req, res) => {
        const Id = req.params.schoolId;
        

schoolTable.findByPk(Id)
.then(schools=>{
   
    if(!schools){
       return  res.status(404).send({message: "Ecole inexistante ! "});
    }
    

        const Student = studentTable.create({
            ...req.body,
            birthday: moment(req.body.birthday).format(),
            schoolId: schools.schoolid
          });
          
          Student
            .then((createdStudent) => {
              const message = `L'étudiant ${createdStudent.name} a bien été créé`;
              return res.status(201).json({ message, data: createdStudent });
            })
            .catch((err) => {
              console.error(err);
              res.status(500).json({ message : "Erreur lors de la création d'un étudiant", err });
            });
          
        });
    });
}