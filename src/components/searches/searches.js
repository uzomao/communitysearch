import React, { useEffect, useState, useCallback } from 'react'
import searchStyles from './searches.module.scss'
import { supabase } from '../../App'
import { timeAgo, getTime } from '../../lib/time'
import { Link } from 'react-router-dom'

const Searches = ({ pageTabs }) => {
    
    const [ searches, setSearches ] = useState([])
    
    //returns a memoized callback to ensure that the effect is only called when 
    //dependencies (pageTabs.isTabOneActive) changes
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
                searches.map(({ id, title, description, createdAt, isFound }, index) =>
                        
                        <div className={searchStyles.search} key={index}>
                            <Link to={`/search/${id}`}  className='default-link'>
                                <h3>{title}</h3>
                                <p>{description}</p>
                                <div className={searchStyles.footer}>
                                    { isFound && <p className={searchStyles.found}>found :)</p>}
                                    <p>searched {timeAgo.format(getTime(createdAt))}</p>
                                </div>
                            </Link>
                        </div>
                        
                )
            }
        </div>
    )
}

export default Searches
