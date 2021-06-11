const router = require("express").Router();
const userTypeRoutes = require("./userTypeRoutes");
const userRoutes = require("./userRoutes");

router.use("/userstypes", userTypeRoutes);
router.use("/users", userRoutes);

module.exports = router;