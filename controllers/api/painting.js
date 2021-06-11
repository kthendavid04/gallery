const router = require("express").Router();
const { Painting } = require("../../models");

// GET route for all users
router.get("/", async (req, res) => {
    
    try {
        
        // Query for all users and saves to variable with raw: true, and excluding password field
        const paintings = await Painting.findAll({ raw: true });
        
        // Returns with status code 200
        // and displays all users list
        res.status(200).json(paintings);

    } catch {
        
        // Returns with status code 500
        // and displays error
        res.status(500).json("Unable to get all paintings");
    }
});

module.exports = router;