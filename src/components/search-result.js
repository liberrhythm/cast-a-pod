import React from 'react'
import Link from 'gatsby-link'
import styles from './search-result.module.css'

const SearchResult = (props) => (
    <div className={styles.card}>
        <div className={styles.cardBody}>
            <h5 className={styles.cardTitle}>{props.result.title}</h5>
            <h6 className={styles.cardSubtitle}>Subscribers: {props.result.subscribers}</h6>
            <p className={styles.cardText}>{props.result.description}</p>
            <a href={props.result.url} className={styles.cardLink}>Link to Podcast Website</a>
        </div>
    </div>
)

export default SearchResult
