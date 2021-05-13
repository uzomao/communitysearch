import React, { useEffect, useState, useCallback } from 'react'
import searchStyles from './search.module.scss'
import { supabase } from '../../App'
// import { timeAgo } from '../../lib/timeago'

const Searches = ({ pageTabs }) => {
    
    const [ searches, setSearches ] = useState([])
    
    const getSearches = useCallback(async () => {
        let { data: searches, error } = await supabase
            .from('searches')
            .select('*')
            .eq('isInCommunity', pageTabs.isTabOneActive)
            .order("id", { ascending: false });
            if (error) console.log("error", error);
            setSearches(searches);
    }, [pageTabs.isTabOneActive])

    useEffect(() => {
        getSearches().catch(console.error);
    }, [getSearches]);

    return (
        <div>
            {
                searches.map(({ title, description, createdAt, isFound }, index) =>
                        <div key={index} className={searchStyles.search}>
                            <h3>{title}</h3>
                            <p>{description}</p>
                            <div className={searchStyles.footer}>
                                { isFound && <p className={searchStyles.found}>found :)</p>}
                                {/* <p>{suggestionCount} suggestions</p> */}
                                {/* <p>searched {createdAt}</p> */}
                                { console.log(typeof(createdAt)) }
                            </div>
                        </div>
                )
            }
        </div>
    )
}

export default Searches
