import React from 'react'

const Footer = () => {
  return (
    <div>
   <footer className="w-full mt-20 text-center py-6 bg-white/70 backdrop-blur-md border-t border-gray-200">
  <p className="text-sm text-gray-600">
    © {new Date().getFullYear()} Securox — Your Digital Lockbox
  </p>
  <div className="mt-2 flex justify-center gap-4 text-gray-500 text-xs">
    <span>Built for Privacy</span>
    <span>•</span>
    <span>Smarter Security Starts Here</span>
    <span>•</span>
    <span>Peace of Mind. Always.</span>
  </div>
</footer>


    </div>
  )
}

export default Footer
