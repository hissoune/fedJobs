import { Job } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../apiClient";
import Toast from 'react-native-toast-message';

interface InitialState {
  jobs: Job[];
  loading: boolean;
  loadingMore: boolean;
  job:Job | null 
  err: string;
  hasMore: boolean;
  totalPages: number;
  total: number;
}
const initialState: InitialState = {
  jobs: [],
  loading: false,
  loadingMore: false,
  job:null,
  err: "",
  hasMore: true,
  totalPages: 0,
  total:0
};
export const getJobsAction = createAsyncThunk(
  "jobs/getAll",
  async ({ page, filters }: { page: number; filters: any }, { rejectWithValue }) => {
    console.log("pppppppppp", filters);

    try {
      let url = `jobs?page=${page}`;
      if (filters && filters.priority) {
        url += `&priority=${filters.priority}`;
      }
      const result = await axiosInstance.get(url);

      return result.data;
    } catch (error) {
      console.log("can't get jobs", error);
      return rejectWithValue("Failed getting jobs");
    }
  }
);

export const loadMoreJobsAction = createAsyncThunk(
  "jobs/loadMore",
  async ({ page, filters }: { page: number; filters: any }, { rejectWithValue }) => {

    try {
      const startedAt = Date.now();

      let url = `jobs?page=${page}`;
      if (filters && filters.priority) {
        url += `&priority=${filters.priority}`;
      }
      const result = await axiosInstance.get(url);

      const elapsed = Date.now() - startedAt;

      if (elapsed < 800) {
        await new Promise((resolve) => setTimeout(resolve, 3000 - elapsed));
      }

      return result.data;
    } catch (error) {
      return rejectWithValue("Failed loading more jobs");
    }
  }
);

export const getJobAction = createAsyncThunk(
   "jobs/getOne",
   async (id:string)=>{
     return await axiosInstance.get(`jobs/${id}`).then((result)=> result.data)
   }
);

export const ApplyAction = createAsyncThunk(
    "applications/apply",
  async (
    { jobId, message }: { jobId: string; message: string },
    { rejectWithValue }
  ) => {
    
    try {
      const result = await axiosInstance.post("jobs/apply", { jobId, message });
      return result.data;
    } catch (err: any) {
      return rejectWithValue(
       err.response.data.message ||  "Failed applying for job"
      );
    }
    }
)


const jobsSlice = createSlice({
  name: "jobsSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getJobsAction.pending, (state) => {
        state.loading = true;
        state.err = "";
      })
      .addCase(getJobsAction.fulfilled, (state, action) => {
          state.loading = false;
          state.jobs = action.payload.jobs;
          state.hasMore = action.payload.hasMore;
          state.totalPages = action.payload.totalPages;
          state.total = action.payload.total;
      })
      .addCase(getJobsAction.rejected, (state) => {
         state.loading = false;
         state.err = "Failed getting jobs";
      })
      .addCase(loadMoreJobsAction.pending, (state) => {
          state.loadingMore = true;
      })
     .addCase(loadMoreJobsAction.fulfilled, (state, action) => {
          state.loadingMore = false;
          state.jobs.push(...action.payload.jobs);
          state.hasMore = action.payload.hasMore;
          state.totalPages = action.payload.totalPages;
          state.total = action.payload.total;
        })
    .addCase(loadMoreJobsAction.rejected, (state) => {
          state.loadingMore = false;
          state.err = "Failed loading more jobs";
      })
      .addCase(getJobAction.pending, (state) => {
          state.loading = true;
      })
     .addCase(getJobAction.fulfilled, (state, action) => {
          state.loading = false;
          state.job = action.payload
        })
    .addCase(getJobAction.rejected, (state) => {
          state.loading = false;
          state.err = "Failed loadingthis job ";
      })
      .addCase(ApplyAction.pending, (state) => {
          state.loading = true;
      })
     .addCase(ApplyAction.fulfilled, (state, action) => {
          state.loading = false;
          state.job = action.payload
        })
    .addCase(ApplyAction.rejected, (state,action) => {
          state.loading = false;          
          state.err = action.payload ? String(action.payload) : "something went wrong ! ";
         
      })
  },
});

export default jobsSlice.reducer;