const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { protect } = require('../middleware/auth');
const { cloudinary, upload } = require('../config/cloudinary');

router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 9, category } = req.query;
    const filter = { isPublished: true };
    if (category) filter.category = category;
    const total = await Blog.countDocuments(filter);
    const posts = await Blog.find(filter)
      .populate('author', 'name avatar')
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json({ posts, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.get('/admin/all', protect, async (req, res) => {
  try {
    const posts = await Blog.find().populate('author', 'name').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.get('/:slug', async (req, res) => {
  try {
    const post = await Blog.findOne({ slug: req.params.slug, isPublished: true }).populate('author', 'name avatar');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.views += 1;
    await post.save();
    res.json(post);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.post('/', protect, upload.single('coverImage'), async (req, res) => {
  try {
    const data = { ...req.body, author: req.user._id };
    if (req.file) { data.coverImage = req.file.path; data.coverImagePublicId = req.file.filename; }
    if (data.tags && typeof data.tags === 'string') data.tags = JSON.parse(data.tags);
    const post = await Blog.create(data);
    res.status(201).json(post);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.put('/:id', protect, upload.single('coverImage'), async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    const data = { ...req.body };
    if (req.file) {
      if (post.coverImagePublicId) await cloudinary.uploader.destroy(post.coverImagePublicId);
      data.coverImage = req.file.path; data.coverImagePublicId = req.file.filename;
    }
    if (data.tags && typeof data.tags === 'string') data.tags = JSON.parse(data.tags);
    Object.assign(post, data);
    await post.save();
    res.json(post);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    if (post.coverImagePublicId) await cloudinary.uploader.destroy(post.coverImagePublicId);
    await post.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
