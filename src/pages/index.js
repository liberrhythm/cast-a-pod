import React, { Component } from 'react'
import Link from 'gatsby-link'
import Login from '../components/login'

const IndexPage = () => (
  <div style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    display: 'flex column',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translate(-50%, -50%)'
  }}>
    <div style={{
    }}>
      <h3 style={{
        textAlign: 'center',
        color: '#464646'
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
