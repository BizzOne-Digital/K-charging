const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { protect } = require('../middleware/auth');
const { cloudinary, upload } = require('../config/cloudinary');

// GET all active services (public)
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ order: 1 });
    res.json(services);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// GET all services (admin)
router.get('/admin/all', protect, async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.json(services);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// GET single service by slug
router.get('/:slug', async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, isActive: true });
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// POST create service (admin)
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) { data.image = req.file.path; data.imagePublicId = req.file.filename; }
    if (data.features && typeof data.features === 'string') data.features = JSON.parse(data.features);
    const service = await Service.create(data);
    res.status(201).json(service);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// PUT update service (admin)
router.put('/:id', protect, upload.single('image'), async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    const data = { ...req.body };
    if (req.file) {
      if (service.imagePublicId) await cloudinary.uploader.destroy(service.imagePublicId);
      data.image = req.file.path; data.imagePublicId = req.file.filename;
    }
    if (data.features && typeof data.features === 'string') data.features = JSON.parse(data.features);
    Object.assign(service, data);
    await service.save();
    res.json(service);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// DELETE service (admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    if (service.imagePublicId) await cloudinary.uploader.destroy(service.imagePublicId);
    await service.deleteOne();
    res.json({ message: 'Service deleted' });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
