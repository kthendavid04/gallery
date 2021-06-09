const UserType = require("./UserType");
const User = require("./User");

UserType.hasMany(User, {
    foreignKey: "type_id"
});

User.belongsTo(UserType, {
    foreignKey: "type_id"
});