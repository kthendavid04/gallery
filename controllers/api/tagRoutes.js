const router = require("express").Router();
const { Tag, Painting } = require("../../models");

// GET route for all tags 
router.get("/", async (req, res) => {

    try {
        
        // Local scope variables
        const tags = await Tag.findAll({
            include: [
                {
                    model: Painting,
                    attributes: {
                        exclude: ["image_data"]
                    }
                }
            ]
        });

        // Returns with status code 200
        // and displays all tags list
        res.status(200).json(tags);

    } catch (error) {
        
        // Returns with status code 500
        // and displays error
        res.status(500).json({ result: "Unable to get all tags"});
    }
});

// GET route for tag by ID
router.get("/:id", async (req, res) => {
    
    try {
        
        // Local scope variables
        const tagId = req.params.id;
        const tag = await Tag.findByPk(tagId, {
            include: [
                {
                    model: Painting,
                    attributes: {
                        exclude: ["image_data"]
                    }
                }
            ],
            where: {
                id: tagId
            }
        });

        // Returns the result, with code 200
        res.status(200).json(tag);

    } catch (error) {
        
        // Returns with status code 500
        // and displays error
        res.status(500).json({ result: "Unable to get tag by ID"});
    }
});

// POST route for adding a single tag
router.post("/", async (req, res) => {

    try {

        // Local scope variables
        const tag = await Tag.create(req.body);

       // Returns code to 200 and displays new tag object
       res.status(200).json(tag);
        
    } catch (error) {

        // Returns with status code 500
        // and displays error
        res.status(500).json({ result: "Unable to add the tag"});
        
    }
});

// PUT route for updating a single tag
router.put("/:id", async (req, res) => {

    try {

        // Local scope variables
        const tagId = req.params.id;
        const tag = await Tag.update(req.body, {
            where: {
                id: tagId
            }
        });

        // Returns the result, with code 200
        res.status(200).json(tag);
        
    } catch (error) {

        // Returns with status code 500
        // and displays error
        res.status(500).json({ result: "Unable to update the tag" });         
    }
});

module.exports = router;