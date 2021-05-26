import React, { useContext, useState } from 'react'

import Header from '../../components/header/header'
import Searches from '../../components/searches/searches'
import Filter from '../../components/filter/filter'
import Tabs from '../../components/tabs/tabs'

import indexStyles from './index.module.scss'

import Context from '../../context'

const Index = ({ page }) => {

    const { tabs, getPageTabs } = useContext(Context).value

    const pageTabs = getPageTabs(page, tabs)

    const [ filter, setFilter ] = useState(null)

    return (
        <div>
            <Header />
            <Tabs 
                page={page}
                pageTabs={pageTabs}
                tabsDetails={[
                    {index: 0, name: "Your Community"},
                    {index: 1, name: "The Larger Network"}
                ]}
            />
            <div className={indexStyles.filter}>
                <Filter filter={filter} setFilter={setFilter} />
                <div className={indexStyles.checkbox}>
                    <input type="checkbox" />
                    <p>show past searches</p>
                </div>
            </div>
            <Searches page={page} pageTabs={pageTabs} filter={filter} />
        </div>
    )
}

export default Index
