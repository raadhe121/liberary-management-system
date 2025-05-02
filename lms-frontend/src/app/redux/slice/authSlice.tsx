import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios-config";
import swal from "sweetalert";



const initialState = {
    user: null,
    loading: false,
    error: null,
    myProfile:{
       id: 1,
        name: "Shivam Tiwari",
        email: "shivam@gmail.com",
     
        number: "1234567890",
        roleId: 3,
        createdAt: "2025-04-27T07:39:45.000Z",
        updatedAt: "2025-04-27T07:39:45.000Z",
        role: {
            id: 3,
            name: "Student",
            createdAt: "2025-04-27T09:55:01.000Z",
            updatedAt: "2025-04-27T09:55:01.000Z"
        }
    }
}


interface Credentials {
    email: string;
    password: string;
    navigate: (path: string, state?: any) => void; // Add navigate function as part of the credentials
}
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials: Credentials, thunkAPI) => {
        try {
            const email = credentials.email;
            const password = credentials.password;
            // console.log(isRememberMe);

            // const response = await
            const response = await axios.post('/login', { email, password });
            console.log('isRememberMe', response.data);

            if (response.data.status) {
                localStorage.setItem('email', response?.data?.data?.email);
                localStorage.setItem('token', response?.data?.data?.token);
                swal('', response.data.message, 'success');
                credentials.navigate('/dashboard', { replace: true });
                return response.data;
            } else {
                throw new Error(response.data.message || 'Verification failed');
            }
        } catch (error: any) {
            swal(
                'Oops!',
                error.response.data.message || 'An error occurred',
                'error'
            );
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);
interface Logout {
    navigate: (path: string, state?: any) => void; // Add navigate function as part of the credentials
}
export const logout = createAsyncThunk(
    'auth/loginUser',
    async (logoutData:Logout,thunkAPI) => {
       
        try {
            const token = localStorage.getItem('token')
            const response = await axios.post('/logout',{},{
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
            });
            if (response.data.status) {
                localStorage.setItem('email', '');
                localStorage.setItem('token', '');
                localStorage.removeItem('email');
                localStorage.removeItem('token');
                logoutData.navigate('/login');
                swal('', response.data.message, 'success');
                return response.data;
            } else {
                throw new Error(response.data.message || 'Verification failed');
            }
        } catch (error: any) {
            swal(
                'Oops!',
                error.response.data.message || 'An error occurred',
                'error'
            );
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getMyProfile = createAsyncThunk(
    'auth/getMyProfile',
    async (_,thunkAPI) => {
       
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get('/my-profile',{
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
            });
            if (response.data.status) {
            
               
                return response.data;
            } else {
                throw new Error(response.data.message || 'Verification failed');
            }
        } catch (error: any) {
            swal(
                'Oops!',
                error.response.data.message || 'An error occurred',
                'error'
            );
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state: any) => {
                console.log('adasd', state);
                state.loading = true;
                state.error = '';
            })
            .addCase(loginUser.fulfilled, (state: any, action: any) => {
                console.log('payload', action);
                state.loading = false;
                state.user = action?.payload ?? null;
            })
            .addCase(loginUser.rejected, (state: any, action: any) => {
                state.loading = false;
                state.error = action.error.message ?? '';
            })
            .addCase(getMyProfile.pending, (state: any) => {
                console.log('adasd', state);
                state.loading = true;
                state.error = '';
                console.log('after', state);
            })
            .addCase(getMyProfile.fulfilled, (state: any, action: any) => {
                console.log('payload', action);
                state.loading = false;
                state.myProfile = action?.payload.data;
                // state.user = action?.payload ?? null;
            })
            .addCase(getMyProfile.rejected, (state: any, action: any) => {
                state.loading = false;
                state.error = action.error.message ?? '';
            })

    },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;