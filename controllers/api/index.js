const router = require("express").Router();
// const userTypeRoutes = require("./userTypeRoutes");
const userRoutes = require("./userRoutes");
const paintingRoutes = require("./painting");

// router.use("/userstypes", userTypeRoutes);
router.use("/users", userRoutes);
router.use("/paintings", paintingRoutes)

module.exports = router;