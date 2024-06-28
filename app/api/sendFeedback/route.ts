import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const { name, email, feedback, experience } = req.body;

  if (!name || !email || !feedback || !experience) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS, // Use the App Password here
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.RECEIVER_EMAIL,
    subject: `Feedback from ${name}`,
    text: `Experience: ${experience}\n\nFeedback:\n${feedback}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Feedback sent successfully!' });
  } catch (error) {
    console.error('Error sending feedback:', error);
    return res.status(500).json({ message: 'Error sending feedback.' });
  }
}
