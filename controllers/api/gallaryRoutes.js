const router = require('express').Router();
 
 const { Gallary } = require('../../models');
 const withAuth = require('../../utils/auth');


// Comments

router.post('/', withAuth, async (req, res) => {
  try {
    const newGallary = await Gallary.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newGallary);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const gallaryData = await newGallary.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!gallaryData) {
      res.status(404).json({ message: 'No comments found with this id!' });
      return;
    }

    res.status(200).json(gallaryData);
  } catch (err) {
    res.status(500).json(err);
  }
});





module.exports = router;
