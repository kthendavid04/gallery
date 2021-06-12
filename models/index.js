// const UserType = require("./UserType");
const User = require("./User");
const Painting = require("./Painting");
const PaintingProc = require("./PaintingProc");
const Category = require("./Category");
const PaintingCat = require("./PaintingCat");
const Tag = require("./Tag");
const PaintingTag = require("./PaintingTag");

User.belongsToMany(Painting, {
    through: {
        model: PaintingProc,
        unique: false,
    },
    foreignKey: "seller_id"
});

User.belongsToMany(Painting, {
    through: {
        model: PaintingProc,
        unique: false,
    },
    foreignKey: "buyer_id"
});

Painting.belongsToMany(User, {
    through: {
        model: PaintingProc,
        unique: false,
    },
    foreignKey: "painting_id"
});

Painting.belongsToMany(Category, {
    through: {
        model: PaintingCat,
        unique: false
    },
    foreignKey: "painting_id"
});

Category.belongsToMany(Painting, {
    through: {
        model: PaintingCat,
        unique: false
    },
    foreignKey: "category_id"
});

Painting.belongsToMany(Tag, {
    through: {
        model: PaintingTag,
        unique: false
    },
    foreignKey: "painting_id"
});

Tag.belongsToMany(Painting, {
    through: {
        model: PaintingTag,
        unique: false
    },
    foreignKey: "tag_id"
});

module.exports = {
    User,
    Painting,
    PaintingProc,
    Category,
    PaintingCat,
    Tag,
    PaintingTag
};