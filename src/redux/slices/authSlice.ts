import { User } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../apiClient";
import { clearAuthToken, clearRefreshToken, saveAuthToken, saveRefreshToken } from "@/helpers/storage";




 interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  token: string | null;
  refreshToken: string | null;
}

 const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    loading:false,
    token: null,
    refreshToken: null,
};


export const loginAction = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { email: string; password: string }): Promise<{ userWithUrl:any, token: string; refreshToken: string }> => {
    const tokens = await axiosInstance.post("/auth/login", credentials).then((response) => response.data);
    console.log('ddddddd',tokens);
    console.log("tttttttttttttttt",tokens.refreshToken);
    
    await AsyncStorage.setItem("token", tokens.token);
    await saveRefreshToken(tokens.refreshToken)
    return tokens;
  }
);
export const logoutAction  = createAsyncThunk(
  "auth/logoutUser",
  async (): Promise<void> => {    
    try {const res = await axiosInstance.post("/auth/logout");

       await clearAuthToken()
        await clearRefreshToken()
  

  return res.data;
        
    } catch (error) {
        console.log("something went wrong ");
        
    }
  
  }
);

export const profileAction = createAsyncThunk(
    "auth/profile",
    async () =>{

           const user = await axiosInstance.get('auth/profile').then((response) => response.data);        
           return user 

    }
)
 
export const registerAction = createAsyncThunk(
  "auth/registerUser",
  async (userData: FormData ): Promise<{ user:any,token: string; refreshToken: string }> => {
      const tokens = await axiosInstance.post("/auth/register", userData).then((response) => response.data);

      console.log(tokens);
      
      await saveAuthToken(tokens.token);
      await saveRefreshToken(tokens.refreshToken);

      return tokens;
  }
);
export const update = createAsyncThunk(
  "auth/update",
  async (userData: FormData ): Promise<User> => {
      const user = await axiosInstance.patch("/auth/update", userData).then((response) => response.data);
      console.log("gfgfgfgfgf",user);
      
      return user;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loginAction.pending, (state) => {
            state.loading = true
            state.isAuthenticated = false;
        })
        .addCase(loginAction.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.loading = false
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.user = action.payload.userWithUrl
        })
        .addCase(loginAction.rejected, (state) => {
            state.isAuthenticated = false;
             state.loading = false
        })
        .addCase(registerAction.pending, (state) => {
            state.isAuthenticated = false;
            state.loading = false
        })
        .addCase(registerAction.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.loading = false
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
        })
        .addCase(registerAction.rejected, (state) => {
            state.loading =false
            state.isAuthenticated = false;
        })
        .addCase(logoutAction.pending, (state) => {
            state.loading = false
            state.isAuthenticated = false;
        })
        .addCase(logoutAction.fulfilled, (state, action) => {
            state.isAuthenticated = false;
            state.loading = false
        })
        .addCase(logoutAction.rejected, (state) => {
            state.isAuthenticated = false;
            state.loading = false
        })
        .addCase(profileAction.pending, (state) => {
            state.isAuthenticated = false;
            state.loading = true
        })
        .addCase(profileAction.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload
            state.loading = false
        })
        .addCase(profileAction.rejected, (state) => {
            state.isAuthenticated = false;
            state.loading = false
        })
        .addCase(update.pending, (state) => {
            state.loading = true
        })
        .addCase(update.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            
        })
        .addCase(update.rejected, (state) => {
            state.loading = false
        })
       

    }

})

export default authSlice.reducer;

