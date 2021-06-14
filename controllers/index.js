const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// Redirects the user if it does not
// match an existing route back to homepage
router.use((req, res) => {
    res.redirect("/");
});

module.exports = router;
