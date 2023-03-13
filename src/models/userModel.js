const user =(sequelize, DataTypes)=>{
    const User= sequelize.define('user', {
        userid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: {
                msg:"l'email est déjà utilisé"
            },
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                min:6
            }
        }
        },
        {
            timestamps: true,
            createdAt:true,
            updateAt: 'updateTimestamp'


        }
        );
        User.associate = function(models){
            User.hasMany(models.pay, {
                foreignKey: 'userId',
                sourceKey:'userid'
            });
        }
        return User;
}
module.exports = user;


// const { ValidationError } = require('sequelize');
// const { studentTable } = require("../../db/sequelize");
// const { schoolTable } = require("../../db/sequelize");
// const auth = require('../../middleware/auth');
// const moment = require('moment');

// module.exports = (app) => {
//     app.post("/api/student/createFromSchool/:schoolId", (req, res) => {
//         const Id = req.params.schoolId;




//         const Student = studentTable.create({
//             ...req.body,
//             birthday: moment(req.body.birthday).format(),
//             schoolId: Id
//           });
          
//           Student
//             .then((createdStudent) => {
//               const message = `L'étudiant ${createdStudent.name} a bien été créé`;
//               return res.status(201).json({ message, data: createdStudent });
//             })
//             .catch((err) => {
//               console.error(err);
//               res.status(500).json({ message : "Erreur lors de la création d'un étudiant", err });
//             });
          

//     });
// }