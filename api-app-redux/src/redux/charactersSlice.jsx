import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const fetchCharacters = createAsyncThunk('characters/fetchCharacters', async (page) => {
    const res = await axios(`${import.meta.env.VITE_BASE_URL}/character/?page=${page}`)
    return res.data
});

export const charactersSlice = createSlice({
    name: 'characters',
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
            .addCase(fetchCharacters.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCharacters.fulfilled, (state, action) => {
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
            .addCase(fetchCharacters.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = 'failed';
            });
    }
});

export default charactersSlice.reducer;
