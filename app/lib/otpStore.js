// app/lib/otpStore.js
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'otpStore.json');

function readOtpStore() {
  try {
    const data = fs.readFileSync(filePath, 'utf8'); 
    return JSON.parse(data); 
  } catch (error) {
    console.error('Error reading OTP store:', error);
    return {}; 
  }
}


function writeOtpStore(store) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(store, null, 2), 'utf8'); 
  } catch (error) {
    console.error('Error writing OTP store:', error);
  }
}

export { readOtpStore, writeOtpStore };
