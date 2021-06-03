import React from 'react'
import headerStyles from './header.module.scss'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'

const Header = () => {
    return (
        <header className={headerStyles.header}>
            <h2>
                <Link to='/' className="default-link">community.search</Link>
            </h2>

            <div className={headerStyles.right}>
                <Link to='/post' className={headerStyles.button}>
                    find something
                </Link>
                <img 
                    className={headerStyles.logo} 
                    src={logo} 
                    alt="community search logo, a large circle surrounded by five smaller circles" 
                />
            </div>
        </header>
    )
}

export default Header