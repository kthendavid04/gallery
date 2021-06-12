const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const { Painting, Category, Tag } = require("../../models");
const { route } = require("./userRoutes");

//#region Multer specific variables
const ulStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "/uploads/");
    },
    filename: (req, file, cb) => {
        const dTim = new Date().toISOString();
        const dTimName = dTim.toString().replace(/:/g, ".");
        cb(null, dTimName + "_" + file.originalname);
    }
});

const ulFilter = (req, file, cb) => {
    
    // Anonymous function local variables
    const fileType = file.mimetype;
    const image = fileType.includes("image");

    // If file is image, upload file
    // otherwise, fail and DO NOT upload file
    if (image) {
        cb(null, true);
    }
    else {
        cb(new Error("File is not a valid image"), false);
    }
};

// limits = [byte -> 1 kb] * [1 kb ->  1 mb] * [# mb]
const upload = multer({
    storage: ulStorage,
    limits: {
        fileSize: 1024 * 1024 * 50
    },
    fileFilter: ulFilter
});
//#endregion

// GET route for all paintings
router.get("/", async (req, res) => {
    
    try {
        
        // Query for all paintings and saves to variable
        const paintings = await Painting.findAll({
            include: [
                {
                    model: Category
                },
                {
                    model: Tag
                }
            ]
        });

        // Downloads data from MySQL painting.image_data and creates file into the uploads folder
        for (const painting of paintings) {
            fs.writeFileSync(__basedir + "/uploads/" + painting.image_name, painting.image_data);

            // Updates variable to instead show the original filename rather than the BLOB binary output
            painting.image_data = "BLOB data - Query by /:id to get the full data of image";
        }

        // Returns with status code 200
        // and displays all paintings list
        res.status(200).json(paintings);

    } catch {
        
        // Returns with status code 500
        // and displays error
        res.status(500).json({ result: "Unable to get all paintings"});
    }
});

// GET route for painting by ID
router.get("/:id", async (req, res) => {

    try {

        // Local scope variables
        const paintingId = req.params.id;
        const indvPainting = await Painting.findByPk(paintingId, {
            where: {
                id: paintingId
            },
            include: [
                {
                    model: Category
                },
                {
                    model: Tag
                }
            ]
        });

        // Downloads data from MySQL painting.image_data and creates file into the uploads folder
        fs.writeFileSync(__basedir + "/uploads/" + indvPainting.image_name, indvPainting.image_data);

        // Returns the result, with code 200
        res.status(200).json(indvPainting);

        // Deletes file downloaded
        // fs.unlinkSync(__basedir + "/uploads/" + indvPainting.image_name);
        
    } catch (error) {

        // Returns with status code 500
        // and displays error
        res.status(500).json({ result: "Unable to get painting by ID" });        
    }
});

// POST single painting
router.post("/", upload.single("image"), async (req, res) => {

    try {

        // Runs insert type based on the POST request body
        const painting = await Painting.create({
            title: req.body.title,
            image_name: req.file.filename,
            image_data: fs.readFileSync(__basedir + "/uploads/" + req.file.filename),
            details: req.body.details,
            created_date: req.body.created_date,
            original_painter: req.body.original_painter,
            current_owner: req.body.current_owner
        });
        
        // Updates variable to instead show the original filename rather than the BLOB output
        painting.get({ plain: true }).image_data = "BLOB data - Query by /:id to get the full data of image";

        // Returns code to 200 and displays new painting object
        res.status(200).json(painting);

        // Deletes the uploaded image from the uploads folder
        // fs.unlinkSync(__basedir + "/uploads/" + req.file.filename);
        
    } catch (error) {
        
        // Returns with status code 500
        // and displays error
        res.status(500).json({ result: "Unable to add the painting"});
    }
});

router.put("/:id", async (req, res) => {

    try {

        // Local scope variables
        const updId = req.params.id;
        const paintingData = await Painting.update(req.body, {
            where: {
                id: updId
            }
        });

        // Returns the result, with code 200
        res.status(200).json(paintingData);
        
    } catch (error) {
        
        // Returns with status code 500
        // and displays error
        res.status(500).json({ result: "Unable to update the painting" });
    }
});

module.exports = router;