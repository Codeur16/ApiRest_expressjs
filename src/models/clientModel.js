const client =(sequelize, DataTypes)=>{
    return sequelize.define('client', {
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
            createAt:'create'

        }
        );
}

module.exports = client;