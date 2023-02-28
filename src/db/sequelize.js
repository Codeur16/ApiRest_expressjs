const {Sequelize, DataTypes} =require('sequelize');
const bcrypt = require('bcrypt');


const userModel = require("../models/userModel");
const clientModel = require("../models/clientModel");

// instance sequelize
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
   

sequelize = new Sequelize('test', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-1',
    },
    logging: false
  })

}
const USER= userModel(sequelize, DataTypes);
const client= clientModel(sequelize, DataTypes);

async function initclient(){
  
  return sequelize.sync()
  .then(_=>{
   bcrypt.hash('12345678', 1)
   .then(hash=>{
          client.create({
              name: 'test',
              email: 'test@test.com',
              role: 'user',
              password: hash
          })
          .then(test=>
              console.log(test.toJSON())
          );
})

})
}
async function initDB(){
  return sequelize.sync()
    .then(_=>{
     bcrypt.hash('12345678', 1)
     .then(hash=>{
            USER.create({
                name: 'test',
                email: 'test@test.com',
                password: hash
            })
            .then(test=>
                console.log(test.toJSON())
            );
})

})


}
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



    module.exports = { USER, client, initDB, initclient };