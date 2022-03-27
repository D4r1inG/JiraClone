import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'

export default function ContentMain(props) {

    const { projectDetail } = props
    const dispatch = useDispatch()
    const handleDragEnd = (res) => {
        let { source, destination, draggableId } = res
        let { projectId, taskId } = JSON.parse(draggableId)
        if (!destination) {
            return
        }
        if (source.droppableId === destination.draggableId) {
            return
        }
        dispatch({
            type: 'UPDATE_TASK_STATUS_SAGA',
            taskStatusUpdate: {
                'taskId': taskId,
                'statusId': destination.droppableId,
                'projectId': projectId
            }
        })
    }

    const renderCardTaskList = () => {
        return <DragDropContext onDragEnd={handleDragEnd}>
            {projectDetail.lstTask?.map((taskList, index) => {
                return <Droppable key={index} droppableId={taskList.statusId}>
                    {(provided) => {
                        return <div className="card pb-3" style={{ width: '17rem', height: 'auto' }}>
                            <div className="card-header">
                                {taskList.statusName}
                            </div>
                            <div ref={provided.innerRef}
                                {...provided.droppableProps}
                                key={index}
                                className="list-group list-group-flush" style={{ height: '100%' }}>
                                {taskList.lstTaskDeTail.map((task, index) => {
                                    return <Draggable key={task.taskId.toString()} index={index} draggableId={JSON.stringify({ projectId: task.projectId, taskId: task.taskId })}>
                                        {(provided) => {
                                            return <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                key={index}
                                                className="list-group-item" data-toggle="modal" data-target="#infoModal" onClick={() => {
                                                    dispatch({
                                                        type: 'GET_TASK_DETAIL_SAGA',
                                                        taskID: task.taskId
                                                    })
                                                }}>
                                                <p style={{ fontWeight: 600 }}>
                                                    {task.taskName}
                                                </p>
                                                <div className="block" style={{ display: 'flex' }}>
                                                    <div className="block-left">
                                                        <i className="fa fa-bookmark" />
                                                        <i className="fa fa-arrow-up ml-1" />
                                                    </div>
                                                    <div className="block-right w-50">
                                                        <div className="avatar-group" >
                                                            <div className='row'>
                                                                {task.assigness.map((member, index) => {
                                                                    return <div key={index} className="avatar col-4 p-0 mb-1">
                                                                        <img src={member.avatar} alt={member.userId} />
                                                                    </div>
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }}
                                    </Draggable>


                                })}
                            </div>
                            {provided.placeholder}
                        </div>
                    }}

                </Droppable>
            })}
        </DragDropContext>
    }

    return (
        <div className="content" style={{ display: 'flex' }}>
            {renderCardTaskList()}
        </div>
    )
}
