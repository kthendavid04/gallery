const router = require("express").Router();
const { PaintingProc } = require("../../models");

// GET route for all procurements table
router.get("/", async (req, res) => {

    try {
        
        // Query for all paintings procurements and save results to variable
        const procurements = await PaintingProc.findAll({ raw: true});

        // Returns with status code 200
        // and displays all paintings list
        res.status(200).json(procurements);
        
    } catch (error) {
        
        // Returns with status code 500
        // and displays error
        res.status(500).json({ result: "Unable to get all paintings procurements"});
    }
});

module.exports = router;