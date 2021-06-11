const sequelize = require('../config/connection');
const userData = require("./userData.json");
const { User, Painting, PaintingProc } = require("../models");

const seedAll = async () => {
    
    await sequelize.sync({ force: false });
    
    const users = await User.findAll({
        attributes: ["id"],
        raw: true
    });

    const paintings = await Painting.findAll({
        attributes: ["id"],
        raw: true
    });

    for (const painting of paintings) {

        await PaintingProc.create({
            seller_id: users[Math.floor(Math.random() * users.length)].id,
            buyer_id: users[Math.floor(Math.random() * users.length)].id,
            painting_id: paintings[Math.floor(Math.random() * paintings.length)].id,
            start_date: "2021-01-01",
            end_date: null,
            price: Math.floor(Math.random() * (1000000.00 - 1.00 + 1.00)) + 1.00
        });

    }    
    
    process.exit(0);
};

seedAll();