const sequelize = require('../config/connection');
const seedGallery = require('./galleryData');
const seedPaintings = require('./paintingData');

const { User, UserType } = require("../models");
const userTypeData = require("./userType.json");
const userData = require("./userData.json");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  // await seedGallery();

  // await seedPaintings();

  // const users = await User.bulkCreate(userData, {
  //   individualHooks: true,
  //   returning: true
  // });
  
  const userType = await UserType.bulkCreate(userTypeData, {
    returning: true
  });

  for (const user of userData) {
    await User.create({
      ...user,
      type_id: userType[Math.floor(Math.random() * userType.length)].id
    });
  }

  process.exit(0);
};

seedAll();