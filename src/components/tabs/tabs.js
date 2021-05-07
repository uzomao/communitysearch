import React from 'react'

import tabStyles from './tabs.module.css'

const Tabs = ({ tabOne, tabTwo }) => {
    return (
        <div className={tabStyles.tabs}>
            <button className={tabStyles.active}>
                { tabOne }
            </button>
            <button>
                { tabTwo }
            </button>
        </div>
    )
}

export default Tabs
