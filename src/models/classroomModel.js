module.exports = (sequelize, DataTypes) => {
    const classroom = sequelize.define('classroom', {
      classid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      schoolId:{
        type: DataTypes.INTEGER,
        unique:true,
        references:{ 
            model:'schools',
            key: 'schoolid'
        }
    },
    }, {
      timestamps: true
    });
    classroom.associate = (models) => {
      classroom.belongsTo(models.school,{ foreignKey: 'schoolId',   sourceKey: 'schoolid'});
    };
    classroom.associate = (models) => {
        classroom.hasMany(models.student,{ foreignKey: 'studentId',   sourceKey: 'studentid'});
      };

  
    return classroom;
  };