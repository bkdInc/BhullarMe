import express from 'express';
import { Resend } from 'resend';
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

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

if (!process.env.RESEND_API_KEY) {
  console.error('RESEND_API_KEY is not set!');
} else {
  console.log('Resend email service configured');
}

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
    // EmailTemp is in the parent directory of dist
    const templatePath = join(__dirname, '..', 'EmailTemp', 'emailTemp.html');
    console.log('Looking for template at:', templatePath);
    let htmlTemplate = readFileSync(templatePath, 'utf8');
    console.log('Template loaded successfully');

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

    console.log('Attempting to send email with Resend...');
    
    // Send with Resend (fast and reliable for cloud hosting)
    const { data, error: resendError } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // Resend verified sender
      to: [process.env.EMAIL_FROM || 'your-email@gmail.com'],
      reply_to: email, // User's email for replies
      subject: `Bhullar Me - Contact Form from ${name}`,
      html: finalHtml
    });
    
    if (resendError) {
      throw resendError;
    }
    
    console.log('Email sent successfully via Resend:', data);
    res.status(200).json({ message: 'Email sent successfully (HB)' });
  } catch (error: any) {
    console.error('Email error:', error);
    console.error('Error details:', error.message, error.code);
    res.status(500).json({ error: 'Failed to send email (HB)', details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));