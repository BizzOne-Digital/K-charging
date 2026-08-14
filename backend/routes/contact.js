const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { protect } = require('../middleware/auth');

router.post('/', async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ message: 'Message sent successfully! We will respond within 24 hours.', contact });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/', protect, async (req, res) => {
  try {
    const { isRead, page = 1, limit = 20 } = req.query;
    const filter = isRead !== undefined ? { isRead: isRead === 'true' } : {};
    const total = await Contact.countDocuments(filter);
    const messages = await Contact.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));
    res.json({ messages, total });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const msg = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(msg);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
