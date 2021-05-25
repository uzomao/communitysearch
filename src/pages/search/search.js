import React, { useState, useEffect } from 'react'
import Header from '../../components/header/header'
import { getTime } from '../../lib/helpers'
import searchStyle from './search.module.scss'
import Suggestions from '../../components/suggestions/suggestions'
import Buttons from '../../lib/buttons'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../../App'

const Search = ({ location }) => {

    const searchId = useParams().id

    const getSearch = async () => {
        let { data: searches, error } = await supabase
            .from('searches')
            .select('*')
            .eq('id', searchId)
            if (error) console.log("error", error);
            return searches[0]
    }

    const search = location.state ? location.state.search : getSearch()
    const [ successMsg, setSuccessMsg ] = useState(location.state ? location.state.successMsg : null)

    useEffect(() => {
        if(successMsg){
            window.setTimeout(() => setSuccessMsg(null), 3000)
        }
    })

    const { id, title, description, createdAt } = search

    return (
        <div className={searchStyle.content}>
            <Header />

            {
                search &&
                    <div className={searchStyle.main}>
                        <h2>{title}</h2>
                        { successMsg && <p className="mt mb success-msg">{successMsg}</p>}
                        <p>{description}</p>
                        <div className={searchStyle.footer}>
                            <p className={searchStyle.date}>Searched {getTime(createdAt)}</p>
                            <div>
                                <Link to="#suggestion-box">
                                    <Buttons btnText="suggest something" />
                                </Link>
                                <Buttons btnText="notify someone" />
                            </div>
                        </div>
                    </div>
            }

            <Suggestions searchId={id} />
        </div>
    )
}

export default Search
