import React, { useContext } from 'react'
import searches from '../../data.json'

import searchStyles from './search.module.scss'

import Context from '../../context'

const Searches = () => {

    const { activeHomeTabIndex } = useContext(Context)

    const getFilterValue = ( activeHomeTabIndex ) => {
        return activeHomeTabIndex === 0 ? true : false
    }

    return (
        <div>
            {
                searches.filter(({ isInCommunity }) => isInCommunity === getFilterValue(activeHomeTabIndex))
                    .map(({ title, description, createdAt, suggestionCount, isFound }, index) => 
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
