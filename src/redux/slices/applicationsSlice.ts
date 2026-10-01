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


export const getApplicationsAction = createAsyncThunk(
    "applications/all",
    async ({filters }: {  filters?: any })=>{
         let url = `applications`;
      if (filters && filters.status) {
        console.log("Fetching applications with status:", filters.status);
        url += `?status=${filters.status}`;
      }
        console.log("Fetching applications...");
        return await axiosInstance.get(url).then((result)=> result.data);
    }
)
export const updateMessageAction = createAsyncThunk(
    "applications/update",
    async ({ id, message }: { id: string; message: string }, { rejectWithValue }) => {
        try {
            const result = await axiosInstance.patch(`applications/${id}`, { message });
            return result.data;
        } catch (error) {
            return rejectWithValue("Failed to update message");
        }
    }
)

     






const applicationsSlice = createSlice({
    name:"applications",
    initialState,
    reducers:{},
    extraReducers:(builder)=>
        builder

       .addCase(getApplicationsAction.pending,(state)=>{
        state.loading = true 
       })
       .addCase(getApplicationsAction.fulfilled,(state,acttion)=>{
        
        state.loading = false
        state.error = "" 
        state.applications = acttion.payload
       })
       .addCase(getApplicationsAction.rejected,(state)=>{
        state.loading = false
        state.error = "Failed to fetch applications"
       })
       .addCase(updateMessageAction.pending,(state)=>{
        state.loading = true 
       })
       .addCase(updateMessageAction.fulfilled,(state,acttion)=>{
        
        state.loading = false
        state.error = "" 
        state.applications = state.applications.map((app: any) =>
          app.id === acttion.payload.id ? acttion.payload : app
        );
       })
       .addCase(updateMessageAction.rejected,(state)=>{
        state.loading = false
        state.error = "Failed to update message"
       })
 })


export default applicationsSlice.reducer;