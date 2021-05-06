import React from 'react'
import headerStyles from './header.module.css'

const Header = () => {
    return (
        <header className={headerStyles.header}>
            <h2>community.search</h2>

            <div className={headerStyles.right}>
                <button className={headerStyles.button}>find something</button>
                <div className={headerStyles.logo}></div>
            </div>
        </header>
    )
}

export default Header