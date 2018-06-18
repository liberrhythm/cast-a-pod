import React, { Component } from 'react'
import Login from '../components/login'

// backbone of the login page
// user authentication was not successful due to CORS issues
// would have added an additional profile.js page

const IndexPage = () => (
  <div style={{
    position: 'absolute',
    top: '45%',
    left: '50%',
    display: 'flex column',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translate(-50%, -50%)'
  }}>
    <div style={{
      marginBottom: '30px'
    }}>
      <h3 style={{
        textAlign: 'center',
        color: '#464646',
        fontWeight: 'bold'
      }}>cast-a-pod makes your podcast experience one to listen to - forever.</h3>
      <h4 style={{
        textAlign: 'center',
        color: '#464646'
      }}>sign in to let the good times flow</h4>
    </div>
    <Login></Login>
  </div>
)


export default IndexPage
