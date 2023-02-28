const {client} = require('../db/sequelize');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
const privatekey=require('../auth/private_key')

module.exports=(app)=>{
    app.post('/api/login',(req,res)=>{
        client.findOne({where:{email:req.body.email}})
        .then(clients=>{
            if(!clients){
                const message="l'utilisateur demandé est inexistant";
                return res.status(404).json({message});
            }
            bcrypt.compare(req.body.password,clients.password)
            .then(isPasswordValid=>{
                if(!isPasswordValid){
                    const message="Le mot de passe est incorrect!"
                    return res.status(401).json({message})
                }

                // JWT
                const token =jwt.sign(
                    {
                        clientsId:clients.id
                    },
                    privatekey,
                    {expiresIn:'24h'}
                )
                const message="L'utilisateur a ete connecte avec succes!"
                    return res.status(200).json({message, data:clients, token})
             })
        })
        .catch(err=>{
            const message="La connexion a echoue! réessayez dans quelques instants"
                    return res.status(500).json({message, data:err})
        })
    })
} 