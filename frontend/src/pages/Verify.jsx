import { verifyEmail } from '@/api/authApi'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Verify = () => {
    const navigate=useNavigate()
    const {token} = useParams()
    const [status,setStatus] = useState("verifying...")

   useEffect(() => {
  const verify = async () => {
    try {
      const res = await verifyEmail(token);
      setStatus("✅ Email verified successfully");
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      setStatus("❌ Verification failed");
    }
  };
  verify();
}, [token]);

  return (
    <div className="w-full min-h-screen bg-green-100 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
            <div className='bg-white p-6 rounded-xl shadow-md text-center w--[50%] max-w-md'>
                <h2 className='text-xl font-semibold text-gray-800'>{status}</h2>
            </div>
        </div>

    </div>
  )
}

export default Verify