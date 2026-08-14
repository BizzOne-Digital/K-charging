const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { upload, cloudinary } = require('../config/cloudinary');

// POST single image upload
router.post('/image', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    res.json({ url: req.file.path, publicId: req.file.filename });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// DELETE image from Cloudinary
router.delete('/image', protect, async (req, res) => {
  try {
    const { publicId } = req.body;
    if (!publicId) return res.status(400).json({ message: 'Public ID required' });
    await cloudinary.uploader.destroy(publicId);
    res.json({ message: 'Image deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
