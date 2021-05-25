import React, { useState, useEffect, useCallback, useContext } from 'react'
import Buttons from '../../lib/buttons'
import { supabase } from '../../App'
import { getTime, pluralize } from '../../lib/helpers'
import suggestionsStyle from './suggestions.module.scss'
import Context from '../../context'
import Replies from '../replies/replies'

const Suggestions = ({ searchId }) => {
    const [ suggestions, setSuggestions ] = useState([])
    const [ errorText, setErrorText ] = useState('')
    const { currentUser } = useContext(Context).value
    const [ enableReplyForSuggestionId, setEnableReplyForSuggestionId ] = useState(null)

    const filterByOldest = 'oldest'
    const filterByNewest = 'newest'
    const filterByVotes = 'votes'

    const [ filter, setFilter ] = useState(filterByOldest)

    const createFilter = ( filterParam ) => {
        document.getElementById(filter).style.textDecoration = 'none';
        setFilter(filterParam)
        document.getElementById(filterParam).style.textDecoration = 'underline';
    }

    const getSuggestions = useCallback(async () => {
        
        const filterParam = filter === filterByVotes ? "upvoteCount" : "createdAt"
        const filterValue = filter === filterByOldest ? { ascending: true } : { ascending : false }

        let { data: suggestions, error } = await supabase
            .from('suggestions')
            .select('*, person!authorId(name)')
            .eq('searchId', searchId)
            .order(filterParam, filterValue);
            if (error) console.log("error", error);
            setSuggestions(suggestions);
    }, [searchId, filter])

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
            suggestionBox.value = ""
            setErrorText(null)
        }
    }

    const upvoteSuggestion = async (suggestionId, name, upvoteCount) => {
        const { data:suggestion, error } = await supabase
            .from('suggestions')
            .update({ 'upvoteCount': upvoteCount+1 })
            .eq('id', suggestionId)
            if (error) console.log("error", error);
            else {
                const updatedSuggestion = {person: {name: name}, ...suggestion[0]}
                const index = suggestions.findIndex((suggestion) => suggestion.id === suggestionId)
                setSuggestions([suggestions[index] = updatedSuggestion, 
                    ...suggestions.filter((suggestion) => suggestion.id !== suggestionId)
                ])
            }
    }

    useEffect(() => {
        getSuggestions().catch(console.error)
    }, [getSuggestions])

    const closeReplyBox = () => {
        setEnableReplyForSuggestionId(null)
    }

    return (
        <>
            <div className={suggestionsStyle.suggestions}>
                <div className={`mt ${suggestionsStyle.content}`}>
                {
                    suggestions.length > 0 ?
                        <>
                        <div className={`mt mb ${suggestionsStyle.header}`}>
                            <h3>{pluralize(suggestions.length, 'Suggestion', 'Suggestions')}</h3>
                            <div className={suggestionsStyle.filters}>
                                <button style={{textDecoration: 'underline'}} className="text-btn-regular" id={filterByOldest} onClick={() => createFilter(filterByOldest)}>{filterByOldest}</button>
                                <button className="text-btn-regular" id={filterByNewest} onClick={() => createFilter(filterByNewest)}>{filterByNewest}</button>
                                <button className="text-btn-regular" id={filterByVotes} onClick={() => createFilter(filterByVotes)}>{filterByVotes}</button>
                            </div>
                        </div>
                        {
                            suggestions.map(({ id, body, upvoteCount, createdAt, person: { name } }, index) => 
                                <span key={index}>
                                <div>
                                    <p className="heading">{name}</p>
                                    <p>{body}</p>
                                    <div className={suggestionsStyle.footer}>
                                        <p className="subtext">
                                            <button className="text-btn-regular" style={{paddingLeft: '0' }}>
                                                <span 
                                                    className={`subtext text-btn ${suggestionsStyle.upvote}`} 
                                                    onClick={() => setEnableReplyForSuggestionId(id)}>
                                                        Reply
                                                </span>
                                            </button>
                                            { `| `}
                                            {pluralize(upvoteCount, 'upvote', 'upvotes')} •{` `}
                                            <span className={`text-btn ${suggestionsStyle.upvote}`} onClick={() => upvoteSuggestion(id, name, upvoteCount)}>
                                                +1
                                            </span>
                                        </p>
                                        <p className="subtext">Suggested { createdAt ? getTime(createdAt) : `just now`}</p>
                                    </div>
                                </div>
                                <Replies suggestionId={id} enableReplyForSuggestionId={enableReplyForSuggestionId} closeReplyBox={closeReplyBox} />
                                <div className={suggestionsStyle.greyline}></div>
                                </span>
                            )
                        }
                        </>
                        :
                        <div>
                            <p>No suggestions yet.</p>
                            <p>Be the first to suggest something.</p>
                        </div>                        
                }
                </div>
            </div>

            <div className={suggestionsStyle.addsuggestion}>
                {
                    errorText && <p className="error">{errorText}</p>
                }
                <textarea id="suggest" className='mt mb' placeholder="Suggest something...">
                </textarea>

                <Buttons btnText="Suggest!" isDoubleBtn={true} onClick={ () => addSuggestion() } />
            </div>
        </>
    )
}

export default Suggestions
