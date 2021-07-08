import React, { useRef, useState } from 'react'
import Buttons from '../../lib/buttons'
import { Link } from 'react-router-dom'
import authForm from './authForm.module.scss'
import Header from '../../components/header/header'
import { supabase } from '../../App'

const Register = () => {

    const emailRef = useRef(null)
    const nameRef = useRef(null)
    const passwordRef = useRef(null)
    const confirmPasswordRef = useRef(null)

    const [ isSuccess, setIsSuccess ] = useState(null)
    const [ errorText, setErrorText ] = useState(null)

    const signUp = async () => {
        const email = emailRef.current.value

        const { user, error } = await supabase.auth.signUp({
            email: email,
            password: passwordRef.current.value,
        }, {
            redirectTo: 'http://localhost:3000/welcome'
        })

        if(error){
            setErrorText(error.message)
        } else {
            await supabase
                .from('person')
                .insert([
                    { 
                        name: nameRef.current.value,
                        email: email,
                        userId: user.id
                    },
            ])

            setIsSuccess(true)
        }
    }

    return (
        <>

        <Header showOnlyTitle={true} />

        {isSuccess ? 

            <div className={authForm.success}>
                <p><span role="img" aria-label="seedling emoji">🌱</span>{` `}An email has been sent to you for verification{` `}<span role="img" aria-label="seedling emoji">🌱</span></p>
                <p className={authForm.small}>You will be redirected to the app once you confirm</p>
            </div>

            :

            <div className="form">
                <p>Start enjoying the internet at a more human pace</p>

                <input type="email" placeholder="Your email" ref={emailRef} />

                <input type="text" placeholder="Your name" ref={nameRef} />

                <input type="password" placeholder="Enter a password" ref={passwordRef} />

                <input type="password" placeholder="Confirm password" ref={confirmPasswordRef} />

                {errorText && <p className="error">{errorText}</p>}

                <Buttons btnText="Sign Up" isDoubleBtn={true} onClick={() => signUp()}/>

                <p className={authForm.footnote}>You can <Link to='/login'>log in</Link> here if you're not new to the app</p>
            </div>
        }
        </>
    )
}

export default Register
