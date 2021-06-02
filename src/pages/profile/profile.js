import React, { useState, useEffect, useCallback } from 'react'
import Header from '../../components/header/header'
import Tabs from '../../components/tabs/tabs'
import Searches from '../../components/searches/searches'
import Filter from '../../components/filter/filter'
import { useParams } from 'react-router-dom'
import profileStyles from './profile.module.scss'
import { supabase } from '../../App'
import Buttons from '../../lib/buttons'

const Profile = ({ page }) => {

    const profileId = useParams().id

    const [ filter, setFilter ] = useState(null)
    const [ showPastSearches, setShowPastSearches] = useState(false)

    const [ profile, setProfile ] = useState({})

    const getProfile = useCallback(async() => {
        let { data: person, error } = await supabase
            .from('person')
            .select('*')
            .eq('id', profileId)
            if (error) console.log("error", error);
            setProfile(person[0])
    }, [profileId])

    useEffect(() => {
        getProfile().catch(console.error);
    }, [getProfile]);

    const { name, bio } = profile

    return (
        profile &&
            <div>
                <Header />

                <div className={profileStyles.header}>
                    { profile &&
                        <div>
                            <h2>{`${name}'s page`}</h2>
                            <p className={profileStyles.bio}>{bio}</p>
                        </div>
                    }
                    <div className={profileStyles.buttons}>
                        <Buttons btnText="add to your community" />
                        <Buttons btnText="view community" />
                    </div>
                </div>

                <Tabs page={page} />
                <div>
                    <Filter filter={filter} setFilter={setFilter} setShowPastSearches={setShowPastSearches} />
                </div>
                <Searches page={page} filter={filter} showPastSearches={showPastSearches} profileId={profileId} />
            </div>
    )
}

export default Profile
