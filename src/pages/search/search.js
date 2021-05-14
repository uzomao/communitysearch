import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/header/header'
import { supabase } from '../../App'
import { timeAgo, getTime } from '../../lib/time'
import searchStyle from './search.module.scss'
import Loading from '../../components/loading'

const Search = () => {

    let { id } = useParams();

    const [ search, setSearch ] = useState(null)

    const getSearch = useCallback(async () => {
        let { data: searches, error } = await supabase
            .from('searches')
            .select('*')
            .eq('id', id)
            if (error) console.log("error", error);
            setSearch(searches[0]);
    }, [id])

    useEffect(() => {
        getSearch().catch(console.error);
    }, [getSearch]);

    return (
        <div>
            <Header />
            {
                search ? 
                    <div className={searchStyle.content}>
                        <h3>{search.title}</h3>
                        <p>{search.description}</p>
                        <p className={searchStyle.date}>Searched {timeAgo.format(getTime(search.createdAt))}</p>
                    </div>
                    :
                    <Loading loadingText='Fetching Search...' />
            }
        </div>
    )
}

export default Search
