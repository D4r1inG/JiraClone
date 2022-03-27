import { USER_SIGN_IN_API } from "../constants/JiraApp/JiraApp";

export const signInAction = (email, password ) => ({
    type: USER_SIGN_IN_API,
    userLogin: {
        email,
        password,
    },
    // history
})
