import { createSlice } from '@reduxjs/toolkit'
import { getNotesAsync, addNoteAsync, removeNoteAsync } from './notesServices';

export const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        items: [],
        filter: "",
        getNotes: {
            isLoading: false,
            error: null
        },
        addNote: {
            isLoading: false,
            error: null
        },
        removeNote: {
            isLoading: false,
            error: null
        }
    },
    reducers: {
        setFilter: (state,action) => {
            state.filter = action.payload
        }
    },
    extraReducers: (builder) => {
        //get notes
        builder
            .addCase(getNotesAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getNotesAsync.fulfilled, (state, action) => {
                state.items = action.payload
                state.isLoading = false
            })
            .addCase(getNotesAsync.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            //add note
            .addCase(addNoteAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addNoteAsync.fulfilled, (state, action) => {
                state.items.push(action.payload)
                state.isLoading = false
            })
            .addCase(addNoteAsync.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            //remove note
            .addCase(removeNoteAsync.fulfilled, (state,action) => {
                const id = action.payload
                const filter = state.items.filter(item => item.id !== id)
                state.items = filter
            })

    }
})

export const { setFilter } = notesSlice.actions
export default notesSlice.reducer
