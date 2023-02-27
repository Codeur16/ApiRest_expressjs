const { USER} = require("../db/sequelize");

module.exports = (app)=>{
    app.put("/api/user/update/:id",(req,res)=>{
        const id = req.params.id;
        USER.update(req.body,{
            where:{id:id}
        })
        .then(()=>{
            USER.findByPk(id)
            .then((users)=>{
                const message="User"+users.name+" updated successfully";
                res.status(200).json({message, data:users});
            })

        })
    })

}