module.exports = function(sequelize, DataTypes) {
  var Dates = sequelize.define('Dates', {
    schoolDates: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true
      },
      unique: true
    }
  });
  Dates.associate = function(models) {
    Dates.hasMany(models.Attendance);
  };
  return Dates;
};