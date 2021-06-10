const router = require('express').Router();
const { UserType } = require('../../models');
const User = require("../../models/User");

// GET route for all users
router.get("/", async (req, res) => {
  
  try {
    
    // Query for all users and saves to variable with raw: true, and excluding password field
    const allUsers = await User.findAll({
      attributes: {
        exclude: ['password']
      },
      raw: true
    });

    // Loops thru the allUsers variable, adds [type] parameter
    // and queries the UserType table for the type name to add to each object
    for (const user of allUsers) {
      user.type = (await UserType.findByPk(user.type_id)).type;
    }

    // Returns with status code 200
    // and displays all users list
    res.status(200).json(allUsers);
    
  } catch (error) {

    // Returns with status code 500
    // and displays error
    res.status(500).json(error);    
  }
});

module.exports = router;