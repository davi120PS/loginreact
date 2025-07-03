import './index.css'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Login from './components/Login'

const supabase = createClient('https://<project>.supabase.co', '<your-anon-key>')

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

  return session ? <div className="p-4">✅ Logged in as {session.user.email}</div> : <Login supabase={supabase} />
}
