import React, { useState } from 'react'

import Header from '../../components/header/header'
import Searches from '../../components/searches/searches'
import Filter from '../../components/filter/filter'
import Tabs from '../../components/tabs/tabs'

import indexStyles from './index.module.scss'

const Index = ({ page }) => {

    const [ filter, setFilter ] = useState(null)
    const [ showPastSearches, setShowPastSearches] = useState(false)

    return (
        <div>
            <Header />
            <Tabs page={page} />
            <div className={indexStyles.filter}>
                <Filter filter={filter} setFilter={setFilter} setShowPastSearches={setShowPastSearches} />
            </div>
            <Searches page={page} filter={filter} showPastSearches={showPastSearches} />
        </div>
    )
}

export default Index
