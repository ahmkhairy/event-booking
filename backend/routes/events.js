const express = require('express');
const Event = require('../models/Event');
const User = require('../models/User');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'your_folder_name',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
  },
});

const upload = multer({ storage });

router.get('/getAll', async (req, res) => {
  try {
    const events = await Event.find({ active: true });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/getUserTickets/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate('tickets.event');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const tickets = user.tickets;
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.post('/create', upload.single('image'), async (req, res) => {
  const { name, type, price, description, tickets, date } = req.body;
  const imageUrl = req.file.path;

  try {
    const event = new Event({
      name,
      type,
      price,
      description,
      imageUrl,
      tickets,
      date,
    });

    await event.save();
    res.json({ success: true, message: 'Event created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/delete', async (req, res) => {
  const { eventId } = req.body;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    event.active = false;
    await event.save();

    res.json({ success: true, message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/book', async (req, res) => {
  const { eventId, userId } = req.body;

  const event = await Event.findById(eventId);
  const user = await User.findById(userId);

  if (!event) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  
  event.tickets--;

  await event.save();


  user.tickets.push({
    event: eventId,
    purchaseDate: new Date()
  });

  await user.save();

  res.json({ success: true, message: 'Ticket booked successfully' });
});


module.exports = router;
