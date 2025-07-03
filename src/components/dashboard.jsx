import React from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { UserAuth } from "../context/AuthContext"

const Dashboard = () => {
  const { session, signOut } = UserAuth()
  const navigate = useNavigate()

  const handleSignOut = async (e) => {
    e.preventDefault()
    try {
      await signOut()
      navigate("/", { replace: true })
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  if (!session) return <Navigate to="/" />

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <h2>Welcome, {session?.user?.email}</h2>
      <div>
        <p
          onClick={handleSignOut}
          className="hover:cursor-pointer border inline-block px-4 py-3 mt-4"
        >
          Sign out
        </p>
      </div>
    </div>
  )
}

export default Dashboard
