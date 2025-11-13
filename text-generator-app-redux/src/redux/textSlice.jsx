import { createAsyncThunk ,createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchText = createAsyncThunk('text/fetchText', async (paras, format) => {
    const response = await axios(`${import.meta.env.VITE_BASE_URL}/?type=all-meat&paras=${paras}&format=${format}`)
    return response.data
})

export const textSlice = createSlice({
  name: 'text',
  initialState: {
    text: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchText.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchText.fulfilled, (state,action) => {
            state.text = action.payload;
            state.status = 'succeeded';
        })
        .addCase(fetchText.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
})


export default textSlice.reducer