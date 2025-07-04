import React, { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()
    const { error, user } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      alert(error.message)
    } else {
      alert("Bienvenido")
    }
  }

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    if (error) console.error('Google Login Error:', error)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email *</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium">Password *</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <label className="text-sm">Remember me</label>
          </div>
          
          <button 
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6">
          <button 
            onClick={() => navigate('/signup')}  // <-- Aquí la navegación
            className="w-full border py-2 rounded text-sm font-medium"
          >
            Create an account
          </button>
        </div>

        <div className="my-4 text-center text-gray-500">or</div>

        <div className="space-y-2">
          <button
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-center border py-2 rounded hover:bg-gray-100"
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" className="w-5 h-5 mr-2" alt="Google" />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignIn
