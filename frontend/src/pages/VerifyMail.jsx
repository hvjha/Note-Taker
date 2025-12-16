import React from 'react'

const VerifyMail = () => {
  return (
    <div className="w-full min-h-screen bg-green-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
         ✅ Check Your Email 📧
        </h2>
        <p className="text-gray-400 text-sm">
          We have sent you an email to verify your account. Please check your
          inbox and click the verification link.
        </p>
      </div>
    </div>
  )
}

export default VerifyMail
