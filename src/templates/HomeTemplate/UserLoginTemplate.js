import React, {useState, useEffect} from 'react'
import { Route } from 'react-router-dom/cjs/react-router-dom.min'
import { Button, Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

export const UserLoginTemplate = (props) => {
    let { Component, ...restRoute } = props

    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    useEffect(()=>{
        window.onresize = ()=>{
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
    },[])

    return <Route {...restRoute} render={(propsRoute) => {
        return <>
            <Layout >
                <Sider width={3 * size.width/4} style={{height: size.height,backgroundImage: `url(http://picsum.photos/${3 * size.width / 4}/${size.height})`, backgroundSize: '100%' }}>
                </Sider>
                <Content >
                    <Component {...propsRoute} />
                </Content>
            </Layout>
        </>
    }} />
}   