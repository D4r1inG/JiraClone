import React, { useState } from 'react'
import _ from 'lodash'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'




export default function DrapAndDropDnD() {
    const [state, setState] = useState({
        toDo: {
            id: 'toDo',
            item: [
                { id: 1, taskName: 'task 1' },
                { id: 2, taskName: 'task 2' },
                { id: 3, taskName: 'task 3' },
            ]
        },
        inProgress: {
            id: 'inProgress',
            item: [
                { id: 4, taskName: 'task 4' },
                { id: 5, taskName: 'task 5' },
                { id: 6, taskName: 'task 6' },
            ]
        },
        done: {
            id: 'done',
            item: [
                { id: 7, taskName: 'task 7' },
                { id: 8, taskName: 'task 8' },
                { id: 9, taskName: 'task 9' },
            ]
        }
    })

    const handleDragEnd = (res)=>{
        let {destination, source} = res
        if(!destination){
            return 
        }
        if(destination.droppableId === source.droppableId && destination.index === source.index){
            return
        }

        let temp = {...state[source.droppableId].item[source.index]}
        let index = state[source.droppableId].item.findIndex(item => item.id === temp.id)
        state[source.droppableId].item.splice(index, 1)

        let dropDestination = state[destination.droppableId].item
        dropDestination.splice(destination.index, 0, temp)

        setState(state)
    }

    return (
        <div className='container'>
            <h3 className='text-center display-4' >Demo Drag and Drop</h3>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className='row'>
                    {_.map(state, (statusTask, index) => {
                        return <Droppable droppableId={statusTask.id} key={index}>
                            {(provided) => {
                                return <div key={index} className='col-4'
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}>
                                    <div className='bg-dark m-1 p-4'>
                                        <h3 className='text-white text-center'>{statusTask.id}</h3>
                                        {statusTask.item.map((item, index) => {
                                            return <Draggable key={item.id} index={index}
                                                draggableId={item.id.toString()}
                                            >
                                                {(provided) => {
                                                    return <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className='p-3 m-3 bg-white'>
                                                        {item.taskName}
                                                    </div>
                                                }}
                                            </Draggable>
                                        })}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            }}
                        </Droppable>
                    })}
                </div>
            </DragDropContext>
        </div>
    )
}
