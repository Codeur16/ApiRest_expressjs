const {Sequelize, DataTypes} =require('sequelize');
const bcrypt = require('bcrypt');

// importation des models

const studentModel = require("../models/studentModel");
const userModel = require("../models/userModel");
const payModel = require("../models/payModel");
const schoolModel = require("../models/schoolModel");

// configuration de la base de donnees 
let sequelize;
if (process.env.NODE_ENV ===  'production') {
  sequelize = new Sequelize('q3km6gfiypm99yap','fmjzknms6lf6acih','mpe1lmb1jci8jwzx',{
    host:'ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect:'mariadb',
    dialectOptions:{
      timezone:'Etc/GMT-1'
    },
    logging:true
  })
}else{
   
// connection a la db en local
sequelize = new Sequelize('app', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-1',
    },
    logging: false,
    define:{
      maxKeys: 200
    }
  })

}

// creation des models
const studentTable= studentModel(sequelize, DataTypes);
const userTable= userModel(sequelize, DataTypes);
const payTable= payModel(sequelize, DataTypes);
const schoolTable= schoolModel(sequelize, DataTypes);


//association de la baase de donnees

 function initDB(){
  console.log("initialisation des tables de la base de donnees");
  return sequelize.sync({alter:true}) 

    // .then(_=>{
    //   bcrypt.hash('12345678', 1)
    //         .then(hash=>{
      
    //     schoolTable.create({
    //         name: "nkoaban",
    //         adresse:"yaounde"
    //     }) 
        
    //     userTable.create({
    //         name: 'loico',
    //         email: 'loioico@gmail.com',
    //         password: hash,
    //         role:'admin'
    //     })
        
    //     payTable.create({
    //         amount: 100000,
    //         status:"tranche2",
    //         userId:1,
    //         studentId:1

    //     })

        
    //     studentTable.create({
    //         name: 'jean',
    //         class: 'terminaleC',
    //         school:"lycee bilingue ekounou",
    //         sex:"m",
    //         birthday:new Date(1998, 6, 20),
    //         birth_place:"doual",
    //         phone:"123456787",
    //         school_situation:"ancien",
    //         class_situation:"ancien",
    //         schoolId:1,

    //     })
    //   })
    //   })

 }

module.exports = { studentTable, userTable, initDB,payTable, schoolTable};




// async function initDB(){
//   return sequelize.sync()
//     .then(_=>{
//      bcrypt.hash('12345678', 1)
//      .then(hash=>{
//             studentTable.create({
//                 name: 'test',
//                 email: 'test@test.com',
//                 password: hash
//             })
//             .then(test=>
//                 console.log(test.toJSON())
//             );
// })

// })


// }


// function initDB(){
//     return sequelize.sync({force: true})
//     .then(() => {
//         console.log('Database has been synced!');

//         students.map( student => {
//             student.create({
            
//             name: student.name,
//             email: student.email,
//             password: student.password,




//         }).then(admin=>{ console.log(admin.toJSON())})
//     })

//     })
//     .catch((error) => {
//         console.error('Unable to sync the database:', error);
//     });
// }

// sequelize.authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch((error) => {
//         console.error('Unable to connect to the database:', error);
//     });



   