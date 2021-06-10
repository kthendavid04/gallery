const router = require('express').Router();
const { UserType } = require('../../models');
const User = require("../../models/User");

// GET route for all users
router.get("/", async (req, res) => {
  
  try {

    let usersList = [];
    let singleObj = {};
    
    // Query for all users and saves to variable with raw: true, and excluding password field
    const allUsers = await User.findAll({
      attributes: {
        exclude: ['password']
      },
      raw: true
    });

    // Loops thru the allUsers variable, and copies to a new array
    // with the UserType name of the user
    // for (const user of allUsers) {
    //   singleObj.id = user.id;
    //   singleObj.first_name = user.first_name;
    //   singleObj.last_name = user.last_name;
    //   singleObj.email = user.email;
    //   singleObj.address = user.address;
    //   singleObj.bank_info = user.bank_info;
    //   singleObj.type_id = user.type_id;
    //   singleObj.type = (await UserType.findByPk(user.type_id)).type;
    //   singleObj.createdAt = user.createdAt;
    //   singleObj.updatedAt = user.updatedAt;
    //   usersList.push(singleObj);
    // }

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