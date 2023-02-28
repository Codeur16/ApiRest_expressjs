const users =(sequelize, DataTypes)=>{
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:{ msg:"Name can't be empty" }

            }
        },
        email: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: true,
            validate:{
                notEmpty:{ msg:"Email can't be empty" }

            }
        
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty:{ msg:"Password can't be empty" }

            }
        
        }
        },
        {
            timestamps: true,
            createAt:'create',
            updatAt: 'update'


        }
    );

}
module.exports = users;

