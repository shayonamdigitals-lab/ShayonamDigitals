import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory mock database for contact submissions
const contactSubmissions = [];

// API: Get portfolio work
app.get('/api/work', (req, res) => {
  res.json([
    { id: 1, title: 'Quantum UI', category: 'Web Development', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' },
    { id: 2, title: 'Neon Finance', category: 'UI/UX Design', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' },
    { id: 3, title: 'Aero Mobile', category: 'Mobile App', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' },
    { id: 4, title: 'Zenith Strategy', category: 'Digital Strategy', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' },
  ]);
});

// API: Submit contact form
app.post('/api/contact', (req, res) => {
  const { name, email, service, message } = req.body;
  
  if (!name || !email || !service || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const newSubmission = { id: Date.now(), name, email, service, message, date: new Date() };
  contactSubmissions.push(newSubmission);
  
  console.log('New Contact Submission:', newSubmission);
  
  res.status(201).json({ success: true, message: 'Message received successfully!', data: newSubmission });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
