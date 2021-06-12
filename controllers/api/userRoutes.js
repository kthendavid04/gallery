const router = require("express").Router();
const { User } = require("../../models");

// GET route for all users
router.get("/", async (req, res) => {
  
  try {

    let usersList = [];
    let singleObj = {};
    
    // Query for all users and saves to variable with raw: true, and excluding password field
    const users = await User.findAll({
      attributes: {
        exclude: ["password"]
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
    res.status(200).json(users);
    
  } catch {

    // Returns with status code 500
    // and displays error
    res.status(500).json("Unable to get all users");
  }
});

// POST create single user
router.post("/", async (req, res) => {

  try {

    // Variable to create user based on the post request body
    const user = await User.create(req.body, {raw: true});

    // Save to req.session user.id and changed loggedIn to TRUE
    req.session.save(() => {
      req.session.userId = user.id;
      req.session.loggedIn = true;

      // Changes from hashed to text password for returning to user
      user.password = "Saved!";

      // Returns code to 200 and displays new user object
      res.status(200).json(user);
    });
    
  } catch {
    
    // Returns with status code 500
    // and displays error
    res.status(500).json("Unable to create user");
  }
});

router.post("/login", async (req, res) => {
  
  try {

    // Variables queries database
    const userLogin = await User.findOne({
      attributes: {
        exclude: ["password"]
      },
      where: {
        email: req.body.email
      }
    });

    // Checks userLogin returns valid information
    if (!userLogin) {
      res
      .status(400)
      .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    // Save to req.session user.id and changed loggedIn to TRUE
    req.session.save(() => {
      req.session.userId = userLogin.id;
      req.session.loggedIn = true;
      
      // Returns code to 200 and displays new user object
      res.status(200).json({ user: userLogin, message: "You are now logged in!" });
    });
    
  } catch (error) {
    
    // Returns with status code 500
    // and displays error
    res.status(500).json("Unable to login");

  }
});

// PUT route to update single user
router.put("/:id", async (req, res) => {
  
  try {

    // Runs a update query and saves to variable with a where clause
    const user = await User.update(req.body, {
      attributes: {
        exclude: ["password"]
      },
      where: {
        id: req.params.id
      }
    });

    console.log(user);

    // Checks if the user data returned successfully
    if (user == 0) {
      res.status(404).json({ result: "No user with this id: " + req.params.id  });
      return;
    }

    // Returns with status code 200
    // and displays successfully updated
    res.status(200).json({ result: "Success" });
    
  } catch (error) {

    // Returns with status code 500
    // and displays error
    res.status(500).json({ result: "Failed" });
    
  }
});

module.exports = router;