import React, { useRef, useState, useContext } from 'react'
import Buttons from '../../lib/buttons'
import { searchForPersonName, getNameFromEmailAddress } from '../../models/person'
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
    const [emailAddressInvite, setEmailAddressInvite] = useState(null)

    const context = useContext(Context)
    const { currentUser } = context.value

    const setMessage = ( status, message )  => {
        setResponseMessage({ status, message })
    }

    const sendInvite = async () => {

        const currentUserResolved = await currentUser

        if(!invitee){
            setMessage(ERROR_CODE, "Please enter a name or email address")
        } else if(invitee.includes('@')){
            sendEmail()
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
    }

    const searchForName = async () => {
        const inviteValue = inviteRef.current.value
        setEmailAddressInvite(null)
        setResponseMessage(null)

        if(!inviteValue.includes('@')){
            searchForPersonName(inviteValue).then(res => {
                if(res.length === 0) { setSearchResults(null); setResultText(`There doesn't seem to be a community.search account matching ${inviteValue}`)}
                else { setSearchResults(res) ; resultText && setResultText(null) }
            })  
        } else {
            getNameFromEmailAddress(inviteValue).then(res => {
                resultText && setResultText(null)
                //if a name is gotten from the email address entered, create a dropdown with just the name
                //otherwise, create a dropdown with just the email address
                if(res){
                    setSearchResults([{ name: res }])
                    setEmailAddressInvite(inviteValue)
                }else { 
                    setSearchResults([{ name: inviteValue }]) 
                }
            })
        }
    }

    const sendEmail = () => {
        console.log('email')
    }

    return (
        <>
            { responseMessage && <p className={responseMessage.status}>{responseMessage.message}</p> }

            <div className="form">
                {
                    invitee ?
                        <div>
                            <p>Invite {invitee} {emailAddressInvite && <span>({emailAddressInvite})</span>}?</p>
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
                                        name.includes('@') ? setButtonText('Invite') : setButtonText('add to your community');
                                        setInvitee(name); 
                                        setSearchResults(null)
                                    } } role="button">{name} {emailAddressInvite && <span>({emailAddressInvite})</span>}</li>
                                )
                            }
                        </ul>
                }
                { resultText ?
                    <p>{resultText}</p>
                    :
                    <Buttons btnText={buttonText} isDoubleBtn={true} onClick={() => sendInvite()} />
                }
            </div>
        </>
    )
}

export default Invite
