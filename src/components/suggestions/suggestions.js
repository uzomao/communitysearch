import React, { useState, useEffect, useCallback } from 'react'
import Buttons from '../../lib/buttons'
import { supabase } from '../../App'
import { getTime, pluralize } from '../../lib/helpers'
import suggestionsStyle from './suggestions.module.scss'

const Suggestions = ({ searchId }) => {
    const [ suggestions, setSuggestions ] = useState([])

    const getSuggestions = useCallback(async () => {
        let { data: suggestions, error } = await supabase
            .from('suggestions')
            .select('*, person!authorId(name)')
            .eq('searchId', searchId)
            if (error) console.log("error", error);
            setSuggestions(suggestions);
    }, [searchId])

    useEffect(() => {
        getSuggestions().catch(console.error)
    }, [getSuggestions])

    return (
        <>
            <div className={suggestionsStyle.suggestions}>
                {
                    suggestions.length > 0 ?
                        <div className={`mt ${suggestionsStyle.content}`}>
                            <h3>{pluralize(suggestions.length, 'Suggestion', 'Suggestions')}</h3>
                            {
                                suggestions.map(({ body, upvoteCount, createdAt, person: { name } }) => 
                                    <>
                                    <div>
                                        <p className="heading">{name}</p>
                                        <p>{body}</p>
                                        <div className={suggestionsStyle.footer}>
                                            <p className="subtext">{pluralize(upvoteCount, 'upvote', 'upvotes')}</p>
                                            <p className="subtext">Searched {getTime(createdAt)}</p>
                                        </div>
                                    </div>
                                    <div className={suggestionsStyle.greyline}></div>
                                    </>
                                )
                            }
                        </div>
                        :
                        <div className={`mt ${suggestionsStyle.content}`}>
                            <p>No suggestions yet.</p>
                            <p>Be the first to suggest something.</p>
                        </div>                        
                }
            </div>

                <div className={`mb ${suggestionsStyle.addsuggestion}`}>
                    <textarea id="suggestion-box" className='mt mb' placeholder="Suggest something...">
                    </textarea>

                    <Buttons btnText="Suggest!" />
                </div>
        </>
    )
}

export default Suggestions
