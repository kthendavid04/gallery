const router = require("express").Router();
const { Op } = require("sequelize");
const fs = require("fs");
const { User, Painting, PaintingProc, Category, PaintingCat, Tag, PaintingTag } = require("../models");
const withAuth = require("../utils/auth");
const redirect = require("../utils/redirect");

// GET route for the homepage
router.get("/", async (req, res) => {
  
  try {

    // Renders the homepage handlebar
    res.render("homepage", { loggedIn: req.session.loggedIn, homepageAct: true, galleryAct: false, teamAct: false });

  } catch (error) {

    // Returns with status code 500
    // and displays error
    res.status(500).json(error);
  }
});

// GET route for the gallery page, default displays newest to oldest
router.get("/gallery", async (req, res) => {
  
  try {

    // Local scope variables
    const currentUser = req.session.hasOwnProperty("userId") ? req.session.userId : 0;
    const paintings = await Painting.findAll({
      include: [
        {
          model: PaintingProc,
          include: [
            {
              model: User,
              as: 'seller',
              attributes:
              {
                exclude: ["email", "password", "address", "bank_info","createdAt", "updatedAt"]
              }
            },
            {
              model: User,
              as: 'buyer',
              attributes:
              {
                exclude: ["email", "password", "address", "bank_info","createdAt", "updatedAt"]
              }
            },
          ],
          where: {
            seller_id: {
              [Op.ne]: currentUser
            },
            buyer_id: null,
            end_date: null
          }
        },
        {
          model: Category,
          attributes: ["category_name"],
          through: { attributes: [] }
        },
        {
          model: Tag,
          attributes: ["tag_name"],
          through: { attributes: [] }
        }
      ],
      order: [
        ["created_at", "DESC"]
      ],
    });
    
    // Downloads data from MySQL painting.image_data and creates file into the uploads folder
    // Updates the original_painter property rather than ID, to first and last name
    // Updates the image_data from BLOB binary to an actual static path
    for (const painting of paintings) {
      fs.writeFileSync(__basedir + "/uploads/" + painting.image_name, painting.image_data);
      let painterName = await User.findByPk(painting.original_painter, { attributes: ["first_name", "last_name"] });
      painting.original_painter = painterName.first_name + " " + painterName.last_name;
      painting.image_data = "/uploads/" + painting.image_name;
    }
    
    // Copies paintings into allPaintings with serialize data
    const allPaintings = paintings.map((painting) => painting.get({plain: true}));

    // Goes to Gallery handlebar, and pass paintings
    res.render("gallery", { paintings: allPaintings, loggedIn: req.session.loggedIn, isSelling: true, homepageAct: false, galleryAct: true, teamAct: false });

  } catch (error) {

    // Returns with status code 500
    // and displays error
    res.status(500).json(error);
  }
});

// GET route for gallery oldest, displays arts from old -> newest
router.get("/gallery/oldest", async (req, res) => {
  
  try {

    // Local scope variables
    const currentUser = req.session.hasOwnProperty("userId") ? req.session.userId : 0;
    const paintings = await Painting.findAll({
      include: [
        {
          model: PaintingProc,
          include: [
            {
              model: User,
              as: 'seller',
              attributes:
              {
                exclude: ["email", "password", "address", "bank_info","createdAt", "updatedAt"]
              }
            },
            {
              model: User,
              as: 'buyer',
              attributes:
              {
                exclude: ["email", "password", "address", "bank_info","createdAt", "updatedAt"]
              }
            },
          ],
          where: {
            seller_id: {
              [Op.ne]: currentUser
            },
            buyer_id: null,
            end_date: null
          }
        },
        {
          model: Category,
          attributes: ["category_name"],
          through: { attributes: [] }
        },
        {
          model: Tag,
          attributes: ["tag_name"],
          through: { attributes: [] }
        }
      ],
      order: [
        ["created_at", "ASC"]
      ],
    });

    // Downloads data from MySQL painting.image_data and creates file into the uploads folder
    // Updates the original_painter property rather than ID, to first and last name
    // Updates the image_data from BLOB binary to an actual static path
    for (const painting of paintings) {
      fs.writeFileSync(__basedir + "/uploads/" + painting.image_name, painting.image_data);
      let painterName = await User.findByPk(painting.original_painter, { attributes: ["first_name", "last_name"] });
      painting.original_painter = painterName.first_name + " " + painterName.last_name;
      painting.image_data = "/uploads/" + painting.image_name;
    }

    // Copies paintings into allPaintings with serialize data
    const allPaintings = paintings.map((painting) => painting.get({plain: true}));

    // Goes to Gallery handlebar, and pass paintings
    res.render("galleryOldest", { paintings: allPaintings, loggedIn: req.session.loggedIn, isSelling: true, homepageAct: false, galleryAct: true, teamAct: false });

  } catch (error) {

    // Returns with status code 500
    // and displays error
    res.status(500).json(error);
  }
});

