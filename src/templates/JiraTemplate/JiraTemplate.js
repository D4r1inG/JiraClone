import React from 'react'
import { Route } from 'react-router-dom/cjs/react-router-dom.min'
import Headers from '../../components/Home/Header/Header'
import ContentMain from '../../components/JiraApp/Main/ContentMain'
import HeaderMain from '../../components/JiraApp/Main/HeaderMain'
import InfoMain from '../../components/JiraApp/Main/InfoMain'
import MenuJira from '../../components/JiraApp/MenuJira'
import ModalJiraApp from '../../components/JiraApp/ModalJiraApp/ModalJiraApp'
import SideBarJiraApp from '../../components/JiraApp/SideBarJiraApp'
import '../../index.css'

export const JiraTemplate = (props) => {
    const { Component, ...restRoute } = props

    return <Route {...restRoute} render={(propsRoute) => {
        return <>
            <div className="jira">

                <SideBarJiraApp />

                {/* Menu */}
                <MenuJira />

                {/* main */}
                <Component {...propsRoute} />
                <ModalJiraApp />
            </div>
        </>
    }} />
}   