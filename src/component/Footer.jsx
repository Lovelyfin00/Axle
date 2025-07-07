import React from 'react'

const Footer = () => {
  return (
    <div className="bg-gray-50 px-4 py-3 text-center">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <p className="text-xs text-gray-500">© 2025 Loveth Omokaro. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-xs text-gray-500 hover:text-gray-700">Homepage</a>
            <a href="#" className="text-xs text-gray-500 hover:text-gray-700">License</a>
            <a href="#" className="text-xs text-gray-500 hover:text-gray-700">Terms of Use</a>
            <a href="#" className="text-xs text-gray-500 hover:text-gray-700">Privacy Policy</a>
          </div>
        </div>
      </div>
  )
}

export default Footer