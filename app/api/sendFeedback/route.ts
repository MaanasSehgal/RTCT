import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { name, email, feedback, experience } = await req.json();

  if (!name || !email || !feedback || !experience) {
    return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
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
    return NextResponse.json({ message: 'Feedback sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error sending feedback:', error);
    return NextResponse.json({ message: 'Error sending feedback.' }, { status: 500 });
  }
}