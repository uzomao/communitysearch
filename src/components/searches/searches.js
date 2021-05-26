import React, { useEffect, useState, useCallback } from 'react'
import searchStyles from './searches.module.scss'
import { supabase } from '../../App'
import { getTime } from '../../lib/helpers'
import { Link } from 'react-router-dom'

const Searches = ({ pageTabs, filter }) => {
    
    const [ searches, setSearches ] = useState([])
    
    //returns a memoized callback to ensure that the effect is only called when 
    //dependencies (pageTabs.isTabOneActive) changes
    const getSearches = useCallback(async () => {
        let { data: searches, error } = await supabase
            .from("searches")
            .select("*, person!personId(*)")
            .eq('isInCommunity', pageTabs.isTabOneActive)
            .order("id", { ascending: false });
            if (error) console.log("error", error);
            setSearches(searches);
    }, [pageTabs.isTabOneActive])

    //there must be a more intelligent way to do this ffs
    const getSearchesWithFilter = useCallback(async () => {
        let { data: searches, error } = await supabase
            .from("searches")
            .select("*, person!personId(*)")
            .eq('isInCommunity', pageTabs.isTabOneActive)
            .eq('category', filter)
            .order("id", { ascending: false });
            if (error) console.log("error", error);
            setSearches(searches);
    }, [pageTabs.isTabOneActive, filter])


    useEffect(() => {
        filter ? getSearchesWithFilter().catch(console.error) : getSearches().catch(console.error);
    }, [getSearches, getSearchesWithFilter, filter]);

    return (
        <div>
            {
                searches.map(({ id, title, description, createdAt, category, isFound, person: { name } }, index) => {
                        
                        const searchTitle = `${name} is looking for a ${category.toLowerCase()}: ${title}`

                        return <div className={searchStyles.search} key={index}>
                            <Link 
                                to={{
                                    pathname: `/search/${id}`,
                                    state: {
                                        search: { id: id, title: searchTitle, description: description, createdAt: createdAt}
                                    }
                                }}
                                className='default-link'
                            >
                                <h3>{searchTitle}</h3>
                                <p>{description}</p>
                                <div className={searchStyles.footer}>
                                    { isFound && <p className={searchStyles.found}>found :)</p>}
                                    <p>searched {getTime(createdAt)}</p>
                                </div>
                            </Link>
                        </div>
                        
                })
            }
        </div>
    )
}

export default Searches
