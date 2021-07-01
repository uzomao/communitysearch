import React, { useState, useEffect, useCallback } from 'react'
import Header from '../../components/header/header'
import { getTime } from '../../lib/helpers'
import searchStyle from './search.module.scss'
import Suggestions from '../../components/suggestions/suggestions'
import Buttons from '../../lib/buttons'
import { useParams, useLocation, Link } from 'react-router-dom'
import { supabase } from '../../App'

const Search = () => {

    const searchId = useParams().id

    const getSearch = useCallback(async () => {
        let { data: searches, error } = await supabase
            .from('searches')
            .select('*')
            .eq('id', searchId)
            if (error) console.log("error", error);
            setSearch(searches[0])
    }, [searchId])

    const [ search, setSearch ] = useState(null)

    const location = useLocation()
    const [ successMsg, setSuccessMsg ] = useState(location.state ? location.state.successMsg : null)

    useEffect(() => {
        location.state ? setSearch(location.state.search) : getSearch()
        if(successMsg){
            window.setTimeout(() => setSuccessMsg(null), 3000)
        }
    }, [ location.state, getSearch, successMsg])


    return (
        <div className={searchStyle.content}>
            <Header />

            {
                search &&
                    <div className={searchStyle.main}>
                        <h2><Link to={`/profile/${search.name}`} className="default-link">{search.name}</Link>{search.title}</h2>
                        { successMsg && <p className="mt mb success-msg">{successMsg}</p>}
                        <p>{search.description}</p>
                        <div className={searchStyle.footer}>
                            <p className={searchStyle.date}>Searched {getTime(search.createdAt)}</p>
                            <div>
                                <a href="#suggest">
                                    <Buttons btnText="suggest something" />
                                </a>
                                <Buttons btnText="notify someone" />
                            </div>
                        </div>
                    </div>
            }

            <Suggestions searchId={searchId} />
        </div>
    )
}

export default Search
