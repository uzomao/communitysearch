import React from 'react'
import Header from '../../components/header/header'
import { timeAgo, getTime } from '../../lib/time'
import searchStyle from './search.module.scss'

const Search = ({ location }) => {

    const search = location.state.search

    return (
        <div>
            <Header />
            <div className={searchStyle.content}>
                <h3>{search.title}</h3>
                <p>{search.description}</p>
                <p className={searchStyle.date}>Searched {timeAgo.format(getTime(search.createdAt))}</p>
            </div>
        </div>
    )
}

export default Search
