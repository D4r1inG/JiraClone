import { notification } from "antd";


export const notificationJira = (typeNoti, message, desc)=>{ notification[typeNoti]({
    message: message,
    description: desc    
})}