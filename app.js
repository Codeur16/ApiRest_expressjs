const express = require('express');
// const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');


const sequelize = require('./src/db/sequelize');
const app = express();


const port=process.env.PORT || 3001;


// app.use(morgan('dev'));
app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.json());
app
    .use(favicon(__dirname + "/favicon.ico"))
    // .use(morgan('dev'))
    .use(bodyParser.json());
//sequelize.initDB();
// POINT DE TERMINAISON

app.get('/',(req, res)=>{
    res.send('Hello Hiruko');
})

require("./src/routes/findAllUser")(app);
require("./src/routes/findOneUser")(app);
require("./src/routes/createUser")(app);
require("./src/routes/updateUser")(app);
require("./src/routes/deleteUser")(app);
require("./src/routes/login")(app);

// Ajoute le gestion d'erreur 404
app.use(({res})=> {
    const message = "Impossible de trouver la ressource! vous pouvez essayer un autre URL"
    res.status(404).json(message);
});


app.listen(port, () => {console.log('listening on port'+port+'lien du serveur http://localhost:'+port)});        
 
















// app.get('/', (req, res) => {
// res.send('Hello World LOICO!');
// })

// // Afficher un user
// app.get('/api/user/:id', (req, res) => {
//     const id=parseInt(req.params.id);
//     const user = users.find(user => user.id == id);

// res.status(200).json(sucess("user "+id, user))
// })
// // Afficher touts users
// app.get('/api/user/', (req, res) => {
// const message="liste de tous les users"
// res.status(200).json(sucess(message, users));
//    //res.send("il y'a "+users.length+" users");
// })  

// // ajouter d'un utilisateur
// app.post('/api/Adduser/', (req, res) => {
//     const id= 28;
//     const userCreate = {id:id,...req.body,...{ create:new Date()}};

//     users.push(userCreate);
//     const message = "Le user "+userCreate.id+" a été ajouté";
//     res.json(sucess(message, userCreate));
// });


//     //modification d'un utilisateur
//     app.put('/api/Updateuser/:id', (req, res) => {
//         const id=parseInt(req.params.id);
//         const userUpdate = {id:id, ...req.body};
//         users = users.map(user =>
//             { return user.id === id? userUpdate : user});
//         const message = "Le user "+userUpdate.name+" a été modifié";
//         res.json(sucess(message, userUpdate));

//     });


// //supprime un utilisateur

// app.delete('/api/deleteuser/:id', (req, res)=>{
//     const id = parseInt(req.params.id);
//     users = users.filter(user => user.id!==id);
//     const message = "Le user a été supprimé";
// res.json(sucess(message, id));

// })

// //supprime tous les utilisateur

// app.delete('/api/deletealluser', (req, res)=>{
//     users = [];
//     const message = "Tous les utilisateurs ont été supprimé";
// res.json(sucess(message, users));

// })


