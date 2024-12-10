import React, { useContext, useEffect } from 'react'
import userContext from '../store/UserContext'
import { Navigate } from 'react-router-dom'

function Logout() {
  const { LogoutUser } = useContext(userContext)
  useEffect(()=>{
    LogoutUser()
  },[LogoutUser])
  return (
    <Navigate to='/login' />
  )
}

export default Logout