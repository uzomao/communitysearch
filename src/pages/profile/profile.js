import React, { useState } from 'react'
import Header from '../../components/header/header'
import Tabs from '../../components/tabs/tabs'
import Searches from '../../components/searches/searches'
import Filter from '../../components/filter/filter'

const Profile = ({ page }) => {

    const [ filter, setFilter ] = useState(null)
    const [ showPastSearches, setShowPastSearches] = useState(false)

    return (
        <div>
            <Header />

            <Tabs page={page} />
            <div>
                <Filter filter={filter} setFilter={setFilter} setShowPastSearches={setShowPastSearches} />
            </div>
            <Searches page={page} filter={filter} showPastSearches={showPastSearches} />
        </div>
    )
}

export default Profile
