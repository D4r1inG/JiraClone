import React, { useEffect } from 'react'
import ContentMain from '../../../components/JiraApp/Main/ContentMain'
import HeaderMain from '../../../components/JiraApp/Main/HeaderMain'
import InfoMain from '../../../components/JiraApp/Main/InfoMain'
import { useSelector, useDispatch } from 'react-redux'


export default function IndexJira(props) {

    const dispatch = useDispatch()

    const projectDetail = useSelector(state => state.ProjectReducer.projectDetail)

    useEffect(() => {
        const { projectId } = props.match.params
        dispatch({
            type: 'GET_PROJECT_DETAIL_SAGA',
            id: projectId
        })
    }, [])

    return (
        <div className="main">
            <HeaderMain projectDetail={projectDetail} />
            <h3>{projectDetail.projectName}</h3>
            <InfoMain projectDetail={projectDetail} />
            <ContentMain projectDetail={projectDetail} />
        </div>
    )
}
