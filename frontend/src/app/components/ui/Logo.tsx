import React from 'react';

export default function Logo() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background shape */}
      <rect x="0" y="0" width="40" height="40" rx="12" fill="url(#paint0_linear)" />
      
      {/* Abstract Leaf/E symbol */}
      <path d="M20 10C14.4772 10 10 14.4772 10 20C10 25.5228 14.4772 30 20 30H26C27.1046 30 28 29.1046 28 28V12C28 10.8954 27.1046 10 26 10H20Z" fill="white" fillOpacity="0.2"/>
      <path d="M20 12C15.5817 12 12 15.5817 12 20C12 24.4183 15.5817 28 20 28H24V14C24 12.8954 23.1046 12 22 12H20Z" fill="white"/>
      <circle cx="20" cy="20" r="3" fill="#FF5500"/>

      <defs>
        <linearGradient id="paint0_linear" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF5500"/>
          <stop offset="1" stopColor="#FF8800"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
