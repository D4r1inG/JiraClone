import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    SearchOutlined,
    PlusSquareOutlined,
    ReloadOutlined
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { OPEN_DRAWER } from '../../redux/constants/JiraApp/JiraApp';
import FormCreateTask from '../forms/FormCreateTask';


export default function SideBarJiraApp(props) {

    const { Header, Content, Footer, Sider } = Layout;
    const { SubMenu } = Menu;

    const [state, setState] = useState({
        collapsed: true,
    })
    const dispatch = useDispatch()

    const [modeState, setMode] = useState(true)

    const onCollapse = collapsed => {
        setState({ collapsed });
    };

    return (
        <Layout style={{ minHeight: '100vh', zIndex: 100, position: 'fixed' }}>
            <Sider theme={modeState ? 'dark' : 'light'} collapsible collapsed={state.collapsed} onCollapse={onCollapse}>
                <Menu theme={modeState ? 'dark' : 'light'} defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<SearchOutlined />}>
                        Search task
                    </Menu.Item>
                    <Menu.Item key="2" icon={<PlusSquareOutlined />} onClick={() => {
                        dispatch({
                            type: 'OPEN_FORM_CREATE_TASK',
                            Component: <FormCreateTask />,
                            title: 'Create task'
                        })
                    }}>
                        Create task
                    </Menu.Item>
                    {/* <Menu.Item key="9" icon={<ReloadOutlined />} onClick={() => {
                        setMode(!modeState)
                    }}>
                        Change theme
                    </Menu.Item> */}
                </Menu>
            </Sider>
        </Layout >
    )
}
