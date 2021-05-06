import React from 'react'
import searches from '../../data.json'

import searchStyles from './search.module.css'

const Searches = () => {
    return (
        <div>
            {
                searches.map(({ title, description, createdAt }, index) => 
                    <div key={index} className={searchStyles.search}>
                        <h3>{title}</h3>
                        <p>{description}</p>
                        <p>{createdAt}</p>
                    </div>
                )
            }
        </div>
    )
}

export default Searches
