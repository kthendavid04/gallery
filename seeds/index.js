const sequelize = require('../config/connection');
const userData = require("./userData.json");
const { User, Painting, PaintingProc } = require("../models");

const seedAll = async () => {
  
  await sequelize.sync({ force: true });

  // Create all users
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
  });

  process.exit(0);
};

seedAll();