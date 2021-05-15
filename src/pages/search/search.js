import React, { useState, useEffect, useCallback } from 'react'
import Header from '../../components/header/header'
import { getTime, pluralize } from '../../lib/helpers'
import searchStyle from './search.module.scss'
import { supabase } from '../../App'

const Search = ({ location }) => {

    const { id, title, description, createdAt } = location.state.search // query db if this is null, for people not coming here from index page

    const [ suggestions, setSuggestions ] = useState([])

    const getSuggestions = useCallback(async () => {
        let { data: suggestions, error } = await supabase
            .from('suggestions')
            .select('*, person!authorId(name)')
            .eq('searchId', id)
            if (error) console.log("error", error);
            setSuggestions(suggestions);
    }, [id])

    useEffect(() => {
        getSuggestions().catch(console.error)
    }, [getSuggestions])

    return (
        <div className={searchStyle.content}>
            <Header />
            <div className={`mb ${searchStyle.main}`}>
                <h2>{title}</h2>
                <p>{description}</p>
                <p className={searchStyle.date}>Searched {getTime(createdAt)}</p>
            </div>

            <div className={searchStyle.suggestions}>
                {
                    suggestions ?
                        <div className={`mt ${searchStyle.content}`}>
                            <h3>{pluralize(suggestions.length, 'Suggestion', 'Suggestions')}</h3>
                            {
                                suggestions.map(({ body, upvoteCount, createdAt, person: { name } }) => 
                                    <>
                                        <p className="heading">{name}</p>
                                        <p>{body}</p>
                                        <div className={searchStyle.footer}>
                                            <p className="subtext">{pluralize(upvoteCount, 'upvote', 'upvotes')}</p>
                                            <p className="subtext">Searched {getTime(createdAt)}</p>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                        :
                        <p className="heading">Be the first to suggest something.</p>
                }
            </div>
        </div>
    )
}

export default Search
