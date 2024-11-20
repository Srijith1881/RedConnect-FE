import {createSlice} from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "userdata",
    initialState: {
        userdata: null
    },
    reducers: {
        login: (state, action) => {
            state.userdata = action.payload
        },
        logout: (state) => {
            state.userdata = Login
        // invalidate: (state, {payload}) => {
        //     payload.forEach(item =>{
        //         state[itme] = false
        //     })
        // }
        }
    }
})

export const {login, logout} = userSlice.actions
export const selectUser = (state) => state.userdata.userdata
export default userSlice.reducer