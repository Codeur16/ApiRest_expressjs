const school = require('./schoolModel');

const student =(sequelize, DataTypes)=>{
    const Student= sequelize.define('student', {
        studentid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },   
        name: {
            type: DataTypes.STRING(500),
            unique: false,
            allowNull:false,
            validate:{
                notEmpty:{ msg:"Name can't be empty" }

            }
        },
        
        class: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false,
            validate:{
                notEmpty:{ msg:"Password can't be empty" }

            }
            
        
        },
        sex: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false,
            validate:{
                notEmpty:{ msg:"Password can't be empty" }

            }
            
        
        },
        birthday: {
            type: DataTypes.DATEONLY ,
            unique: false,
            allowNull: false,
            validate:{
                notEmpty:{ msg:"Email can't be empty" }

            }
        
        },
        birth_place: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false,
            validate:{
                notEmpty:{ msg:"Password can't be empty" }

            }
        },
        phone: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: true
        },
        school_situation: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false,
            validate:{
                notEmpty:{ msg:"Password can't be empty" }

            }
        },
        class_situation: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false,
            validate:{
                notEmpty:{ msg:"Password can't be empty" }

            }
        },
        schoolId:{
            type: DataTypes.INTEGER,
            unique:false,
            references:{ 
                model:'schools',
                key: 'schoolid'
            }
        } 
    },
        {
            timestamps: true,
            createdAt:true,
            updateAt: 'updateTimestamp',    
        }
    );
    Student.associate = (models) => {
         Student.belongsTo( models.school, { foreignKey: 'schoolId',   sourceKey: 'schoolid' });
    };
    Student.associate = function(models){
        Student.hasMany(models.pay, {
            foreignKey: 'studentId',
            sourceKey:'studentid'
        });
    }
   
    return Student;

}
module.exports= student;

