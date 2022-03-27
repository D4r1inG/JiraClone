import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, DELETE_MEMBER, GET_TASK_DETAIL } from "../constants/JiraApp/TaskConstant"

const initialState = {
    taskDetail: {
        "priorityTask": {
            "priorityId": 1,
            "priority": "High"
        },
        "taskTypeDetail": {
            "id": 1,
            "taskType": "bug"
        },
        "assigness": [
            {
                "id": 913,
                "avatar": "https://ui-avatars.com/api/?name=Supper Hoàng",
                "name": "Supper Hoàng",
                "alias": "supper-hoang"
            },
            {
                "id": 909,
                "avatar": "https://ui-avatars.com/api/?name=admin_phu",
                "name": "admin_phu",
                "alias": "admin_phu"
            }
        ],
        "lstComment": [],
        "taskId": 2937,
        "taskName": "a",
        "alias": "a",
        "description": "<p>hvkjvkv</p>",
        "statusId": "3",
        "originalEstimate": 1,
        "timeTrackingSpent": 2,
        "timeTrackingRemaining": 1,
        "typeId": 1,
        "priorityId": 1,
        "projectId": 3434
    }
}

export const TaskReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_TASK_DETAIL:{
            return {...state, taskDetail: action.taskDetail}
        }

        case CHANGE_TASK_MODAL:{
            const {name, value} = action
            // console.log(name, value)
            return {...state, taskDetail: {...state.taskDetail, [name]: value}}
        }

        case CHANGE_ASSIGNESS:{
            state.taskDetail.assigness.push(action.userSelect)
            return {...state}
        }

        case DELETE_MEMBER: {
            state.taskDetail.assigness = [...state.taskDetail.assigness.filter(mem => mem.id !== action.id)]
            return {...state}
        }

        default:
            return state
    }
}
