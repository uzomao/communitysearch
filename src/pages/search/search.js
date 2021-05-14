import React from 'react'
import Header from '../../components/header/header'
import { timeAgo, getTime } from '../../lib/time'
import searchStyle from './search.module.scss'

const Search = ({ location }) => {

    const { title, description, createdAt } = location.state.search

    return (
        <div>
            <Header />
            <div className={searchStyle.content}>
                <h3>{title}</h3>
                <p>{description}</p>
                <p className={searchStyle.date}>Searched {timeAgo.format(getTime(createdAt))}</p>
            </div>
        </div>
    )
}

export default Search
