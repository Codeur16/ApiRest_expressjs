const {Sequelize, DataTypes} =require('sequelize')
const userModel = require("../models/userModel")

// instance sequelize

const sequelize = new Sequelize('test', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-1',
    },
    logging: false
  })

    
const USER= userModel(sequelize, DataTypes);

// function initDB(){
//     return sequelize.sync({force: true})
//     .then(() => {
//         console.log('Database has been synced!');

//         users.map( User => {
//             USER.create({
            
//             name: User.name,
//             email: User.email,
//             password: User.password,




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



    module.exports = { USER};