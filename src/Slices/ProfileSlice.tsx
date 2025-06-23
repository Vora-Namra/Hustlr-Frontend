/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice} from "@reduxjs/toolkit";
import { updateProfile } from "../Services/ProfileService";

const profileSlice= createSlice({
    name:"profile",
    initialState:{},
    reducers:{
        changeProfile:(state,action)=>{
            state=updateProfile(action.payload);
            return state;
        },
        setProfile:(state,action)=>{
            state=action.payload
            return state;
        }
    }
    
});

export const {changeProfile,setProfile}=profileSlice.actions;
export default profileSlice.reducer;
