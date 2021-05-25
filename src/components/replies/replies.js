import React, { useState, useEffect } from 'react'
import { supabase } from '../../App'
import repliesStyle from './replies.module.scss'

const Replies = ({ suggestionId }) => {

    const [ replies, setReplies ] = useState([])

    const getReplies = async () => {

        let { data: replies, error } = await supabase
            .from('reply')
            .select('*, person!authorID(name)')
            .eq('suggestionID', suggestionId)
            if (error) console.log("error", error);
            setReplies(replies);
    }

    useEffect(() => {
        getReplies().catch(console.error);
    })

    return (
        <div>
            {
                replies.map(( { body, person: {name} }, index ) => 
                    <p key={index} className={repliesStyle.reply}><span>{name}: </span>{body}</p>
                )
            }
        </div>
    )
}

export default Replies
