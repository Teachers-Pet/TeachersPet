module.exports = function(sequelize, DataTypes) {
  var Students = sequelize.define("Students", {
    name: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    email: {
      type: DataTypes.STRING,
      notEmpty: true,
      validate: {
        isEmail: true
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      notEmpty: true
    }
  });
  Students.associate = function(models) {
    Students.belongsTo(models.Teachers, {
      onDelete: "cascade"
    });
    Students.hasMany(models.Grades, {
      onDelete: "cascade"
    });
    Students.hasMany(models.Attendance, {
      onDelete: "cascade"
    });
  };
  return Students;
};
