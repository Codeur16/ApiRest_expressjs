const {studentTable} = require ("../../db/sequelize");
const {Op} = require('sequelize');
const auth = require('../../middleware/auth'); 

module.exports = (app)=>{
  app.get("/api/student/all/", (req ,res)=>{
    if(req.query.name){
      const name = req.query.name;
      if(name.length < 2){
        return res.status(400).json({error: "Name must be at least 2 characters long"});

      }

      return studentTable.findAndCountAll(
        {where:{name:{
          [Op.like]:'%'+name+'%' }},
          order:['name'],
           limit: 5
        })
      .then(({count, rows})=>{
        const message="Il ya au total "+ count + " eleve qui correspondent a la recherche  "+name;
        res.status(200).json({message , data:rows});
      })
      .catch(err=>{
        res.status(500).json({message:"La ressource recherche est introuvable",data:[]});
      })

    }
    else{
      studentTable.findAll()
      .then(users =>{
        const message ="La liste a bien ete recuperer!"
        res.status(200).json({message,data: users})

      })
      .catch(err =>{
        res.status(500).json({message: "Erreur lors de la recuperation de la liste! Reessayer plus tard",err})
      })
    }
})









app.get("/api/student/findAllFromSchool/:id",auth, (req, res) => {
  const Id = req.params.id;
  

schoolTable.findByPk(Id)
.then(schools=>{

if(!schools){
 return  res.status(404).send({message: "Ecole inexistante ! "});
}


  const Student = studentTable.findAndCountAll({
     where:{ schoolId: schools.schoolid}
    });
    Student
      .then(({count, rows}) => {
        const message = `La liste des éleves  a bien été recuperer !`;
        return res.status(200).json({ message, data: rows, count:count });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message : "Erreur lors de la recuperation d'un étudiant", err });
      });
    
  });
});










app.get("/api/student/findOneFromSchool/:id",auth, (req, res) => {
  const Id = req.params.id;
  const StudentName = req.query.name;

schoolTable.findByPk(Id)
.then(schools=>{

if(!schools){
 return  res.status(404).send({message: "Ecole inexistante ! "});
}

if(StudentName){
  const Student = studentTable.findOne({
     where:{
      schoolId: schools.schoolid,
      name:StudentName
  }
    });
    Student
      .then((createdStudent) => {
        const message = `L'éleve ${StudentName}  a bien été recuperer !`;
        return res.status(200).json({ message, data: createdStudent });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message : "Erreur lors de la recuperation d'un étudiant", err });
      });
  }else{
      return  res.status(404).send({message: "Eleve inexistante ! "});
   }
  });

});














app.get("/api/student/findAllFromSchoolAndClass/:id",auth, (req, res) => {
const Id = req.params.id;
const StudentClass = req.query.class;

schoolTable.findByPk(Id)
.then(schools=>{

if(!schools){
return  res.status(404).send({message: "Ecole inexistante ! "});
}

if(StudentClass){
const Student = studentTable.findAll({
 where:{
  schoolId: schools.schoolid,
  class:StudentClass
}
});
Student
  .then((Student) => {
    const message = `Les éleves ont bien été recuperer !`;
    return res.status(200).json({ message, data: Student})})
  .catch((err) => {
    console.error(err);
    res.status(500).json({ message : "Erreur lors de la recuperation d'un étudiant", err });
  });
}else{
  return  res.status(404).send({message: "Classe inexistante ! "});
}
});

});











app.get("/api/student/findOneFromSchoolAndClass/:id",auth, (req, res) => {
const Id = req.params.id;
const StudentClass = req.query.class;
const StudentName = req.query.name;

schoolTable.findByPk(Id)
.then(schools=>{

if(!schools){
return  res.status(404).send({message: "Ecole inexistante ! "});
}

if(StudentClass){
if(StudentName){
const Student = studentTable.findOne({
 where:{
  schoolId: schools.schoolid,
  class:StudentClass,
  name:StudentName
}
});
Student
  .then((Student) => {
    const message = `L'éleve ${Student.name} a bien été recuperer !`;
    return res.status(200).json({ message, data: Student})})
  .catch((err) => {
    console.error(err);
    res.status(500).json({ message : "Erreur lors de la recuperation d'un étudiant", err });
  });
}else{
  return  res.status(404).send({message: "eleve  inexistante ! "});
}
}else{
  return  res.status(404).send({message: "Classe inexistante ! "});
}
});

});




}