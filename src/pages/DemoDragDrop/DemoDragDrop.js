import React, { useState } from 'react'

const defaultValue= [
    {id: 1, taskName: 'task 1'},
    {id: 2, taskName: 'task 2'},
    {id: 3, taskName: 'task 3'},
    {id: 4, taskName: 'task 4'},
    {id: 5, taskName: 'task 5'},
]


export default function DemoDragDrop() {

    const [taskList, setTaskList] = useState(defaultValue)

    const handleDragStart = (e, task, index) => {
        console.log(task, index)
    }

  return (
    <div className='container'>
        <h2 className='text-center'>Task list</h2>
        <div className='row'>
           <div className='col-4'></div>
           <div className='col-4 bg-dark text-white'>
               {taskList.map((item, index) => {
                   return <div draggable='true' className='bg-success m-3 p-3' key={index} onDragStart={(e) => {
                    handleDragStart(e, item, index)
                   }}>
                       {item.taskName}
                   </div>
               })}
           </div>
           <div className='col-4'></div>
        </div>
    </div>
  )
}
