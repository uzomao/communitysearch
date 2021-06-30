import React, { useState, useRef } from 'react'
import Buttons from '../../lib/buttons'
import { Link, useHistory } from 'react-router-dom'
import authForm from './authForm.module.scss'
import Header from '../../components/header/header'
import { supabase } from '../../App'
import logo from '../../images/logo.png'

const Login = () => {

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const [ successText, setSuccessText ] = useState(null)
    const [ errorText, setErrorText ] = useState(null)

    const history = useHistory()

    const signIn = async () => {

        const { user, session, error } = await supabase.auth.signIn({
            email: emailRef.current.value,
            password: passwordRef.current.value
        }, {
            redirectTo: 'http://localhost:3000'
        })

        if(error){
            setErrorText(error.message)
        } else {
            setErrorText('')
            setSuccessText('Logging you in...')
            history.push('/')
        }
    }

    return (
        <>

            <Header showOnlyTitle={true} />

            <div className="form">

                <img 
                    src={logo} 
                    alt="community search logo, a large circle surrounded by five smaller circles" 
                    style={{width: '90px', height: '90px'}}
                />

                <input type="email" placeholder="Your email" ref={emailRef} />

                <input type="password" placeholder="Enter a password" ref={passwordRef} />

                {errorText && <p className="error">{errorText}</p>}
                {successText && <p className="success-msg">{successText}</p>}

                <Buttons btnText="Log In" isDoubleBtn={true} onClick={() => signIn()}/>

                <p className={authForm.footnote}>New here? <Link to='/register'>Join</Link> community.search</p>
            </div>
        </>
    )
}

export default Login
