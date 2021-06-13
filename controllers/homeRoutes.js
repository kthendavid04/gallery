const router = require("express").Router();
const fs = require("fs");
const { User, Painting, PaintingProc, Category, PaintingCat, Tag, PaintingTag } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    res.render("homepage", { loggedIn: req.session.loggedIn, homepageAct: true, galleryAct: false, teamAct: false });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/gallery", async (req, res) => {
  try {

    // Local scope variables
    const paintings = await Painting.findAll({
      include: [
        { model: Category },
        { model: Tag },
        { model: User }
      ]
    });

    // Downloads data from MySQL painting.image_data and creates file into the uploads folder
    for (const painting of paintings) {
      fs.writeFileSync(__basedir + "/uploads/" + painting.image_name, painting.image_data);
      painting.image_data = "/uploads/" + painting.image_name;
    }

    const allPaintings = paintings.map((painting) => painting.get({plain: true}));

    console.log(allPaintings);

    // Goes to Gallery handlebar, and pass paintings
    res.render("gallery", { paintings: allPaintings, loggedIn: req.session.loggedIn, homepageAct: false, galleryAct: true, teamAct: false });

  } catch (err) {
    res.status(500).json(err);
  }
});
//sorting gallery postings from oldest to newest
router.get("/gallery/oldest", async (req, res) => {
  try {
    res.render("galleryOldest", { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});
//sorting gallery postings by category
router.get("/gallery/category", async (req, res) => {
  try {
    res.render("galleryCategory", { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});
//sorting callery postings by tag
router.get("/gallery/tag", async (req, res) => {
  try {
    res.render("galleryTag", { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});
//sorting gallery postings on price lowest to highest
router.get("/gallery/pricelowtohigh", async (req, res) => {
  try {
    res.render("galleryLow", { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});
//sorting gallery postings on price highest to lowest
router.get("/gallery/pricehightolow", async (req, res) => {
  try {
    res.render("galleryHigh", { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});
//sorting gallery postings by artist name
router.get("/gallery/artistname", async (req, res) => {
  try {
    res.render("galleryArtist", { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});
//sorting gallery postings by artwok name
router.get("/gallery/artworkname", async (req, res) => {
  try {
    res.render("galleryArtwork", { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});
//directing user to the signup page if not logged in
router.get("/signup", async (req, res) => {
  try {
    res.render("signup", { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    const dbUserData = await User.findOne({ where: {id: req.session.userId}})
    const user = dbUserData.get({ plain: true });

    console.log(user);
    res.render("profile", { user, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile/newart", withAuth, async (req, res) => {
  try {
    res.render("profileNewArt", { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile/listed", withAuth, async (req, res) => {
  try {
    res.render("profileListed", { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile/purchased", withAuth, async (req, res) => {
  try {
    res.render("profilePurchased", { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile/sold", withAuth, async (req, res) => {
  try {
    res.render("profileSold", { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/sale/:id", async (req, res) => {
  try {
    const buyer_id = req.session.userId;
    const dbSaleData = await Painting.findByPk(req.params.id);
    const dbBuyerData = await User.findByPk(buyer_id);

    const sale = dbSaleData.get({ plain: true });
    const buyer = dbBuyerData.get({ plain: true });

    const dbPaintingProcData = await PaintingProc.findOne({ where: { painting_id: sale.id}});
    const paintingProc = dbPaintingProcData.get({ plain: true });

    const dbSellerData = await User.findOne({ where: { id: sale.original_painter}});
    const seller = dbSellerData.get({ plain: true });
    console.log(sale);
    console.log(buyer);
    console.log(paintingProc);
    console.log(seller);
    res.render('sale', { sale, buyer, paintingProc, seller, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/meet", async (req, res) => {
  try {
    res.render('meet', { loggedIn: req.session.loggedIn, homepageAct: false, galleryAct: false, teamAct: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/post/:id", async (req, res) => {
//   try {
//     const postData = await Post.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ["name"],
//         },
//       ],
//     });

//     const post = postData.get({ plain: true });

//     res.render("post", {
//       ...post,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// comments

// router.get("/", async (req, res) => {
//   try {
//     // Get all projects and JOIN with user data
//     const commentsData = await Comments.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ["name"],
//         },
//       ],
//     });

//     // Serialize data so the template can read it
//     const comments = commentsData.map((post) => comments.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render("homepage", { 
//       comments, 
//       logged_in: req.session.logged_in 
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/comments/:id", async (req, res) => {
//   try {
//     const commentsData = await Comments.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ["name"],
//         },
//       ],
//     });

//     const comments = commentsData.get({ plain: true });

//     res.render("comments", {
//       ...comments,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



// Use withAuth middleware to prevent access to route
// router.get("/profile", withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ["password"] },
//       include: [{ model: Post }],
//     });

//     const user = userData.get({ plain: true });

//     res.render("profile", {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


//cooments

// router.get("/profile", withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ["password"] },
//       include: [{ model: Comments }],
//     });

//     const user = userData.get({ plain: true });

//     res.render("profile", {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



router.get("/login", (req, res) => {
  
  console.log(req.session);
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
