import React, { useEffect, useState, useCallback, useContext } from 'react'
import searchStyles from './searches.module.scss'
import { supabase, pages } from '../../App'
import { getTime, formatCategory } from '../../lib/helpers'
import { Link } from 'react-router-dom'
import Context from '../../context'

const Searches = ({ page, filter, showPastSearches, profile }) => {
    
    const [ searches, setSearches ] = useState([])

    const { tabs, getPageTabs, currentUser } = useContext(Context).value
    const isTabOneActive = getPageTabs(page, tabs).isTabOneActive
    
    //returns a memoized callback to ensure that the effect is only called when 
    //dependencies (pageTabs.isTabOneActive) changes
    const getSearches = useCallback(async () => {
        let { data: searches, error } = await supabase
            .from("searches")
            .select("*, person!personId(*)")
            .order("id", { ascending: false });
            if (error) console.log("error", error);
            setSearches(searches)
    }, [])

    useEffect(() => {
        getSearches().catch(console.error);
    }, [getSearches]);

    const filterByTimeAndCategory = (searches) => {
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

    const filterByCommunity = (searches) => {

        if(currentUser){
            if(isTabOneActive){
                return searches.filter(({ personId }) => currentUser.community.includes(personId))
            } else {
                return searches.filter(({ personId }) => !currentUser.community.includes(personId))
            }
        } else {
            return searches
        }
    }

    const filterByProfile = (searches) => {
        return searches.filter(({ personId}) => personId === profile.id)
    }

    const filterSearches = (searches) => {
        const initialFilter = filterByTimeAndCategory(searches)
        
        if (page === pages.index) return filterByCommunity(initialFilter)
        else if (page === pages.profile) return filterByProfile(initialFilter)
        else return initialFilter
    }

    const filteredSearches = filterSearches(searches)

    const formatProfilePageMsg = (profileName) => {

        return currentUser && profileName === currentUser.name ? 
            `You have not made any searches yet` 
            : 
            `${profileName} has not made any searches yet`
    }

    return (
        <div>
            {
                filteredSearches.length === 0 && isTabOneActive && page === pages.index &&
                    <div className={`mt ${searchStyles.content}`}>
                        <p>
                            Searches from people in your community show up here. It's empty now because you haven't added anyone yet.
                        </p>
                        <p>
                            <Link to='/invite'> Invite</Link> someone to get this tab popping.
                        </p>
                    </div>
            }
            {
                filteredSearches.length === 0 && isTabOneActive && page === pages.profile &&
                    <div className={`mt ${searchStyles.content}`}>
                        <p>{formatProfilePageMsg(profile.name)}</p>
                    </div>
            }
            {
                filteredSearches.map(({ id, title, description, createdAt, category, isFound, person: { name } }, index) => {
                        
                        const searchTitle = ` is looking for ${formatCategory(category.toLowerCase())}: ${title}`

                        return <div className={`${searchStyles.search} ${searchStyles.content}`} key={index}>
                            <Link 
                                to={{
                                    pathname: `/search/${id}`,
                                    state: {
                                        search: { id: id, name: name, title: searchTitle, description: description, createdAt: createdAt}
                                    }
                                }}
                                className='default-link'
                            >
                                <h3>{name} {searchTitle}</h3>
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
