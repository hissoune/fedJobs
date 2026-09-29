import { Application } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../apiClient";





interface InitialState {
    applications:Application[]
    application:Application | null 
    loading :boolean
    error:string
}

const initialState:InitialState = {
      applications:[],
    application: null ,
    loading :false,
    error:''
}


export const getApplcationsAction = createAsyncThunk(
    "applications/all",
    async ()=>{
        return await axiosInstance.get('applications').then((result)=> result.data);
    }
)






const applicationsSlice = createSlice({
    name:"applications",
    initialState,
    reducers:{},
    extraReducers:(builder)=>
        builder

       .addCase(getApplcationsAction.pending,(state)=>{
        state.loading = true 
       })
       .addCase(getApplcationsAction.fulfilled,(state,acttion)=>{
        state.loading = true 
        state.applications = acttion.payload
       })
       .addCase(getApplcationsAction.rejected,(state)=>{
        state.loading = true 
       })
 })


export default applicationsSlice.reducer;