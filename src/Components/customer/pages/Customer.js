import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CustomerProfile from './CustomerProfile'

const Customer = () => {
  return (
    <div>
       <Routes>
       <Route path="/profile" element={<CustomerProfile />} />
      </Routes>
    </div>

  )
}

export default Customer
