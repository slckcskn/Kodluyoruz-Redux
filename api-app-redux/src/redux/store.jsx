import {configureStore} from '@reduxjs/toolkit';
import charactersSlice from './charactersSlice';
import episodesSlice from './episodesSlice'
import locationsSlice from './locationsSlice'

export const store = configureStore({
    reducer: {
        characters: charactersSlice,
        episodes: episodesSlice,
        locations: locationsSlice
    },
})