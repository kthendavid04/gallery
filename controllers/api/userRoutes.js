const router = require('express').Router();
const User = require("../../models/User");

router.get("/", async (req, res) => {
  
  try {

    const allUsers = await User.findAll({});

    res.status(200).json(allUsers);
    
  } catch (error) {

    res.status(500).json(err);
    
  }

});

module.exports = router;