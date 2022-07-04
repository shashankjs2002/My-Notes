import React from 'react'
import { Link } from 'react-router-dom'
const NoPage = () => {
  return (
    <>
      <h1>
        Page Not Found
        <Link to= "/">Go To Home Page</Link>
      </h1>
    </>
  )
}

export default NoPage