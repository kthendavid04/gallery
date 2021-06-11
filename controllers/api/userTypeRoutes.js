const router = require("express").Router();
const { UserType } = require("../../models");

// GET route for all user types
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

// POST create single user type
router.post("/", async (req, res) => {

    try {

        // Runs a insert query and saves to variable
        const newTypeData = await UserType.create(req.body);

        // Returns code to 200 and displays new user type object
        res.status(200).json(newTypeData);
        
    } catch (error) {
        
        // Returns with status code 500
        // and displays error
        res.status(500).json("Unable to create user type");
    }
});

// PUT route to update single user type
router.put("/:id", async (req, res) => {

    try {

        // Runs a update query and saves to variable with a where clause
        const userTypeData = await UserType.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        
        // Checks if the userTypeData data returned successfully
        if (!userTypeData[0]) {
            res.status(404).json({ message: 'No user type with this id!' });
            return;
        }

        // Returns with status code 200
        // and displays successfully updated
        res.status(200).json("Successfully updated");
        
    } catch (error) {

        // Returns with status code 500
        // and displays error
        res.status(500).json("Unable to update user type");
        
    }
});

module.exports = router;