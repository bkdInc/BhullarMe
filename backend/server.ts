import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';
dotenv.config();

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// CORS configuration - allow multiple origins
const allowedOrigins = [
  'https://bhullar.me',
  'http://localhost:4200',
  'http://localhost:3000'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(null, true); // For now, allow all origins during testing
    }
  },
  credentials: true
}));

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD
  }
});

// Test email connection on startup (keep this for production monitoring)
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter error:', error);
  } else {
    console.log('Email server is ready');
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Backend API is running' });
});

// Health check endpoints (multiple for compatibility)
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend is running' });
});

app.get('/api-health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend is running' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend is running' });
});

app.post('/api/send-email', async (req, res) => {
  console.log('Received email request:', { name: req.body.name, email: req.body.email });
  
  const { name, email, message, newsletter } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const templatePath = join(__dirname, 'EmailTemp', 'emailTemp.html');
    let htmlTemplate = readFileSync(templatePath, 'utf8');

    const finalHtml = htmlTemplate
      .replace('{{name}}', name)
      .replace('{{email}}', email)
      .replace('{{message}}', message)
      .replace('{{newsletter}}', newsletter ? 'Yes' : 'No');

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: `${email}`,
      subject: `Bhullar Me - Contact Form Submission from ${name}`,
      html: finalHtml
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully (HB)' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send email (HB)' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));