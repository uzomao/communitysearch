import React, { useState, useEffect, useRef, useContext } from 'react'
import { supabase } from '../../App'
import repliesStyle from './replies.module.scss'
import { MdClose } from "react-icons/md";
import Context from '../../context'

const Replies = ({ suggestionId, enableReplyForSuggestionId, closeReplyBox }) => {

    const { currentUser } = useContext(Context).value

    const [ replies, setReplies ] = useState([])
    const [ errorText, setErrorText ] = useState('')

    const replyRef = useRef('')

    const getReplies = async () => {

        let { data: replies, error } = await supabase
            .from('reply')
            .select('*, person!authorID(name)')
            .eq('suggestionID', suggestionId)
            if (error) console.log("error", error);
            setReplies(replies);
    }

    const addReply = async () => {
        const { data: reply, error } = await supabase
            .from('reply')
            .insert([
                {   
                    'authorID': currentUser.id,
                    'body': replyRef.current.value, 
                    'suggestionID': suggestionId 
                },
            ])
            if(error) setErrorText(error.message)
            else {
                const newReply = {person: {name: currentUser.name}, ...reply[0]}
                setReplies([newReply, ...replies])
                replyRef.current.value = ''
                setErrorText(null)
                closeReplyBox()
            }
    }

    useEffect(() => {
        getReplies().catch(console.error);
    })

    return (
        <div>
            {
                errorText && <p className="error">{errorText}</p>
            }
            {
                enableReplyForSuggestionId === suggestionId &&
                    <div className={`mt mb ${repliesStyle.form}`}>
                        <input type="text" ref={replyRef} />
                        <button className="text-btn-regular" onClick={() => closeReplyBox()}>
                            <MdClose className='close-btn' />
                        </button>
                        <button className="text-btn-regular" onClick={() => addReply()}>Reply</button>
                    </div>
            }
            {
                replies.map(( { body, person: {name} }, index ) => 
                    <p key={index} className={repliesStyle.reply}><span>{name}: </span>{body}</p>
                )
            }
        </div>
    )
}

export default Replies
