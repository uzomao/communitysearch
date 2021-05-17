import React, { useState, useEffect, useCallback, useContext } from 'react'
import Buttons from '../../lib/buttons'
import { supabase } from '../../App'
import { getTime, pluralize } from '../../lib/helpers'
import suggestionsStyle from './suggestions.module.scss'
import Context from '../../context'

const Suggestions = ({ searchId }) => {
    const [ suggestions, setSuggestions ] = useState([])
    const [ errorText, setErrorText ] = useState('')
    const { currentUser } = useContext(Context).value

    const getSuggestions = useCallback(async () => {
        let { data: suggestions, error } = await supabase
            .from('suggestions')
            .select('*, person!authorId(name)')
            .eq('searchId', searchId)
            .order("createdAt", { ascending: true });
            if (error) console.log("error", error);
            setSuggestions(suggestions);
    }, [searchId])

    const addSuggestion = async () => {
        const suggestionBox = document.getElementById('suggestion-box')
        const suggestionBody = suggestionBox.value //use ref

        let { data: suggestion, error } = await supabase
            .from('suggestions')
            .insert({
                'authorId': currentUser.id,
                'body': suggestionBody,
                'upvoteCount': 0,
                'searchId': searchId
            })
        if(error) setErrorText(error.message)
        else {
            const newSuggestion = {person: {name: currentUser.name}, ...suggestion[0]}
            setSuggestions([newSuggestion, ...suggestions])
            console.log(newSuggestion)
            suggestionBox.value = ""
            setErrorText(null)
        }
    }

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
                                suggestions.map(({ body, upvoteCount, createdAt, person: { name } }, index) => 
                                    <span key={index}>
                                    <div>
                                        <p className="heading">{name}</p>
                                        <p>{body}</p>
                                        <div className={suggestionsStyle.footer}>
                                            <p className="subtext">{pluralize(upvoteCount, 'upvote', 'upvotes')}</p>
                                            <p className="subtext">Searched { createdAt ? getTime(createdAt) : `just now`}</p>
                                        </div>
                                    </div>
                                    <div className={suggestionsStyle.greyline}></div>
                                    </span>
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
                {
                    errorText && <p className="error">{errorText}</p>
                }
                <textarea id="suggestion-box" className='mt mb' placeholder="Suggest something...">
                </textarea>

                <Buttons btnText="Suggest!" isDoubleBtn={true} onClick={ () => addSuggestion() } />
            </div>
        </>
    )
}

export default Suggestions
