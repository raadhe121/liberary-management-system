import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios-config";
import swal from "sweetalert";



const initialState = {
    user: null,
    loading: false,
    error: null
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
                swal('', response.data.message, 'success');
                logoutData.navigate('/login', { replace: true });
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
    extraReducers: (builder: any) => {
        builder
            .addCase(loginUser.pending, (state: any) => {
                console.log('adasd', state);
                state.loading = true;
                state.error = '';
                console.log('after', state);
            })
            .addCase(loginUser.fulfilled, (state: any, action: any) => {
                console.log('payload', action);
                state.loading = false;
                // state.user = action?.payload ?? null;
            })
            .addCase(loginUser.rejected, (state: any, action: any) => {
                state.loading = false;
                state.error = action.error.message ?? '';
            })

    },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;