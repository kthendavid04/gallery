const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);

module.exports = router;
const router = require("express").Router();
const userRoutes = require("./userRoutes");
// const gallaryRoutes = require("./gallaryRoutes");
// const paintingRoutes = require("./paintingsRoutes");


router.use("/users", userRoutes);
// router.use("/paintings", paintingsRoutes);
// router.use("/gallary", gallaryRoutes);

module.exports = router;
