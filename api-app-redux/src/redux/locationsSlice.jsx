import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const fetchLocations = createAsyncThunk('locations/fetchLocations', async (page) => {
    const res = await axios(`${import.meta.env.VITE_BASE_URL}/location/?page=${page}`)
    return res.data
});

export const locationsSlice = createSlice({
    name: 'locations',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        page: 1,
        hasNextPage: true
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLocations.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLocations.fulfilled, (state, action) => {
                console.log('Fetched results:', action.payload.results);
                console.log('Current page (slice):', state.page);
                state.items = [...state.items, ...action.payload.results];
                //results sonuna .slice(0, 12) ekleyerek 12 karakter alınabilir.
                state.status = 'succeeded';
                state.page += 1;

                if (action.payload.results.length < 20) {
                    state.hasNextPage = false;
                }
            })
            .addCase(fetchLocations.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = 'failed';
            });
    }
});

export default locationsSlice.reducer;
