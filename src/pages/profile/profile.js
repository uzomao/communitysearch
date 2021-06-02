import React, { useState } from 'react'
import Header from '../../components/header/header'
import Tabs from '../../components/tabs/tabs'
import Searches from '../../components/searches/searches'
import Filter from '../../components/filter/filter'
import { useParams } from 'react-router-dom'

const Profile = ({ page }) => {

    const profileId = useParams().id

    const [ filter, setFilter ] = useState(null)
    const [ showPastSearches, setShowPastSearches] = useState(false)

    return (
        <div>
            <Header />

            <Tabs page={page} />
            <div>
                <Filter filter={filter} setFilter={setFilter} setShowPastSearches={setShowPastSearches} />
            </div>
            <Searches page={page} filter={filter} showPastSearches={showPastSearches} profileId={profileId} />
        </div>
    )
}

export default Profile
