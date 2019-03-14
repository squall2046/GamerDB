module.exports = function (sequelize, DataTypes) {
  var Favorite = sequelize.define("Favorite",
    {
      Name: {
        type: DataTypes.STRING,
      },
      Platform: {
        type: DataTypes.STRING(10),
      },
      Year_of_Release: {
        type: DataTypes.INTEGER(4),
      },
      Genre: {
        type: DataTypes.STRING(20),
      },
      NA_Sales: {
        type: DataTypes.DECIMAL(10, 2),
      },
      Global_Sales: {
        type: DataTypes.DECIMAL(10, 2),
      },
      Stars: {
        type: DataTypes.DECIMAL(10, 1),
        defaultValue: 0
      },
    },
    {
      timestamps: false
    }
  );

  Favorite.associate = function (models) {
    Favorite.belongsTo(models.Game, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Favorite;
};
