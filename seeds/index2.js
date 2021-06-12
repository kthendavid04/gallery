const sequelize = require('../config/connection');
const categoryData = require("./categoryData.json");
const { User, Painting, PaintingProc, Category, PaintingCat } = require("../models");

const seedAll = async () => {
    
    await sequelize.sync({ force: false });
    
    // const users = await User.findAll({
    //     attributes: ["id"],
    //     raw: true
    // });

    // const paintings = await Painting.findAll({
    //     attributes: ["id"],
    //     raw: true
    // });

    // for (const painting of paintings) {

    //     await PaintingProc.create({
    //         seller_id: users[Math.floor(Math.random() * users.length)].id,
    //         buyer_id: users[Math.floor(Math.random() * users.length)].id,
    //         painting_id: paintings[Math.floor(Math.random() * paintings.length)].id,
    //         start_date: "2021-01-01",
    //         end_date: null,
    //         price: Math.floor(Math.random() * (1000000.00 - 1.00 + 1.00)) + 1.00
    //     });
    // }

    // const categories = await Category.bulkCreate(categoryData);

    // for (const category of categories) {
        
    //     await PaintingCat.create({
    //         painting_id: paintings[Math.floor(Math.random() * paintings.length)].id,
    //         category_id: categories[Math.floor(Math.random() * categories.length)].id
    //     });
    // }
    
    process.exit(0);
};

seedAll();