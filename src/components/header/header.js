import React, { useState } from 'react'
import headerStyles from './header.module.scss'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'
import Menu from '../../components/menu/menu'

const Header = ({ showOnlyTitle }) => {

    const [ showMenu, setShowMenu ] = useState(false)

    return (
        <>
        <header className={headerStyles.header}>
            <h2>
                <Link to='/' className="default-link">community.search</Link>
            </h2>

        { !showOnlyTitle &&
            <div className={headerStyles.right}>
                <Link to='/post' className={headerStyles.button}>
                    find something
                </Link>
                <img 
                    className={headerStyles.logo} 
                    src={logo} 
                    alt="community search logo, a large circle surrounded by five smaller circles"
                    onClick={() => setShowMenu(true)}
                />
            </div>
        }
        </header>
        
        {
            showMenu &&
                <Menu setShowMenu={setShowMenu} />
        }
        </>
    )
}

export default Header