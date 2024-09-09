import { readOtpStore, writeOtpStore } from '../../lib/otpStore';

export async function POST(req) {
  try {
    const { email, otp } = await req.json();

    // Validate email and OTP
    if (!email || !otp || !validateEmail(email)) {
      return new Response(JSON.stringify({ message: 'Invalid email or OTP' }), {
        status: 400,
      });
    }


    const otpStore = readOtpStore();
    const storedOtp = otpStore[email];
    console.log(`Verifying OTP for ${email}. Stored OTP: ${otpStore[email]}, Provided OTP: ${otp}`);

    // Check if OTP matches
    if (storedOtp === otp) {
      delete otpStore[email]; // Clear OTP after verification

      // Write the updated OTP store back to the file
      writeOtpStore(otpStore);

      return new Response(JSON.stringify({ message: 'OTP verified successfully' }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: 'Invalid OTP' }), {
        status: 400,
      });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
    });
  }
}

// Simple email validation function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
