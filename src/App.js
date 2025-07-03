import './index.css'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
//import { createClient } from 'npm:@supabase/supabase-js@2'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'


import Dashboard from './components/dashboard'
import SignIn from './components/Signin'   // Este es tu SignIn
import SignUp from './components/Signup'

const supabase = createClient('https://iuvblndcwnqmxkciszlq.supabase.co', 'eyJhbGciOiJSeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1dmJsbmRjd25xbXhrY2lzemxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1MTM0NjAsImV4cCI6MjA2NzA4OTQ2MH0.iUjoscgE7tIcsCqyc8fWqooTeBI7lkbgSNgiNWwGubM')

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          {/* Vista principal = login */}
          <Route
            path="/"
            element={
              session
                ? <Navigate to="/dashboard" />
                : <SignIn supabase={supabase} />
            }
          />

          <Route path="/signup" element={<SignUp />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthContextProvider>
  )
}
