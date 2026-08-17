const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const { protect } = require('../middleware/auth');

// GET all active jobs (public)
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json(jobs);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// GET all jobs (admin)
router.get('/admin/all', protect, async (req, res) => {
  try {
    const jobs = await Job.find().sort({ order: 1, createdAt: -1 });
    res.json(jobs);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// GET single job by slug
router.get('/:slug', async (req, res) => {
  try {
    const job = await Job.findOne({ slug: req.params.slug, isActive: true });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// POST create job (admin)
router.post('/', protect, async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.requirements && typeof data.requirements === 'string') data.requirements = JSON.parse(data.requirements);
    const job = await Job.create(data);
    res.status(201).json(job);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// PUT update job (admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    const data = { ...req.body };
    if (data.requirements && typeof data.requirements === 'string') data.requirements = JSON.parse(data.requirements);
    Object.assign(job, data);
    await job.save();
    res.json(job);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// DELETE job (admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    await job.deleteOne();
    res.json({ message: 'Job deleted' });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
