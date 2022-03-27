import React from 'react'
import { Route } from 'react-router-dom/cjs/react-router-dom.min'
import Headers from '../../components/Home/Header/Header'

export const HomeTemplate = (props) => {
    const { Component, ...restRoute } = props

    return <Route {...restRoute} render={(propsRoute) => {
        return <>
            <Headers />
            <Component {...propsRoute} />
        </>
    }} />
}   