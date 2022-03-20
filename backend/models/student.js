module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define("student", {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true
      }, 
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },{timestamps:false});
    return Student;
};