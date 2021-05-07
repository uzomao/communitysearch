import React , { useContext, useState } from 'react'

import tabStyles from './tabs.module.scss'

import Context from '../../context'

const Tabs = ({ tabs }) => {

    const context = useContext(Context)

    const [ tab1, tab2 ] = tabs;
    const tab1Index = tab1.index;
    const tab2Index = tab2.index;

    const [ activeTabIndex, setActiveTabIndex ] = useState(tab1Index)

    const tabClick = (tabIndex) => {
        context.setValue({
            activeHomeTabIndex: tabIndex
        })
        setActiveTabIndex(tabIndex)
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
