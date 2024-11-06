const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer'); // Import multer for file uploads
const path = require('path');
const app = express();
const Appointment = require('./models/Appointment');
const Doctor = require('./models/Doctor'); // Import the Doctor model
const cors = require('cors');

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // For parsing JSON bodies
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from the 'uploads' directory

// Replace this with your actual connection string
const mongoURI = 'mongodb+srv://22cs353:22cs353@cluster0.uqt5njw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define storage and upload configuration using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp as filename
  },
});

const upload = multer({ storage });

// Define your routes here, like the /api/appointments POST route
app.post('/api/appointments', async (req, res) => {
  const { name, mobile, date, doctor } = req.body;
  const newAppointment = new Appointment({ name, mobile, date, doctor });
  try {
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error('Error saving appointment:', error); // Log the error for debugging
    res.status(500).json({ error: 'Error saving appointment' });
  }
});

// Add this route to fetch all appointments
app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find(); // Fetch all appointments from the database
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Error fetching appointments' });
  }
});

// Add this route to delete an appointment
app.delete('/api/appointments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAppointment = await Appointment.findByIdAndDelete(id);
    if (!deletedAppointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(200).json(deletedAppointment);
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ error: 'Error deleting appointment' });
  }
});

// Add this route to delete all appointments
app.delete('/api/appointments', async (req, res) => {
  try {
    await Appointment.deleteMany({}); // Delete all appointments
    res.status(200).json({ message: 'All appointments deleted successfully.' });
  } catch (error) {
    console.error('Error deleting all appointments:', error);
    res.status(500).json({ error: 'Error deleting all appointments' });
  }
});

// Add this route to fetch appointments by mobile number
app.get('/api/appointments/:mobile', async (req, res) => {
  try {
    const { mobile } = req.params;
    const appointments = await Appointment.find({ mobile });
    if (appointments.length === 0) {
      return res.status(404).json({ error: 'No appointments found for this mobile number' });
    }
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments by mobile number:', error);
    res.status(500).json({ error: 'Error fetching appointments by mobile number' });
  }
});

// Define routes for doctors
app.post('/api/doctors', upload.single('image'), async (req, res) => {
  const { name, specialization } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
  const newDoctor = new Doctor({ name, specialization, imageUrl });
  try {
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (error) {
    console.error('Error saving doctor:', error);
    res.status(500).json({ error: 'Error saving doctor' });
  }
});

app.get('/api/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'Error fetching doctors' });
  }
});

app.delete('/api/doctors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDoctor = await Doctor.findByIdAndDelete(id);
    if (!deletedDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(200).json(deletedDoctor);
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).json({ error: 'Error deleting doctor' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
