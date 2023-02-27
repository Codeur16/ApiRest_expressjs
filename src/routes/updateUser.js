const { USER} = require("../db/sequelize");

module.exports = (app)=>{
    app.put("/api/user/update/:id",(req,res)=>{
        const id = req.params.id;
        USER.update(req.body,{
            where:{id:id}
        })
        .then(()=>{
            return USER.findByPk(id)
            .then((users)=>{
                if(users===null){
                    const message= "Le user demende m'existe pas";
                    return res.status(404).json({message});

                }

                const message="User"+users.name+" updated successfully";
                res.status(200).json({message, data:users});
            })

        })
        .catch(err =>{
            res.status(500).json({message: "Erreur lors de la modification! Reessayer plus tard",err})
          })
    })

}