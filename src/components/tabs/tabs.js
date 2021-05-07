import React from 'react'

import tabStyles from './tabs.module.scss'

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
