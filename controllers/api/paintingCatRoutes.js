const router = require("express").Router();
const { PaintingCat } = require("../../models");

// GET route for all painting categories
router.get("/", async (req, res) => {

    try {
        
        // Local scope variables
        const paintingCat = await PaintingCat.findAll({ raw: true });

        // Returns with status code 200
        // and displays all paintings categories
        res.status(200).json(paintingCat);

    } catch (error) {
        
        // Returns with status code 500
        // and displays error
        res.status(500).json({ result: "Unable to get all paintings procurements"});
    }
});

module.exports = router;