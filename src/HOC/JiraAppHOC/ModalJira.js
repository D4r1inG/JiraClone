import React, { useState } from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_DRAWER, OPEN_DRAWER } from '../../redux/constants/JiraApp/JiraApp';

export default function ModalJira(props) {

    const { Option } = Select;

    const dispatch = useDispatch()

    const { visible, ComponentContentDrawer, callBackSubmit, projectName, submitDisabled} = useSelector(state => state.DrawerJiraAppReducer)

    const showDrawer = () => {
        dispatch({
            type: OPEN_DRAWER
        })
    };

    const onClose = () => {
        dispatch({
            type: CLOSE_DRAWER
        })
        dispatch({
            type: 'SET_DISABLED_SUBMIT',
            submitDisabled: false
        })
    };
    return (
        <>
            <Drawer
                title={`${projectName}`}
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={callBackSubmit} disabled={submitDisabled ? true : false} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                {ComponentContentDrawer}
            </Drawer>
        </>
    )
}
