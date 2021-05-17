import React from 'react'
import Header from '../../components/header/header'
import { getTime } from '../../lib/helpers'
import searchStyle from './search.module.scss'
import Suggestions from '../../components/suggestions/suggestions'

const Search = ({ location }) => {

    const { id, title, description, createdAt } = location.state.search // query db if this is null, for people not coming here from index page

    return (
        <div className={searchStyle.content}>
            <Header />

            <div className={searchStyle.main}>
                <h2>{title}</h2>
                <p>{description}</p>
                <p className={searchStyle.date}>Searched {getTime(createdAt)}</p>
            </div>

            <Suggestions searchId={id} />
        </div>
    )
}

export default Search
