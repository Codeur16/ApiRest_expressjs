 const user=require('./userModel');
const student=require('./studentModel');

// const pay =(sequelize, DataTypes)=>{
//     const payement= sequelize.define('payement', 
//     {
//         payid: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         raison: {
//             type: DataTypes.STRING,
//             validate:{
//                 notEmpty:{ msg:"Name can't be empty" }

//             }
//         },
        
//         amount: {
//             type: DataTypes.FLOAT,
//             allowNull: false,
//             validate:{
//                 notEmpty:{ msg:"Password can't be empty" }

//             }
//         },
    
//         userId: {
//             type: DataTypes.INTEGER,
//             references:{
//                 model: 'users', 
//                 key: 'userId' 
//         }
//         },
    
//         studentId: {
//             type: DataTypes.INTEGER,
//             references: {
//                 model:'students', 
//             Key: 'studentid' 
//         }
//         }
//     },
//     {
//             timestamps: true,
//             createdAt:true,
//             updateAt: 'updateTimestamp'


// });
//     payement.associate = models => {
//     payement.belongsTo(models.User, { as: 'user', foreignKey: 'userId', onDelete: 'RESTRICT' });
//     payement.belongsTo(models.Student, { as: 'student', foreignKey: 'studentId', onDelete: 'RESTRICT' });
//   }
//       //  Pay.belongsTo(models.student, { foreignKey: 'studentId' , as:'student'});
//        // }
       
//         return payement;
// }

// module.exports = pay;


const pay =(sequelize, DataTypes)=>{
    const payement = sequelize.define('payement', {
        payementId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users', 
                key: 'userid' 
            }
        },
        studentId: {
            type: DataTypes.INTEGER,
            references: {
                model:'students', 
                key:'studentid' 
            }
        }
       
    }, {
       
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    });
    //foreing key
    payement.associate = function(models){
        payement.belongsTo(models.user, {
            foreignKey: 'userId',
            sourceKey:'userid'
        });
        //user.hasMany(payement);
    };
    payement.associate = function(models){
        payement.belongsTo(models.student, {
            foreignKey:'studentId',
        });
    }
    return payement;
} 




module.exports = pay;

