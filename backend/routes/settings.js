const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const { protect } = require('../middleware/auth');

// GET public settings
router.get('/public', async (req, res) => {
  try {
    const settings = await Settings.find({ group: { $in: ['general', 'contact', 'social'] } });
    const result = {};
    settings.forEach(s => { result[s.key] = s.value; });
    res.json(result);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// GET all settings (admin)
router.get('/', protect, async (req, res) => {
  try {
    const settings = await Settings.find();
    const result = {};
    settings.forEach(s => { result[s.key] = s.value; });
    res.json(result);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// PUT upsert settings (admin)
router.put('/', protect, async (req, res) => {
  try {
    const updates = req.body;
    for (const [key, value] of Object.entries(updates)) {
      await Settings.findOneAndUpdate({ key }, { key, value, group: getGroup(key) }, { upsert: true, new: true });
    }
    res.json({ message: 'Settings saved' });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

function getGroup(key) {
  if (['phone', 'email', 'address', 'mapUrl'].includes(key)) return 'contact';
  if (['facebook', 'instagram', 'linkedin', 'twitter'].includes(key)) return 'social';
  return 'general';
}

module.exports = router;
