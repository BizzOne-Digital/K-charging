const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { protect } = require('../middleware/auth');
const { sendMail } = require('../utils/mailer');

router.post('/', async (req, res) => {
  try {
    const contact = await Contact.create(req.body);

    // Await email sends before responding — on Vercel's serverless runtime, the
    // function can be frozen/torn down right after the response is sent, which
    // would silently kill any un-awaited "fire-and-forget" work still in flight.
    await sendMail({
      to: process.env.NOTIFY_EMAIL || process.env.ADMIN_EMAIL,
      subject: `New Contact Message: ${contact.subject || 'Website Inquiry'}`,
      replyTo: contact.email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> ${contact.phone || '-'}</p>
        <p><strong>Subject:</strong> ${contact.subject || '-'}</p>
        <p><strong>Message:</strong></p>
        <p>${contact.message}</p>
      `,
    });

    if (contact.email) {
      await sendMail({
        to: contact.email,
        subject: 'We received your message — K Charging Solutions',
        html: `
          <p>Hi ${contact.name},</p>
          <p>Thanks for reaching out to K Charging Solutions. We've received your message and will respond within 24 hours.</p>
          <p>— The K Charging Solutions Team</p>
        `,
      });
    }

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
