// const UserType = require("./UserType");
const User = require("./User");
const Painting = require("./Painting");
const PaintingProc = require("./PaintingProc");
const Category = require("./Category");
const PaintingCat = require("./PaintingCat");
const Tag = require("./Tag");
const PaintingTag = require("./PaintingTag");

Painting.belongsToMany(Category, {
    through: "painting_category",
    foreignKey: "painting_id"
});

Category.belongsToMany(Painting, {
    through: "painting_category",
    foreignKey: "category_id"
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