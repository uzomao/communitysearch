import React from 'react'

import Header from '../../components/header/header'
import Searches from '../../components/searches/searches'
import Filter from '../../components/filter/filter'
import Tabs from '../../components/tabs/tabs'

import indexStyles from './index.module.scss'

const Index = () => {
    return (
        <div>
            <Header />
            <Tabs tabOne="Your Community" tabTwo="The Larger Network" />
            <div className={indexStyles.filter}>
                <Filter />
                <div className={indexStyles.checkbox}>
                    <input type="checkbox" />
                    <p>show past searches</p>
                </div>
            </div>
            <Searches />
        </div>
    )
}

export default Index
