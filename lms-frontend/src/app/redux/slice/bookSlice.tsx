import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios-config";
import swal from "sweetalert";



const initialState = {
  book: {
    data: []
  },
  issuedBook: {
    data: []
  },
  loading: false,
  error: null,

}

export const getAllBookList = createAsyncThunk(
  'auth/getAllBookList',
  async (_, thunkAPI) => {
    try {

      // const response = await
      const response = await axios.get('/all-book');
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

export const getAllIssuedBookList = createAsyncThunk(
  'auth/getAllIssuedBookList',
  async (_, thunkAPI) => {
    try {

      // const response = await
      const response = await axios.get('/user-book');
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

export const issueBook = createAsyncThunk(
  'auth/issueBook',
  async (bookId: number, thunkAPI) => {
    try {
      const token = localStorage.getItem('accessToken');

      const response = await axios.post(
        '/issue-book',
        {
          bookId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status) {
        return response.data;
      } else {
        swal(
          'Oops!',
          response.data.message || 'An error occurred',
          'error'
        );
        throw new Error(response.data.message || 'Verification failed');
      }
    } catch (error: any) {
      swal(
        'Oops!',
        error.response?.data?.message || 'An error occurred',
        'error'
      );
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


interface Book {
  id: number;
  name: string;
  author: string;
}
export const addBook = createAsyncThunk(
  'auth/addBook',
  async (bookData: Book, thunkAPI) => {
    try {
      const token = localStorage.getItem('accessToken');

      const response = await axios.post(
        '/add-book',
        {
          name: bookData.name,
          author: bookData.author
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status) {
        swal(
          'Success!',
          response.data.message || 'An error occurred',
          'success'
        );
        return response.data;
      } else {
        swal(
          'Oops!',
          response.data.message || 'An error occurred',
          'error'
        );
        throw new Error(response.data.message || 'Verification failed');
      }
    } catch (error: any) {
      swal(
        'Oops!',
        error.response?.data?.message || 'An error occurred',
        'error'
      );
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateBook = createAsyncThunk(
  'auth/updateBook',
  async (bookData: Book, thunkAPI) => {
    try {
      const token = localStorage.getItem('accessToken');

      const response = await axios.post(
        '/update-book',
        {
          id: bookData.id,
          name: bookData.name,
          author: bookData.author
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status) {
        swal(
          'Success!',
          response.data.message || 'An error occurred',
          'success'
        );
        return response.data;
      } else {
        swal(
          'Oops!',
          response.data.message || 'An error occurred',
          'error'
        );
        throw new Error(response.data.message || 'Verification failed');
      }
    } catch (error: any) {
      swal(
        'Oops!',
        error.response?.data?.message || 'An error occurred',
        'error'
      );
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const deleteBook = createAsyncThunk(
  'auth/deleteBook',
  async (bookData: Book, thunkAPI) => {
    try {
      const token = localStorage.getItem('accessToken');

      const response = await axios.post(
        '/delete-book',
        {
          id: bookData.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status) {
        swal(
          'Success!',
          response.data.message ,
          'success'
        );
        return response.data;
      } else {
        swal(
          'Oops!',
          response.data.message || 'An error occurred',
          'error'
        );
        throw new Error(response.data.message || 'Verification failed');
      }
    } catch (error: any) {
      swal(
        'Oops!',
        error.response?.data?.message || 'An error occurred',
        'error'
      );
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const returnBook = createAsyncThunk(
  'auth/returnBook',
  async (bookId: number, thunkAPI) => {
    try {
      const token = localStorage.getItem('accessToken');

      const response = await axios.post(
        '/return-book',
        {
          bookId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status) {

        return response.data;
      } else {
        swal(
          'Oops!',
          response.data.message || 'An error occurred',
          'error'
        );
        throw new Error(response.data.message || 'Verification failed');
      }
    } catch (error: any) {
      swal(
        'Oops!',
        error.response?.data?.message || 'An error occurred',
        'error'
      );
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    logout(state) {
      state.book = {
        data: []
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBookList.pending, (state: any) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getAllBookList.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.book.data = action?.payload.data ?? null;
      })
      .addCase(getAllBookList.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.error.message ?? '';
      })
      .addCase(getAllIssuedBookList.pending, (state: any) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getAllIssuedBookList.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.issuedBook.data = action?.payload.data ?? null;
      })
      .addCase(getAllIssuedBookList.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.error.message ?? '';
      })
  }
});

export const bookReducer = bookSlice.reducer;
export const bookAction = bookSlice.actions;