import { Job } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../apiClient";

interface InitialState {
  jobs: Job[];
  loading: boolean;
  loadingMore: boolean;
  err: string;
  hasMore: boolean;
  totalPages: number;
  total: number;
}
const initialState: InitialState = {
  jobs: [],
  loading: false,
  loadingMore: false,
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
    console.log("pppppppppp", filters);

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
      });
  },
});

export default jobsSlice.reducer;