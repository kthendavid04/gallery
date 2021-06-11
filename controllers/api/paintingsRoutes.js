const router = require('express').Router();
 const { Paintings } = require('../../models');
 
 const withAuth = require('../../utils/auth');



router.post('/', withAuth, async (req, res) => {
  try {
    const newPaintings = await Paintings.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPaintings);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const paintingsData = await Paintings.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!paintingsData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(paintingsData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
