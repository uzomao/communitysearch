import React from 'react'
import searches from '../../data.json'

import searchStyles from './search.module.scss'

const Searches = ({ pageTabs }) => {

    const filteredSearches = searches.filter(({ isInCommunity }) => pageTabs.isTabOneActive ?
                                                            isInCommunity === true : isInCommunity === false)                                  

    return (
        <div>
            {
                filteredSearches.map(({ title, description, createdAt, suggestionCount, isFound }, index) => 
                        <div key={index} className={searchStyles.search}>
                            <h3>{title}</h3>
                            <p>{description}</p>
                            <div className={searchStyles.footer}>
                                { isFound && <p className={searchStyles.found}>found :)</p>}
                                <p>{suggestionCount} suggestions</p>
                                <p>searched {createdAt}</p>
                            </div>
                        </div>
                )
            }
        </div>
    )
}

export default Searches
