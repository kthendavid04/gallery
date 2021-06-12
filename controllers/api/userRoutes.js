const router = require("express").Router();
const { User, Painting } = require("../../models");

// GET route for all users
router.get("/", async (req, res) => {
  
  try {

    // Query for all users and saves to variable and excluding password field
    const users = await User.findAll({
      attributes: {exclude: ["password"]},
      include: [
        {
          model: Painting,
          attributes: {
            exclude: ["image_data"]
          }
        }
      ]
    });

    // Returns with status code 200
    // and displays all users list
    res.status(200).json(users);
    
  } catch {

    // Returns with status code 500
    // and displays error
    res.status(500).json({result: "Unable to get all users"});
  }
});

// POST create single user
router.post("/", async (req, res) => {

  try {

    // Variable to create user based on the post request body
    const user = await User.create(req.body);

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
    res.status(500).json({ result: "Unable to create user"});
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
    res.status(500).json({ result: "Unable to login" });
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

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
      req.session.destroy(() => {
          res.status(204).end();
      });
  } else {
      res.status(404).end();
  }
});

module.exports = router;