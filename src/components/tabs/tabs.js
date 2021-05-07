import React from 'react'

import tabStyles from './tabs.module.scss'

const Tabs = ({ tabs }) => {

    const [ tab1, tab2 ] = tabs;

    return (
        <div className={tabStyles.tabs}>
            <button className={tabStyles.active}>
                { tab1.name }
            </button>
            <button>
                { tab2.name }
            </button>
        </div>
    )
}

export default Tabs
