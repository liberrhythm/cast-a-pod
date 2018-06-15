import React from 'react'
import Link from 'gatsby-link'

const Header = ({ siteTitle }) => (
  <div
    style={{
      marginBottom: '1.45rem',
      opacity: 0.9
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0.75rem 1.0875rem',
      }}
    >
      <h1 style={{ margin: '10px' }}>
        <Link
          to="/"
          style={{
            color: '#464646',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </div>
)

export default Header
