import React, { useState, useEffect, useCallback, useContext } from 'react'
import Header from '../../components/header/header'
import Tabs from '../../components/tabs/tabs'
import Searches from '../../components/searches/searches'
import Filter from '../../components/filter/filter'
import { useParams, Link } from 'react-router-dom'
import profileStyles from './profile.module.scss'
import { supabase } from '../../App'
import Buttons from '../../lib/buttons'
import Context from '../../context'
import Enjoying from '../../components/enjoying/enjoying'

const Profile = ({ page }) => {

    const profileName = useParams().name

    const [ filter, setFilter ] = useState(null)
    const [ showPastSearches, setShowPastSearches] = useState(false)

    const [ profile, setProfile ] = useState(null)

    const [ successMsg, setSuccessMsg ] = useState(null)
    const [ errorMsg, setErrorMsg ] = useState(null)

    const { tabs, getPageTabs, currentUser } = useContext(Context).value
    const isTabOneActive = getPageTabs(page, tabs).isTabOneActive

    const getProfile = useCallback(async() => {
        let { data: person, error } = await supabase
            .from('person')
            .select('*')
            .eq('name', profileName)
            if (error) console.log("error", error);
            setProfile(person[0])
    }, [profileName])

    const addToCommunity = useCallback(async(name) => {

        const { data: person, error } = await supabase
            .from('person')
            .select('*')
            .eq('name', name)

            const { id: profileId } = person[0]
            const community = currentUser.community

            if(!community.includes(profileId)){
                const { error } = await supabase
                    .from('person')
                    .update([
                        { community: [...community, profileId] },
                    ])
                    .eq('id', currentUser.id)
                    if (error) console.log("error", error);
                    else {
                        setSuccessMsg(`${name} has been added to your community :)`)
                    }
            } else {
                setErrorMsg(`${name} is already in your community`)
            }
            if(error) console.log("error", error)
    }, [currentUser])

    useEffect(() => {
        getProfile().catch(console.error);

        if(successMsg){
            window.setTimeout(() => setSuccessMsg(null), 3000)
        } else if(errorMsg){
            window.setTimeout(() => setErrorMsg(null), 3000)
        }

    }, [getProfile, successMsg, errorMsg]);

    console.log(profile)

    return (
        profile &&
            <div>
                <Header />

                { successMsg && <p className="mt mb success-msg">{successMsg}</p>}
                { errorMsg && <p className="mt mb error">{errorMsg}</p>}

                <div className={profileStyles.header}>
                    { profile &&
                        <div>
                            <h2>{`${profileName}'s page`}</h2>
                            <div className={profileStyles.enjoying}>
                                <p className={`success-msg ${profileStyles.currently}`}>currently enjoying</p>
                                {<Enjoying profileId={profile.id} />}
                            </div>
                        </div>
                    }
                    <div className={profileStyles.buttons}>
                        <Buttons btnText="add to your community" onClick={() => addToCommunity(profileName)} />
                        <Link to={`/profile/${profileName}/community`}>
                            <Buttons btnText="view community" />
                        </Link>
                    </div>
                </div>

                <Tabs page={page} />
                <div>
                    <Filter filter={filter} setFilter={setFilter} setShowPastSearches={setShowPastSearches} />
                </div>
                {
                    isTabOneActive ?
                        <Searches page={page} filter={filter} showPastSearches={showPastSearches} profile={profile} />
                        :
                        <h1>Enjoyment!</h1>
                }
            </div>
    )
}

export default Profile
