import React from 'react'
import Container from './Container'
import Login from "./Login"
import Signup from './Signup'

const LoginPage = () => {
  return (
    <div>
      <Container>
          <div>
            <h2>User Dashboard</h2>
            {/* Display user dashboard */}
          </div>: (
          <div>
            <Login/>
            <Signup/>
          </div>
        )
      </Container>
    </div>
  )
}

export default LoginPage
