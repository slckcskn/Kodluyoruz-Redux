import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const fetchEpisodes = createAsyncThunk('episodes/fetchEpisodes', async (page) => {
    const res = await axios(`${import.meta.env.VITE_BASE_URL}/episode/?page=${page}`)
    return res.data
});

export const episodesSlice = createSlice({
    name: 'episodes',
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
            .addCase(fetchEpisodes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEpisodes.fulfilled, (state, action) => {
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
            .addCase(fetchEpisodes.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = 'failed';
            });
    }
});

export default episodesSlice.reducer;
