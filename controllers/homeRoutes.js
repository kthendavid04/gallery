const router = require("express").Router();
const fs = require("fs");
const { User, Painting, PaintingProc, Category, PaintingCat, Tag, PaintingTag } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    res.render("homepage");
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
        { model: Tag }
      ]
    });

    // Downloads data from MySQL painting.image_data and creates file into the uploads folder
    for (const painting of paintings) {
      fs.writeFileSync(__basedir + "/uploads/" + painting.image_name, painting.image_data);
      painting.image_data = "/uploads/" + painting.image_name;
    }

    // Goes to Gallery handlebar, and pass paintings
    res.render("gallery", { paintings });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/gallery/oldest", async (req, res) => {
  try {
    res.render("galleryOldest");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/gallery/category", async (req, res) => {
  try {
    res.render("galleryCategory");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/gallery/tag", async (req, res) => {
  try {
    res.render("galleryTag");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/gallery/pricelowtohigh", async (req, res) => {
  try {
    res.render("galleryLow");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/gallery/pricehightolow", async (req, res) => {
  try {
    res.render("galleryHigh");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/gallery/artistname", async (req, res) => {
  try {
    res.render("galleryArtist");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/gallery/artworkname", async (req, res) => {
  try {
    res.render("galleryArtwork");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signup", async (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", async (req, res) => {
  try {
    res.render("profile");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile/newart", async (req, res) => {
  try {
    res.render("profileNewArt");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile/listed", async (req, res) => {
  try {
    res.render("profileListed");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile/purchased", async (req, res) => {
  try {
    res.render("profilePurchased");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile/sold", async (req, res) => {
  try {
    res.render("profileSold");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/sale/:id", async (req, res) => {
  try {
    res.render('sale');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/meet", async (req, res) => {
  try {
    res.render('meet');
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

router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const commentsData = await Comments.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const comments = commentsData.map((post) => comments.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", { 
      comments, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/comments/:id", async (req, res) => {
  try {
    const commentsData = await Comments.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const comments = commentsData.get({ plain: true });

    res.render("comments", {
      ...comments,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



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
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
