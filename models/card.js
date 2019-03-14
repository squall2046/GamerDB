module.exports = function (sequelize, DataTypes) {
  var Card = sequelize.define("Card",
    {
      UserId: {
        type: DataTypes.STRING(20),
        defaultValue: null
      },
      Comment: {
        type: DataTypes.TEXT,
        defaultValue: null
      },
    },
    {
      timestamps: false
    }
  );

  Card.associate = function (models) {
    Card.belongsTo(models.Game, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Card;
};