// GET route for gallery category, using middleware [redirect]
// in case users try to access the site, future implementation
router.get("/gallery/category", redirect, async (req, res) => {
  try {
    res.render("galleryCategory", { loggedIn: req.session.loggedIn });
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET route for gallery tags, uusing middleware [redirect]
// in case users try to access the site, future implementation
router.get("/gallery/tag", redirect, async (req, res) => {
  try {
    res.render("galleryTag", { loggedIn: req.session.loggedIn });
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET route for gallery pricelowtohigh, displays arts from low -> high
router.get("/gallery/pricelowtohigh", async (req, res) => {
  
  try {
    
    // Local scope variables
    const currentUser = req.session.hasOwnProperty("userId") ? req.session.userId : 0;
    const paintings = await Painting.findAll({
      include: [
        {
          model: PaintingProc,
          include: [
            {
              model: User,
              as: 'seller',
              attributes:
              {
                exclude: ["email", "password", "address", "bank_info","createdAt", "updatedAt"]
              }
            },
            {
              model: User,
              as: 'buyer',
              attributes:
              {
                exclude: ["email", "password", "address", "bank_info","createdAt", "updatedAt"]
              }
            },
          ],
          where: {
            seller_id: {
              [Op.ne]: currentUser
            },
            buyer_id: null,
            end_date: null
          }
        },
        {
          model: Category,
          attributes: ["category_name"],
          through: { attributes: [] }
        },
        {
          model: Tag,
          attributes: ["tag_name"],
          through: { attributes: [] }
        }
      ],
      order: [
        [PaintingProc, "price", "asc"]
      ]
    });

    // Downloads data from MySQL painting.image_data and creates file into the uploads folder
    // Updates the original_painter property rather than ID, to first and last name
    // Updates the image_data from BLOB binary to an actual static path
    for (const painting of paintings) {
      fs.writeFileSync(__basedir + "/uploads/" + painting.image_name, painting.image_data);
      let painterName = await User.findByPk(painting.original_painter, { attributes: ["first_name", "last_name"] });
      painting.original_painter = painterName.first_name + " " + painterName.last_name;
      painting.image_data = "/uploads/" + painting.image_name;
    }
 
      // Copies paintings into allPaintings with serialize data
      const allPaintings = paintings.map((painting) => painting.get({plain: true}));

      // Goes to Gallery handlebar, and pass paintings
      res.render("galleryLow", { paintings: allPaintings, loggedIn: req.session.loggedIn, isSelling: true, homepageAct: false, galleryAct: true, teamAct: false });
    
  } catch (error) {

    // Returns with status code 500
    // and displays error
    res.status(500).json(error);
  }
});

// GET route for gallery pricehightolow, displays arts from high -> low
router.get("/gallery/pricehightolow", async (req, res) => {
  
  try {

    // Local scope variables
    const currentUser = req.session.hasOwnProperty("userId") ? req.session.userId : 0;
    const paintings = await Painting.findAll({
      include: [
        {
          model: PaintingProc,
          include: [
            {
              model: User,
              as: 'seller',
              attributes:
              {
                exclude: ["email", "password", "address", "bank_info","createdAt", "updatedAt"]
              }
            },
            {
              model: User,
              as: 'buyer',
              attributes:
              {
                exclude: ["email", "password", "address", "bank_info","createdAt", "updatedAt"]
              }
            },
          ],
          where: {
            seller_id: {
              [Op.ne]: currentUser
            },
            buyer_id: null,
            end_date: null
          }
        },
        {
          model: Category,
          attributes: ["category_name"],
          through: { attributes: [] }
        },
        {
          model: Tag,
          attributes: ["tag_name"],
          through: { attributes: [] }
        }
      ],
      order: [
        [PaintingProc, "price", "desc"]
      ]
    });

    // Downloads data from MySQL painting.image_data and creates file into the uploads folder
    // Updates the original_painter property rather than ID, to first and last name
    // Updates the image_data from BLOB binary to an actual static path
    for (const painting of paintings) {
      fs.writeFileSync(__basedir + "/uploads/" + painting.image_name, painting.image_data);
      let painterName = await User.findByPk(painting.original_painter, { attributes: ["first_name", "last_name"] });
      painting.original_painter = painterName.first_name + " " + painterName.last_name;
      painting.image_data = "/uploads/" + painting.image_name;
    }

    // Copies paintings into allPaintings with serialize data
    const allPaintings = paintings.map((painting) => painting.get({plain: true}));

    // Renders the handlebar
    res.render("galleryHigh", { paintings: allPaintings, loggedIn: req.session.loggedIn, isSelling: true, homepageAct: false, galleryAct: true, teamAct: false });

  } catch (error) {

    // Returns with status code 500
    // and displays error
    res.status(500).json(error);
  }
});

// GET route for gallery artist, using middleware [redirect]
// in case users try to access the site, future implementation
router.get("/gallery/artistname", redirect, async (req, res) => {
  try {
    res.render("galleryArtist", { paintings: allPaintings, loggedIn: req.session.loggedIn });
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET route for gallery artwork name, using middleware [redirect]
// in case users try to access the site, future implementation
router.get("/gallery/artworkname", redirect, async (req, res) => {
  try {
    res.render("galleryArtwork", { loggedIn: req.session.loggedIn });
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET route to have users signup for an account
router.get("/signup", async (req, res) => {
  try {

    // Renders handlebar
    res.render("signup", { loggedIn: req.session.loggedIn });

  } catch (error) {

    // Returns with status code 500
    // and displays error
    res.status(500).json(error);
  }
});

// GET route to take logged in user to their personal profile
router.get("/profile", withAuth, async (req, res) => {
  
  try {

    // Local scope variables
    const dbUserData = await User.findOne({ where: {id: req.session.userId}})
    const user = dbUserData.get({ plain: true });

    // Renders handlebar
    res.render("profile", { user, loggedIn: req.session.loggedIn });

  } catch (error) {

    // Returns with status code 500
    // and displays error
    res.status(500).json(error);
  }
});

// GET route to take logged in users to post a new art piece
router.get("/profile/newart", withAuth, async (req, res) => {
  
  try {

    // Renders handlebar
    res.render("profileNewArt", { loggedIn: req.session.loggedIn });

  } catch (error) {

    // Returns with status code 500
    // and displays error
    res.status(500).json(error);
  }
});

// GET route to take logged in users to view their current arts for sale
router.get("/profile/listed", withAuth, async (req, res) => {
  
  try {

    // Local scope variables
    const listedPaintings = await Painting.findAll({
      include: [
        {
          model: PaintingProc,
          where: {
            buyer_id: null,
            end_date: null
          }
        }
      ],
      where: {
        current_owner: req.session.userId,
        selling: true
      }
    });

    // Downloads data from MySQL painting.image_data and creates file into the uploads folder
    // Updates the original_painter property rather than ID, to first and last name
    // Updates the image_data from BLOB binary to an actual static path
    for (const painting of listedPaintings) {
      fs.writeFileSync(__basedir + "/uploads/" + painting.image_name, painting.image_data);
      let painterName = await User.findByPk(painting.original_painter, { attributes: ["first_name", "last_name"] });
      painting.original_painter = painterName.first_name + " " + painterName.last_name;
      painting.image_data = "/uploads/" + painting.image_name;
    }

    // Copies listedPaintings into paintings with serialize data
    const paintings = listedPaintings.map((painting) => painting.get({plain: true}));

    // Renders handlebar
    res.render("profileListed", { paintings: paintings, loggedIn: req.session.loggedIn });

  } catch (error) {

    // Returns with status code 500
    // and displays error
    res.status(500).json(error);
  }
});

// GET route to take logged in users to view all their purchases
router.get("/profile/purchased", withAuth, async (req, res) => {
  
  try {

    // Local scope variables
    const purchased = await Painting.findAll({
      include: [
        {
          model: PaintingProc,
          where: {
            buyer_id: req.session.userId
          }
        }
      ],
      where: {
        current_owner: req.session.userId
      }
    });

    // Downloads data from MySQL painting.image_data and creates file into the uploads folder
    // Updates the original_painter property rather than ID, to first and last name
    // Updates the image_data from BLOB binary to an actual static path
    for (const painting of purchased) {
      fs.writeFileSync(__basedir + "/uploads/" + painting.image_name, painting.image_data);
      let painterName = await User.findByPk(painting.original_painter, { attributes: ["first_name", "last_name"] });
      painting.original_painter = painterName.first_name + " " + painterName.last_name;
      painting.image_data = "/uploads/" + painting.image_name;
    }

    // Copies purchased into paintings with serialize data
    const paintings = purchased.map((painting) => painting.get({plain: true}));

    // Renders handlebars
    res.render("profilePurchased", { paintings, loggedIn: req.session.loggedIn });

  } catch (error) {

    // Returns with status code 500
    // and displays error
    res.status(500).json(error);
  }
});

// GET route to take logged in users to view all their sold art
router.get("/profile/sold", withAuth, async (req, res) => {

  try {
    
    // Local scope variables
    const paintingsSold = await Painting.findAll({
      include: [
        {
          model: PaintingProc,
          where: {
            seller_id: req.session.userId,
            buyer_id: { [Op.ne]: null }
          }
        }
      ]
    });

    // Downloads data from MySQL painting.image_data and creates file into the uploads folder
    // Updates the original_painter property rather than ID, to first and last name
    // Updates the image_data from BLOB binary to an actual static path
    for (const painting of paintingsSold) {
      fs.writeFileSync(__basedir + "/uploads/" + painting.image_name, painting.image_data);
      let painterName = await User.findByPk(painting.original_painter, { attributes: ["first_name", "last_name"] });
      painting.original_painter = painterName.first_name + " " + painterName.last_name;
      painting.image_data = "/uploads/" + painting.image_name;
    }

    // Copies paintingsSold into paintings with serialize data
    const paintings = paintingsSold.map((painting) => painting.get({plain: true}));

    // Renders handlebar
    res.render("profileSold", {paintings, isSelling: false, loggedIn: req.session.loggedIn });

  } catch (error) {

    // Returns with status code 500
    // and displays error
    res.status(500).json(error);
  }
});

// GET route to take logged in users to view the individual art for sale
router.get("/sale/:id", withAuth, async (req, res) => {
  
  try {

    // Local scope variables
    const userId = req.session.userId;
    const paintingId = req.params.id;
    const buyerInfo = await User.findByPk(userId, { attributes: ["id", "first_name", "last_name", "address"] });
    const paintingData = await Painting.findByPk(paintingId, {
      include: [
        {
          model: PaintingProc,
          include: [
            {
              model: User,
              as: 'seller',
              attributes:
              {
                exclude: ["email", "password", "address", "bank_info","createdAt", "updatedAt"]
              }
            },
          ]
        },
      ]
    });
    const artistData = await User.findByPk(paintingData.original_painter, {attributes: ["first_name", "last_name"]});

    // Downloads data from MySQL painting.image_data and creates file into the uploads folder
    fs.writeFileSync(__basedir + "/uploads/" + paintingData.image_name, paintingData.image_data);

    // Updates the image_data from BLOB binary to an actual static path
    paintingData.image_data = "/uploads/" + paintingData.image_name;

    // Copies the sql query results plain
    const buyer = buyerInfo.get({plain: true})
    const painting = paintingData.get({plain: true});
    const artist = artistData.get({plain: true});

    // Renders handlebar
    res.render('sale', { buyer, painting, artist, loggedIn: req.session.loggedIn });
    
  } catch (error) {

    // Returns with status code 500
    // and displays error
    res.status(500).json(error);
  }
});

// GET route to show the team members of the project
router.get("/meet", async (req, res) => {
  
  try {

    // Renders handlebar
    res.render('meet', { loggedIn: req.session.loggedIn, homepageAct: false, galleryAct: false, teamAct: true });

  } catch (error) {

    // Returns with status code 500
    // and displays error
    res.status(500).json(error);
  }
});

// GET route to show the login page
router.get("/login", (req, res) => {
  
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {

    // Redirect user to their personal profile
    res.redirect("/profile");

    return;
  }

  // If the user is not logged in already,
  // render the login handlebar
  res.render("login");
});

module.exports = router;
