import React, { useContext } from 'react'
import menuStyles from './menu.module.scss'
import { Link } from 'react-router-dom'
import Context from '../../context'
import { MdClose } from "react-icons/md";

const Menu = ({ setShowMenu }) => {

    const { currentUser } = useContext(Context).value
    const currentUserName = currentUser ? currentUser[0].name : ''

    return (
       <main className={menuStyles.menu}>
           <button className="text-btn-regular" onClick={() => setShowMenu(false)}>
                <MdClose className={`close-btn ${menuStyles.close}`} />
            </button>

           <Link to='/' className={`default-link ${menuStyles.link} ${menuStyles.center}`}>
               index
           </Link>

           <Link to='/about' id={menuStyles.about} className={`default-link ${menuStyles.link} ${menuStyles.surrounding}`}>
               about
           </Link>

           <Link to={`/profile/${currentUserName}`} id={menuStyles.profile} className={`default-link ${menuStyles.link} ${menuStyles.surrounding}`}>
               profile
           </Link>

           <Link to={`/profile/${currentUserName}/community`} id={menuStyles.community} className={`default-link ${menuStyles.link} ${menuStyles.surrounding}`}>
               community
           </Link>

           <Link to='/settings' id={menuStyles.settings} className={`default-link ${menuStyles.link} ${menuStyles.surrounding}`}>
               settings
           </Link>

           <Link to='/invite' id={menuStyles.invite} className={`default-link ${menuStyles.link} ${menuStyles.surrounding}`}>
               invite
           </Link>

           <Link to='/post' id={menuStyles.search} className={`default-link ${menuStyles.link} ${menuStyles.surrounding}`}>
               search
           </Link>
       </main>
    )
}

export default Menu
