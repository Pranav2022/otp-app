'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Import the Next.js Image component
import '../styles/globals.css';

export default function Home() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSendOTP = async () => {
    const response = await fetch('/api/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (response.ok) {
      router.push(`/verify-otp?email=${email}`);
    } else {
      alert('Failed to send OTP');
    }
  };

  return (
    <div className='container'>
      <div className='image-logo'>
        {/* Using the <picture> element for different formats */}
          <Image
            src={'/images/textMover-label.png'} 
            alt="Generative AI Animation"
            width={800}
            height={500}
          />
      </div>
      <p>Step into a World Where Your Imagination Comes to Life! Enter Your Email to Explore the Magic of Generative AI Animations.</p>
      <h1>Enter Your Email</h1>
      <input
        className='form-control'
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button onClick={handleSendOTP}>Send OTP</button>
    </div>
  );
}
