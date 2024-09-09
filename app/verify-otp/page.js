'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import '../../styles/globals.css';

export default function VerifyOTP() {
  const [otp, setOtp] = useState('');
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const handleVerifyOTP = async () => {
    const button = document.getElementById('btn');
    button.innerHTML = 'Loading...';  // Change button text
    button.disabled = true;  // Disable the button

    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        window.location.href = 'https://www.textmover.com/';
      } else {
        alert('Invalid OTP');
        button.innerHTML = 'Verify OTP';  // Reset button text
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('An error occurred. Please try again.');
    } finally {
      button.disabled = false;  // Re-enable the button
      button.innerHTML = 'Verify OTP';  // Reset button text
    }
  };

  return (
    <div className='container'>
      <div className='image-logo'>
        <picture>
          <source srcSet="/images/textMover-label.avif" type="image/avif" />
          <source srcSet="/images/textMover-label.webp" type="image/webp" />
          <Image
            src="/images/textMover-label.png"
            alt="Landscape picture"
            width={800}
            height={500}
          />
        </picture>
      </div>
      <p>Transform Your Imagination into Reality with Generative AI-Powered Realistic Animations!</p>
      <h1>Enter OTP</h1>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter 6-digit OTP"
      />
      <button id='btn' onClick={handleVerifyOTP}>
        Verify OTP
      </button>
    </div>
  );
}
