const users =(sequelize, DataTypes)=>{
    return sequelize.define('User', {
        id: {
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
            unique: false,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
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

