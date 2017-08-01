
module.exports = function(sequelize, DataTypes) {
  var Cal_Events = sequelize.define("Cal_Events", {
    eventName: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    eventDate: {
      type: DataTypes.DATE,
      notEmpty: true,
    }
  });
  Cal_Events.associate = function(models) {
    Cal_Events.belongsTo(models.Teachers, {
      onDelete: "cascade"
    });
  };
  return Cal_Events;
};