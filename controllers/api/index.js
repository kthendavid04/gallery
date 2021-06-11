const router = require("express").Router();
const userRoutes = require("./userRoutes");
const paintingRoutes = require("./paintingRoutes");

// Creating routes to individual JS files
router.use("/users", userRoutes);
router.use("/paintings", paintingRoutes)

module.exports = router;