import React, { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../../components/header/header'
import { supabase } from '../../App'
import communityStyles from './community.module.scss'

const Community = () => {

    /**
     * the code below was copied and pasted from profile.js.
     * it needs to be DRYed
     */
    const profileName = useParams().name

    const [ profile, setProfile ] = useState(null)

    const getProfile = useCallback(async() => {
        let { data: person, error } = await supabase
            .from('person')
            .select('*')
            .eq('name', profileName)
            if (error) console.log("error", error);
            setProfile(person[0])
    }, [profileName])

    useEffect(() => {
        getProfile().catch(console.error);
    }, [getProfile]);

    // const positionNode = (index) => {
    //     let angle = 360/maxNumOfLessons
    //     if(index === 0){
    //         return `translate(${radius})`
    //     } else if(index === maxNumOfLessons/2){
    //         return `translate(-${radius})`
    //     } else {
    //         return `rotate(${index * angle}deg) translate(${radius}) rotate(-${index * angle}deg)`
    //     }
    // }

    let memberCount = 0;
    
    if(profile && profile.community){
        memberCount = profile.community.length
    }

    const radius = '175px'

    const positionMember = (index) => {
        let angle = 360/memberCount
        if(index === 0){
            return `translate(${radius})`
        } else if(index === memberCount/2){
            return `translate(-${radius})`
        } else {
            return `rotate(${index * angle}deg) translate(${radius}) rotate(-${index * angle}deg)`
        }
    }

    return (
        <main>
            <Header />

            { profile &&
                <div className={`page-header ${communityStyles.header}`}>
                    <h2>{`${profileName}'s community`}</h2>
                </div>
            }

            <div className={communityStyles.profiles}>
                {
                    profile && profile.community && profile.community.map((member, index) => 
                        <Link key={index} 
                            to={`/profile/${member}`} 
                            className={`default-link ${communityStyles.circle} ${communityStyles.member}`}
                            style={{transform: positionMember(index)}}
                        >
                            {member}
                        </Link>
                    )
                }

                <Link to={`/profile/${profileName}`}>
                    <div className={`${communityStyles.circle} ${communityStyles.center}`}>
                        {profileName}
                    </div>
                </Link>
            </div>

        </main>
    )
}

export default Community
