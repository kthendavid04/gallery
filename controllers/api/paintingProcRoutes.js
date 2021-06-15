const router = require("express").Router();
const sequelize = require("../../config/connection");
const { PaintingProc, User, Painting } = require("../../models");


// GET route for all procurements table
router.get("/", async (req, res) => {

    try {
        
        // Query for all paintings procurements and save results to variable
        const procurements = await PaintingProc.findAll({
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
        // and displays all paintings list
        res.status(200).json(procurements);
        
    } catch (error) {
        
        // Returns with status code 500
        // and displays error
        res.status(500).json({ result: "Unable to get all paintings procurements"});
    }
});

// GET route for painting procurement by ID
router.get("/:id", async (req, res) => {

    try {
        
        // Local scope variables
        const procId = req.params.id;
        const indvProc = await PaintingProc.findByPk(procId, {
            where: {
                id: procId
            }
        });

        // Returns the result, with code 200
        res.status(200).json(indvProc);

    } catch (error) {

        // Returns with status code 500
        // and displays error
        res.status(500).json({ result: "Unable to get painting procurement by ID" });
    }
});

// POST route for adding a single procurement entry
router.post("/", async (req, res) => {

    try {

        // Local scope variables
        const painting = await PaintingProc.create(req.body);

        // Returns code to 200 and displays new painting object
        res.status(200).json(painting);
        
    } catch (error) {

        // Returns with status code 500
        // and displays error
        res.status(500).json({ result: "Unable to add the painting procurement"});        
    }
});

// PUT route for updating a single procument entry
router.put("/:id", async (req, res) => {

    try {

        // Local scope variables
        const updId = req.params.id;
        const procurement = await PaintingProc.update(req.body, {
            where: {
                id: updId
            }
        });

        // Returns the result, with code 200
        res.status(200).json(procurement);
        
    } catch (error) {
        
        // Returns with status code 500
        // and displays error
        res.status(500).json({ result: "Unable to update the painting procurement" });
    }

});

module.exports = router;