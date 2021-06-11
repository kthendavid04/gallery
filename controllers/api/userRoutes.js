const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// module.exports = router;
// const { UserType } = require('../../models');
// const User = require("../../models/User");

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
    
  } catch {

    // Returns with status code 500
    // and displays error
    res.status(500).json("Unable to get data");
  }
});

// POST create single user
router.post("/", async (req, res) => {

  try {

    // Variable to create user based on the post request body
    const newUserData = await User.create(req.body, {raw: true});

    // Save to req.session user.id and changed loggedIn to TRUE
    req.session.save(() => {
      req.session.userId = newUserData.id;
      req.session.loggedIn = true;

      // Changes from hashed to text password for returning to user
      newUserData.password = "Saved!";

      // Returns code to 200 and displays new user object
      res.status(200).json(newUserData);
    });
    
  } catch {
    
    // Returns with status code 500
    // and displays error
    res.status(500).json("Please check your input data");
  }
});

module.exports = router;
