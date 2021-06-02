import React , { useContext, useState } from 'react'

import tabStyles from './tabs.module.scss'

import Context from '../../context'

const Tabs = ({ page }) => {

    const context = useContext(Context)

    const { tabs, getPageTabs } = context.value
    const pageTabs = getPageTabs(page, tabs)
    const pageTitle = page

    const tabNames = pageTabs.tabNames
    const [ tabOne, tabTwo ] = tabNames;
    const tabOneIndex = tabNames.indexOf(tabOne)
    const tabTwoIndex = tabNames.indexOf(tabTwo)

    const [ activeTabIndex, setActiveTabIndex ] = useState(tabOneIndex)

    const tabClick = (tabIndex) => {
        setActiveTabIndex(tabIndex)

        //finds the tabs for the current page in context.value.tabs, toggles its 'active' value and updates the value of context.value.tabs
        tabs.splice(tabs.findIndex(({ page }) => page === pageTitle), 1, {...pageTabs, isTabOneActive: tabIndex === 0 ? true : false})

        context.setValue({
            ...context.value,
            tabs: tabs
        })

    }

    const setClassName = (tabIndex) => {
        return activeTabIndex === tabIndex ? tabStyles.active : '' 
    }

    return (
        <div className={tabStyles.tabs}>
            <button className={setClassName(tabOneIndex)} onClick={() => tabClick(tabOneIndex)}>
                { tabOne }
            </button>
            <button className={setClassName(tabTwoIndex)} onClick={() => tabClick(tabTwoIndex)}>
                { tabTwo }
            </button>
        </div>
    )
}

export default Tabs
