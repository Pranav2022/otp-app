import nodemailer from 'nodemailer';
import { readOtpStore, writeOtpStore } from '../../lib/otpStore';

export async function POST(req) {
  try {
    const { email } = await req.json();

    // Validate email
    if (!email || !validateEmail(email)) {
      return new Response(JSON.stringify({ message: 'Invalid email' }), {
        status: 400,
      });
    }

    // Generate 6-character OTP
    const otp = Math.random().toString(36).substring(2, 8).toUpperCase();
    const otpStore = readOtpStore();
    otpStore[email] = otp; 

    writeOtpStore(otpStore);

    console.log(`Generated OTP for ${email}: ${otp}`);

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'pranavmandani23@gmail.com',
        pass: 'juyjrvbfcoqbyhvl',
      },
    });

    // Send email with OTP
    const mailOptions = {
      from: 'pranavmandani23@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`,
    };

    console.log('Sending email with options:', mailOptions);

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: 'OTP sent successfully' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return new Response(JSON.stringify({ message: 'Failed to send OTP' }), {
      status: 500,
    });
  }
}

// Simple email validation function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
