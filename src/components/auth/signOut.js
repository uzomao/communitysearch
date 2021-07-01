import React from 'react'
import { supabase } from '../../App'

const signOut = () => {

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if(error) console.log(error)
    }

    return (
        <p onClick={() => signOut()} style={{cursor: 'pointer', marginLeft: '1.5rem', alignSelf: 'flex-end', fontSize: '16px'}}>sign out</p>
    )
}

export default signOut
