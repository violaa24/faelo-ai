require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { saveDemoRequest } = require('src/repositories/demoRequestRepository');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/demo-request', async (req, res) => {
  try {
    await saveDemoRequest(req.body);
    res.status(200).json({ message: 'Request saved successfully to Google Sheets!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save request' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; // Dibutuhkan oleh Vercel
