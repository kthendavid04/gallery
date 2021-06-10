const UserType = require("./UserType");
const User = require("./User");
const Painting = require("./Painting");
const PaintingProc = require("./PaintingProc");
const Category = require("./Category");
const PaintingCat = require("./PaintingCat");

UserType.hasMany(User, {
    foreignKey: "type_id"
});

User.belongsTo(UserType, {
    foreignKey: "type_id"
});

User.hasMany(PaintingProc, {
    foreignKey: "seller_id"
});

User.hasMany(PaintingProc, {
    foreignKey: "buyer_id"
});

PaintingProc.belongsTo(User, {
    foreignKey: "seller_id"
});

PaintingProc.belongsTo(User, {
    foreignKey: "buyer_id"
});

Painting.hasMany(PaintingProc, {
    foreignKey: "painting_id"
})

PaintingProc.belongsTo(Painting, {
    foreignKey: "painting_id"
});

Painting.belongsToMany(Category, {
    through: {
        model: PaintingCat,
        unique:false
    }
});

Category.belongsToMany(Painting, {
    through: {
        model: PaintingCat,
        unique:false
    }
});