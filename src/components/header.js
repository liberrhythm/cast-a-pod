import React from 'react'
import Link from 'gatsby-link'
import styles from './header.module.css'

const Header = ({ siteTitle }) => (
  <div className={styles.container}>
    <div className={styles.title}>
      <h1>
        <Link
          to="/"
          className={styles.titlelink}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
    <div className={styles.navbar}>
      <div className={styles.navitem}>
        <h4>
          <Link
            to="/search"
            className={styles.link}
          >
            search podcasts
        </Link>
        </h4>
      </div>
      <div className={styles.navitem}>
        <h4>
          <Link
            to="/discover"
            className={styles.link}
          >
            discover podcasts
        </Link>
        </h4>
      </div>
      <div className={styles.navitem}>
        <h4>
          <Link
            to="/advanced"
            className={styles.link}
          >
            analyze podcasts
        </Link>
        </h4>
      </div>
    </div>
  </div>
)

export default Header
