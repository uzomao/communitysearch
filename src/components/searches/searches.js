import React, { useEffect, useState, useCallback, useContext } from 'react'
import searchStyles from './searches.module.scss'
import { supabase, pages } from '../../App'
import { getTime } from '../../lib/helpers'
import { Link } from 'react-router-dom'
import Context from '../../context'

const Searches = ({ page, filter, showPastSearches, profileId }) => {
    
    const [ searches, setSearches ] = useState([])

    const { tabs, getPageTabs } = useContext(Context).value
    const isTabOneActive = getPageTabs(page, tabs).isTabOneActive
    
    //returns a memoized callback to ensure that the effect is only called when 
    //dependencies (pageTabs.isTabOneActive) changes
    const getSearches = useCallback(async () => {
        let { data: searches, error } = await supabase
            .from("searches")
            .select("*, person!personId(*)")
            .eq('isInCommunity', isTabOneActive)
            .order("id", { ascending: false });
            if (error) console.log("error", error);
            setSearches(searches)
    }, [isTabOneActive])

    const profileGetSearches = useCallback(async () => {
        let { data: searches, error } = await supabase
            .from("searches")
            .select("*, person!personId(*)")
            .eq("personId", profileId)
            .order("id", { ascending: false });
            if (error) console.log("error", error);
            setSearches(searches)
    }, [profileId])

    /***
    const profileGetSuggestions => get Searches that contain suggestions by the person with profile ID
    then in useEffect, if pages.profile either getSearches or getSuggestions depending on a passed prop
    bonus: in render function, show the suggestion of the person underneath normal search display
    */

    useEffect(() => {
        page === pages.profile ? profileGetSearches().catch(console.error) : getSearches().catch(console.error);
    }, [getSearches, profileGetSearches, page]);

    const filterSearches = () => {
        if(!showPastSearches && filter) {

            return searches.filter(({ isFound }) => isFound === false).filter(({ category }) => category === filter)
            
        } else if(!showPastSearches){
            return searches.filter(({ isFound }) => isFound === false)
        } else if(filter){
            return searches.filter(( { category } ) => category === filter)   
        } else {
            return searches
        }
    }

    return (
        <div>
            {
                filterSearches().map(({ id, title, description, createdAt, category, isFound, person: { name } }, index) => {
                        
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
