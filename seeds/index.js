const sequelize = require("../config/connection");
const fs = require("fs");
const userData = require("./userData.json");
const paintingData = require("./paintingData.json");
const categoryData = require("./categoryData.json");
const tagData = require("./tagData.json");
const dTim = new Date().toISOString();
const dTimName = dTim.toString().replace(/:/g, ".");

const { User, Painting, PaintingProc, Category, PaintingCat, Tag, PaintingTag } = require("../models");

const seedAll = async () => {
  
  await sequelize.sync({ force: true });

  // Create all users
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
  });

  // Create all paintings
  for (const painting of paintingData) {

    await Painting.create({
      title: painting.title,
      image_name: dTimName + "_" + painting.image_name,
      image_data: fs.readFileSync(__dirname + "/" + painting.image_data),
      details: painting.details,
      selling: painting.selling,
      created_date: painting.created_date,
      original_painter: users[Math.floor(Math.random() * users.length)].id,
      current_owner: users[Math.floor(Math.random() * users.length)].id
    });
  }

  // Query for all paintings ID
  const paintings = await Painting.findAll({ attributes: ["id"] });
  let paintingNewid = 1;

  // Creates all the painting procurements
  for (const painting of paintings) {

    console.log(paintingNewid);
    
    await PaintingProc.create({
        seller_id: users[Math.floor(Math.random() * users.length)].id,
        buyer_id: null,
        painting_id: paintingNewid,
        start_date: "2021-01-01",
        end_date: null,
        price: Math.floor(Math.random() * (1000000.00 - 1000.00 + 1000.00)) + 1000.00
    });

    paintingNewid++;
  }

  // Create all categories
  const categories = await Category.bulkCreate(categoryData);

  // Create all painting categories mix
  for (const category of categories) {

    await PaintingCat.create({
      painting_id: paintings[Math.floor(Math.random() * (paintings.length - 1) + 1)].id,
      category_id: categories[Math.floor(Math.random() * (categories.length - 1) + 1)].id
    });
  }

  const tags = await Tag.bulkCreate(tagData);

  // Create all painting tags mix
  for (const tag of tags) {

    await PaintingTag.create({
      painting_id: paintings[Math.floor(Math.random() * paintings.length)].id,
      tag_id: tags[Math.floor(Math.random() * tags.length)].id
    });
  }
  
  process.exit(0);
};

seedAll();