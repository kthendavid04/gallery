const router = require("express").Router();
const { UserType } = require("../../models");

router.get("/", async (req, res) => {
    
    try {
        
        // Query for all user types
        const userType = await UserType.findAll({ raw: true });

        // Returns with status code 200
        // and displays all users types list
        res.status(200).json(userType);
        
    } catch (error) {

        // Returns with status code 500
        // and displays error
        res.status(500).json("Unable to get all user types");
        
    }
});

module.exports = router;