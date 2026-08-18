const router = require('express').Router();
const Note = require('../models/Note');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, async (req, res) => {
    const notes = await Note.find({ userId: req.user.id });
    res.json(notes);
});

router.post('/', auth, async (req, res) => {
    const note = new Note({ userId: req.user.id, content: req.body.content });
    await note.save();
    res.status(201).json(note);
});

router.delete('/:id', auth, async (req, res) => {
    await Note.deleteOne({ _id: req.params.id, userId: req.user.id });
    res.json({ message: 'Note deleted' });
});

module.exports = router;
