const router = require("express").Router();

const userRoutes = require("./userRoutes");
const paintingRoutes = require("./paintingRoutes");
const paintingProcRoutes = require("./paintingProcRoutes");
const categoryRoutes = require("./categoryRoutes");
const paintingCatRoutes = require("./paintingCatRoutes");

// Creating routes to individual JS files
router.use("/users", userRoutes);
router.use("/paintings", paintingRoutes);
router.use("/paintingprocs", paintingProcRoutes);
router.use("/categories", categoryRoutes);
router.use("/paintingcat", paintingCatRoutes);

module.exports = router;