import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import UserModel from '../models/user'

const Login = props => {
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')

  let handleUsername = e => {
    setUsername(e.target.value)
  }

  let handlePassword = e => {
    setPassword(e.target.value)
  }

  let handleSubmit = (event) => {
    event.preventDefault()

    UserModel.login({
      username,
      password
    }).then(data => {
        if (!data.user) {
          console.log('Login Unsuccessful')
          return false
        }
        // storeUser is defined in the app component and passed to Login
        props.storeUser(data.user)
      })
      .catch(err => console.log('Login Error', err))
  }

  // if user is logged in, redirect
  if (props.currentUser) return <Redirect to='/profile' />

  return (
    <div>
      <h4>Login</h4>
      <form onSubmit={ handleSubmit }>
        <div className="form-group">
          <label htmlFor="name">Username</label>
          <input 
            onChange={ handleUsername } 
            value={ username } 
            type="username" 
            id="username" 
            name="username" 
            required  
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            onChange={ handlePassword } 
            value={ password } 
            type="password" 
            id="password" 
            name="password" 
            required
          />
        
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login;