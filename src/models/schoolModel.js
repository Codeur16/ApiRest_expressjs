const student = require("./studentModel");

const school =(sequelize, DataTypes)=>{
    const School= sequelize.define('school', {
        schoolid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(500),
            unique:{ true:{
                msg:"Cet eleve existe deja !!!"
            }
            },
            allowNull:false,
            validate:{
                notEmpty:{ msg:"Name can't be empty" }

            }
        },
        
        adresse: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false,
            validate:{
                notEmpty:{ msg:"Password can't be empty" }

            }
            
        
        }
    },
        {
            timestamps: true,
            createdAt:true,
            updateAt: 'updateTimestamp',
            // options: {
            //     include: [
            //         {
            //             model: student,
            //             associationOptions: {
            //                 foreignKey: 'schoolid',
            //             }
            //         },
            //         // Other associations...
            //     ]
            // }



        }
    );
    School.associate = (models) => {
        School.hasMany( models.student, { foreignKey: 'schoolId',  sourceKey: 'schoolid' });
      };
    return School;

}
module.exports = school;

