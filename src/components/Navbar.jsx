 
import React, { useState, useEffect } from 'react';


const Navbar = () => {
  const taglines = [
    "Secure. Simple. Smart.",
    "Your Vault in the Cloud.",
    "Lock Once, Access Forever.",
    "No More Password Panic.",
    "Encrypted. Trusted. Yours."
  ];

  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className='bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 flex justify-between items-center px-6 h-16'>
     <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 bg-clip-text text-transparent tracking-wide">
      Securox
    
    </h1>

      <div className="text-sm text-blue-500 font-medium transition-opacity duration-700 ease-in-out">
        {taglines[currentTaglineIndex]}
      </div>
    </nav>
  );
};

export default Navbar;
