module.exports = function (sequelize, DataTypes) {
  var Game = sequelize.define("Game",
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
      isFav: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
      },
    },
    {
      timestamps: false
    }
  );

  Game.associate = function (models) {
    Game.hasMany(models.Favorite),
    Game.hasMany(models.Card)
  };

  return Game;
};
