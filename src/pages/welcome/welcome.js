import React, { useState, useContext, useEffect } from 'react'
import Context from '../../context'
import Enjoying from '../../components/enjoying/enjoying'
import Invite from '../../components/invite/invite'
import PostSearch from '../../components/post/post'
import { supabase } from '../../App'
import Buttons from '../../lib/buttons'
import { useHistory } from 'react-router-dom'

const Welcome = () => {

    const { currentUser } = useContext(Context).value
    const { name, id } = currentUser ? currentUser : { name: '', id: null }

    const [currentStep, setCurrentStep] = useState(0)
    const inviteStep = 2 //index of the invite step

    const steps = [
        {
            text: `Welcome to community.search ${name}, let’s start by you telling us about a piece of content you’ve been enjoying`,
            render: <Enjoying profileId={id && id} isFormOpen={true} />
        },
        {
            text: `The things you’re enjoying will show up in the Enjoyment feed as well as on your profile page`,
            render: <div><Enjoying profileId={id && id } isFormOpen={false} /></div>,
            includeNextButton: true
        },
        {
            text: `The magic of community.search is, well, the community. Invite your friends and start enjoying the web in community.`,
            render: <Invite />,
            includeNextButton: true
        },
        {
            text: `Then of course there’s the search. On community.search, we are each other’s search engine. Is there something you’d like to discover?`,
            render: <PostSearch redirectOnPost={false} />,
            includeNextButton: false
        },
        {
            text: `Bravo! You just made your first search. It’s great to have you on board!`,
            render: <div><p>single search component</p></div>,
            includeNextButton: true
        }
    ]

    const isFinalStep = currentStep === steps.length - 1
    const { text, render, includeNextButton } = steps[currentStep]
    
    useEffect(() => {
        const onboardingListener = supabase
            .from('*')
            .on('*', payload => {
                currentStep !== inviteStep && payload.new.personId === id && setCurrentStep(currentStep + 1)
            })
            .subscribe()

        return () => {
            supabase.removeSubscription(onboardingListener)
        }
    }, [setCurrentStep, currentStep, id])

    let history = useHistory()

    return (
        currentUser &&
            <div>
                <p>{ text }</p>
                { render }
                { includeNextButton && 
                    <Buttons 
                        isDoubleBtn={false} 
                        btnText={ isFinalStep ? 'Finish' : 'Next' } 
                        onClick={() => { 
                            isFinalStep ? history.push('/')
                                        : setCurrentStep(currentStep+1) }
                        } 
                    /> 
                }
            </div>
    )
}

export default Welcome
