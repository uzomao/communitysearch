import React, { useEffect, useState } from 'react'
import searchStyles from './search.module.scss'
import { supabase } from '../../App'

const Searches = ({ pageTabs }) => {

    // const filteredSearches = searches.filter(({ isInCommunity }) => pageTabs.isTabOneActive ?
    //                                                         isInCommunity === true : isInCommunity === false)
    
    const [ searches, setSearches ] = useState([])

    useEffect(() => {
        getSearches().catch(console.error);
    }, []);
    
    const getSearches = async () => {
        let { data: searches, error } = await supabase
            .from('searches')
            .select('*')
            .order("id", { ascending: false });
            if (error) console.log("error", error);
            setSearches(searches);
    }

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
                                <p>searched {createdAt}</p>
                            </div>
                        </div>
                )
            }
        </div>
    )
}

export default Searches
