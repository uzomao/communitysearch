import React from 'react'
import headerStyles from './header.module.scss'
import { Link } from 'react-router-dom'

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
                <div className={headerStyles.logo}></div>
            </div>
        </header>
    )
}

export default Header