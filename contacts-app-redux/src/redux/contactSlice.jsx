import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

export const contactAdapter = createEntityAdapter()
const initialState = contactAdapter.getInitialState()

export const contactSelectors = contactAdapter.getSelectors(state => state.contacts)

const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        addContact: contactAdapter.addOne,
        addContacts: contactAdapter.addMany,
        deleteContact: contactAdapter.removeOne,
        deleteAllContacts: contactAdapter.removeAll,
        updateContact: contactAdapter.updateOne
    }
})

export const {addContact, addContacts, deleteContact, deleteAllContacts, updateContact} = contactSlice.actions
export default contactSlice.reducer