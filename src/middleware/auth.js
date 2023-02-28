const jwt = require('jsonwebtoken');
const private_key = require('../auth/private_key');

module.exports = (req, res, next) => {
    const authorization = req.headers.authorization;

    if(!authorization){
        const message= "Vous n'avez pas fournie de jeton d'authentification. Ajouter un dans l'entete de requete";
        return res.status(401).json({message});

    }
    const token = authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, private_key, (error, decodedToken) => {
        if(error){
            const message = "L'utilisateur n'est pas authorise a acceder a cette ressource!";
            return res.status(401).json({message, data:error});
        }

        const id = decodedToken.id;
    if(req.body.id && req.body.id!== id){
        const message = "L'identifiant de l'utilisateur est invalide";
        res.status(401).json({message});
    } else{
        next();
    }
 }
);

}