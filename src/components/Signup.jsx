// src/components/SignUp.jsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { supabase } from '../supabaseClient'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { session, signUpNewUser } = UserAuth()
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()
    setError('')
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    setLoading(true)

    try {
      const result = await signUpNewUser(email, password, confirmPassword)

      if (result.success) {
        navigate('/dashboard')
      } else {
        setError(result.message || 'Error al crear la cuenta')
      }
    } catch (err) {
      console.error(err)
      setError('Ocurrió un error al registrarte')
    } finally {
      setLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
    if (error) setError(error.message)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password *</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Confirm Password *</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <p className="text-xs text-gray-500 mt-2">
            By creating an account, you agree to the{" "}
            <a href="#" className="text-blue-500 hover:underline">Terms of Service</a> and{" "}
            <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.
          </p>

          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 ${loading && 'opacity-50 cursor-not-allowed'}`}
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create a new account'}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">Sign In</Link>
        </p>

        <div className="my-4 text-center text-gray-500">or</div>

        <div className="space-y-2">
          <button
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-center border py-2 rounded hover:bg-gray-100"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
              className="w-5 h-5 mr-2"
              alt="Google"
            />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignUp
