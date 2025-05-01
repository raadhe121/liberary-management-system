import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {

};
export const userLogin = createAsyncThunk(
  'auth/userLogin',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');

      // Example success condition — customize based on your API
      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue('Login failed: No users found or bad response');
      }
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Something went wrong';
      return rejectWithValue(message);
    }
  }
);


const userSlice = createSlice({
  name: 'auth',
  initialState: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
