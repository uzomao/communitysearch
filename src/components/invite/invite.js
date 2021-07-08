import React, { useRef, useState, useContext } from 'react'
import Buttons from '../../lib/buttons'
import { getPerson, searchForPersonName } from '../../models/person'
import { addToCommunity } from '../../models/community'
import { SUCCESS_CODE, ERROR_CODE } from '../../App'
import Context from '../../context'
import inviteStyles from './invite.module.scss'

const Invite = () => {

    const inviteRef = useRef(null)

    const [responseMessage, setResponseMessage] = useState(null)

    const [searchResults, setSearchResults] = useState(null)
    const [invitee, setInvitee] = useState(null)
    const [resultText, setResultText] = useState(null)
    const [buttonText, setButtonText] = useState('Invite')

    const context = useContext(Context)
    const { currentUser } = context.value

    const setMessage = ( status, message )  => {
        setResponseMessage({ status, message })
    }

    const checkSubmission = () => {

        if(!invitee){
            return setResponseMessage(ERROR_CODE, 'Please enter a value')
        }

        const isEmailAddress = invitee.includes('@')

        sendInvite(invitee, isEmailAddress)

    }

    const sendInvite = async (invitee, isEmailAddress) => {

        const currentUserResolved = await currentUser
        
        if(isEmailAddress){
            // check if user is in app
            // if not send email
        } else {
            getPerson(invitee).then(res => {
                if(res === undefined){
                    setResponseMessage(ERROR_CODE, "This person doesn't seem to be on community.search")
                } else {
                    addToCommunity(currentUserResolved, invitee).then(({ data, status, message }) => {
                        status === SUCCESS_CODE && context.setValue({
                                                            ...context,
                                                            currentUser: { ...currentUser, community: data }
                                                        })
                        setMessage(status, message)
                        setInvitee(null)
                    })
                }
            })
        }
    }

    const searchForName = () => {
        const name = inviteRef.current.value

        if(!name.includes('@')){
            searchForPersonName(name).then(res => {
                if(res.length === 0) { setSearchResults(null); setResultText(`There doesn't seem to be a community.search account matching ${name}`)}
                else { setSearchResults(res) ; resultText && setResultText(null) }
            })  
        } else {
            //
        }
    }

    return (
        <>
            { responseMessage && <p className={responseMessage.status}>{responseMessage.message}</p> }

            <div className="form">
                {
                    invitee ?
                        <div>
                            <p>Invite {invitee}?</p>
                            <button className="mt text-btn-regular subtext" onClick={() => { 
                                setInvitee(null);
                                setButtonText('Invite')
                            }}>clear</button>
                        </div>
                        :
                         <input type="text" placeholder="friend's email address or community.search name" ref={inviteRef} onChange={() => searchForName()} /> 
                }
                {
                    searchResults &&
                        <ul className={inviteStyles.dropdown}>
                            {
                                searchResults.map(({ name, index }) => 
                                    <li key={index} onClick={() => { 
                                        setButtonText('add to your community');
                                        setInvitee(name); 
                                        setSearchResults(null)
                                    } } role="button">{name}</li>
                                )
                            }
                        </ul>
                }
                { resultText ?
                    <p>{resultText}</p>
                    :
                    <Buttons btnText={buttonText} isDoubleBtn={true} onClick={() => checkSubmission()} />
                }
            </div>
        </>
    )
}

export default Invite
