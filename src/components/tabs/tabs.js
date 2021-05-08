import React , { useContext, useState } from 'react'

import tabStyles from './tabs.module.scss'

import Context from '../../context'

const Tabs = ({ page, pageTabs, tabsDetails }) => {

    const context = useContext(Context)

    const [ tab1, tab2 ] = tabsDetails;
    const tab1Index = tab1.index;
    const tab2Index = tab2.index;

    const [ activeTabIndex, setActiveTabIndex ] = useState(tab1Index)

    const tabClick = (tabIndex) => {
        setActiveTabIndex(tabIndex)
        context.setValue({
            ...context.value,
            tabs: [{
                ...pageTabs,
                isTabOneActive: tabIndex === 0 ? true : false
            }]
        })
    }

    const setClassName = (tabIndex) => {
        return activeTabIndex === tabIndex ? tabStyles.active : '' 
    }

    return (
        <div className={tabStyles.tabs}>
            <button className={setClassName(tab1Index)} onClick={() => tabClick(tab1Index)}>
                { tab1.name }
            </button>
            <button className={setClassName(tab2Index)} onClick={() => tabClick(tab2Index)}>
                { tab2.name }
            </button>
        </div>
    )
}

export default Tabs
