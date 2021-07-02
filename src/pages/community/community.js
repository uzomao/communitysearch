import React, { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../../components/header/header'
import { supabase } from '../../App'
import communityStyles from './community.module.scss'

const Community = () => {

    const profileName = useParams().name

    const [ profile, setProfile ] = useState(null)
    const [ communityMemberNames, setCommunityMemberNames ] = useState([])

    const initialize = useCallback(async() => {
        let { data: people, error } = await supabase
            .from('person')
            .select('*')
            if (error) console.log("error", error);
            else {
                const currentUser = people.filter(({ name }) => name === profileName)[0]
                setProfile(currentUser)

                let names = []
                const communityMembers = people.filter(({ id }) => currentUser.community.includes(id))
                for (const member of communityMembers) {names.push(member.name)}
                setCommunityMemberNames(names)
            }
    }, [setProfile, setCommunityMemberNames, profileName])


    useEffect(() => {
        initialize().catch(console.error);
    }, [initialize]);

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
                    communityMemberNames.map((name, index) =>
                        <Link key={index} 
                            to={`/profile/${name}`} 
                            className={`default-link ${communityStyles.circle} ${communityStyles.member}`}
                            style={{transform: positionMember(index)}}
                        >
                            {name}
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
