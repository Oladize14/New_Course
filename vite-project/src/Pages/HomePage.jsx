import React from 'react'
import { useAuthStore } from '../store/authStore'

const HomePage = () => {
    const {logout} = useAuthStore()

const handleLogout = () => {
    logout()
}

  return (
    <div>
        <h1>Home</h1>
        <button
        onClick={handleLogout}
         className="btn btn-wide">Logout</button>
    </div>
  )
}

export default HomePage