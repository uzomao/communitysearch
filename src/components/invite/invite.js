import React, { useRef, useState, useContext } from 'react'
import Buttons from '../../lib/buttons'
import { getPerson, searchForPersonName } from '../../models/person'
import { addToCommunity } from '../../models/community'
import { SUCCESS_CODE, ERROR_CODE } from '../../App'
import Context from '../../context'
import inviteStyles from './invite.module.scss'

const Invite = () => {

    const inviteRef = useRef(null)

    const [ errorText, setErrorText ] = useState(null)
    const [ successMessage, setSuccessMessage ] = useState(null)

    const [searchResults, setSearchResults] = useState(null)
    const [invitee, setInvitee] = useState(null)
    const [resultText, setResultText] = useState(null)
    const [buttonText, setButtonText] = useState('Invite')

    const { currentUser } = useContext(Context).value

    const checkSubmission = () => {

        if(!invitee){
            return setErrorText('Please enter a value')
        }

        const isEmailAddress = invitee.includes('@')

        sendInvite(invitee, isEmailAddress)

    }

    const sendInvite = (invitee, isEmailAddress) => {
        
        if(isEmailAddress){
            // check if user is in app
            // if not send email
        } else {
            getPerson(invitee).then(res => {
                if(res === undefined){
                    setErrorText("This person doesn't seem to be on community.search")
                } else {
                    addToCommunity(currentUser, invitee).then(res => {
                        if(res.status === ERROR_CODE) setErrorText(res.message)
                        else if(res.status === SUCCESS_CODE) setSuccessMessage(res.message)

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
                if(res.length === 0) setResultText(`There doesn't seem to be a community.search account matching ${name}`)
                else { setSearchResults(res) ; resultText && setResultText(null) }
            })  
        } else {
            //
        }
    }

    return (
        <>
            { errorText && <p className="error">{errorText}</p> }
            { successMessage && <p className="success-msg">{successMessage}</p> }
            <div className="form">
                {
                    invitee ?
                        <div className="success-box">
                            <p>{invitee}</p>
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
                        <>
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
                        {resultText && <p>{resultText}</p>}
                        </>
                }
                <Buttons btnText={buttonText} isDoubleBtn={true} onClick={() => checkSubmission()} />
            </div>
        </>
    )
}

export default Invite
