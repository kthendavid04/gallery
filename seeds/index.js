const sequelize = require('../config/connection');
const seedGallery = require('./galleryData');
const seedPaintings = require('./paintingData');

const { User } = require("../models");
const userData = require("./userData.json");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  // await seedGallery();

  // await seedPaintings();

  for (const user of userData) {
    await User.create({
      ...user
    });
  }

  process.exit(0);
};

seedAll();