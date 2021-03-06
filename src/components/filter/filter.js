import React, { useState } from 'react'
import filterStyles from './filter.module.scss'
import categories from '../../categories.json'
import { MdClose } from "react-icons/md";

const Filter = ({ filter, setFilter, setShowPastSearches }) => {

    const [ isActive, setIsActive ] = useState(false)

    //time filters
    const oldest = 'oldest first'
    const newest = 'newest first'
    const random = 'what is time?'

    const filterBy = (category) => {
        setFilter(category)
        setIsActive(false)
    }

    return (
        <div className={filterStyles.container}>
            {
                isActive ?
                    <div>
                        <button className="text-btn-regular" onClick={() => setIsActive(false)}>
                            <MdClose className='close-btn' />
                        </button>
                        <div className={`mt mb ${filterStyles.filter}`}>
                            <h3>filter by</h3>
                            <div className={filterStyles.category}>
                                <h3>category</h3>
                                <div className={filterStyles.categories}>
                                    {
                                        categories.map((category, index) => 
                                            <button key={index} 
                                                className="text-btn-regular" 
                                                onClick={() => filterBy(category)}
                                                id={`category-${category}`}
                                            >
                                                {category}
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                            <div>
                                <h3>time</h3>
                                <p>{oldest}</p>
                                <p>{newest}</p>
                                <p>{random}</p>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <button className="text-btn" style={{padding: 0}} onClick={() => setIsActive(true)}>
                            filter
                        </button>
                        { 
                            filter && 
                                <div className={filterStyles.info}>
                                    <p>showing searches for {filter}</p>
                                    <button className="text-btn-regular" onClick={() => setFilter(null)}>clear</button>
                                </div>
                        }
                    </div>
            }
            <div className={filterStyles.checkbox}>
                <input type="checkbox" onChange={e => setShowPastSearches(e.target.checked)} />
                <p>show past searches</p>
            </div>
        </div>
    )
}

export default Filter
