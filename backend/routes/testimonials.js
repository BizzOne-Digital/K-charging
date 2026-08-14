const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const { protect } = require('../middleware/auth');
const { cloudinary, upload } = require('../config/cloudinary');

router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort({ order: 1 });
    res.json(testimonials);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.get('/admin/all', protect, async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1 });
    res.json(testimonials);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.post('/', protect, upload.single('avatar'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) { data.avatar = req.file.path; data.avatarPublicId = req.file.filename; }
    const testimonial = await Testimonial.create(data);
    res.status(201).json(testimonial);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.put('/:id', protect, upload.single('avatar'), async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ message: 'Not found' });
    const data = { ...req.body };
    if (req.file) {
      if (testimonial.avatarPublicId) await cloudinary.uploader.destroy(testimonial.avatarPublicId);
      data.avatar = req.file.path; data.avatarPublicId = req.file.filename;
    }
    Object.assign(testimonial, data);
    await testimonial.save();
    res.json(testimonial);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const t = await Testimonial.findById(req.params.id);
    if (!t) return res.status(404).json({ message: 'Not found' });
    if (t.avatarPublicId) await cloudinary.uploader.destroy(t.avatarPublicId);
    await t.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
