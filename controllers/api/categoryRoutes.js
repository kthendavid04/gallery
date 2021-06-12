const router = require("express").Router();
const { Category } = require("../../models");

// GET route for all categories
router.get("/", async (req, res) => {

    try {
        
        // Local scope variables
        const categories = await Category.findAll({ raw: true});

        // Returns with status code 200
        // and displays all paintings list
        res.status(200).json(categories);

    } catch (error) {
        
        // Returns with status code 500
        // and displays error
        res.status(500).json({ result: "Unable to get all categories"});
    }
});

// GET route for category by ID
router.get("/:id", async (req, res) => {

    try {

        // Local scope variables
        const catId = req.params.id;
        const category = await Category.findByPk(catId, {
            where: {
                id: catId
            }
        });

        // Returns the result, with code 200
        res.status(200).json(category);
        
    } catch (error) {

        // Returns with status code 500
        // and displays error
        res.status(500).json({ result: "Unable to get category by ID" });        
    }
});

// POST route for adding a single category
router.post("/", async (req, res) => {
    
    try {

        // Local scope variables
        const category = await Category.create(req.body);

        // Returns code to 200 and displays new painting object
        res.status(200).json(category);
        
    } catch (error) {

        // Returns with status code 500
        // and displays error
        res.status(500).json({ result: "Unable to add the category"});        
    }
});

// PUT route for updating a single category
router.put("/:id", async (req, res) => {

    try {

        // Local scope variables
        const catId = req.params.id;
        const category = await Category.update(req.body, {
            where: {
                id: catId
            }
        });

        // Returns the result, with code 200
        res.status(200).json(category);
        
    } catch (error) {

        // Returns with status code 500
        // and displays error
        res.status(500).json({ result: "Unable to update the category" });
        
    }
});

module.exports = router;