const router = require("express").Router();
const userRoutes = require("./userRoutes");
const paintingRoutes = require("./paintingRoutes");
const paintingProcRoutes = require("./paintingProcRoutes");

// Creating routes to individual JS files
router.use("/users", userRoutes);
router.use("/paintings", paintingRoutes);
router.use("/paintingprocs", paintingProcRoutes);

module.exports = router;