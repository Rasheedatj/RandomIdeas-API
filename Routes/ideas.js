const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

// get all ideas
router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.send({ success: true, data: ideas });
  } catch (error) {
    res.status(500).send({ success: false, message: `error` });
  }
});

// get a single idea using an id
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.send({ success: true, data: idea });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Something went wrong' });
  }
});

// Add a new idea
router.post('/', async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
    // date: new Date().toISOString().slice(0, 10),
  });
  try {
    const savedIdea = await idea.save();
    res.send({ success: true, data: savedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: 'Something went wrong' });
  }
});

// Update idea
router.put('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (idea.username === req.body.username) {
      const UpdatedIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag,
          },
        },
        { new: true }
      );

      return res.json({ sucess: true, data: UpdatedIdea });
    }

    // username do not match
    res.status(403).send({
      success: false,
      message: 'You are not authorized to perform this operation',
    });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Something went wrong' });
  }
});

// Delete idea
router.delete('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    // username match
    if (idea.username === req.body.username) {
      await Idea.findByIdAndDelete(req.params.id);
      return res.send({ success: true, data: {} });
    }

    // username do not match
    res.status(403).send({
      success: false,
      message: 'You are not authorized to perform this operation',
    });
  } catch (error) {
    res.status(500).send({ success: false, message: 'something went wrong' });
  }
});

module.exports = router;
