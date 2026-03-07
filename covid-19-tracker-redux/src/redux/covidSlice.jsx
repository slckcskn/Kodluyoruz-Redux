import {createSlice} from '@reduxjs/toolkit';
import {getCountries, getTotalCovid, getTotalCovidCountry} from './covidServices';

export const covidSlice = createSlice({
    name: 'covid',
    initialState: {
        countries: [],
        totalData: [],
        totalCountryData: {},
        selectedCountry: null,

    getCountries: {
        status: 'idle',
        error: null
    },
    getTotalCovid: {
        status: 'idle',
        error: null
    },
    getTotalCovidCountry: {
        status: 'idle',
        error: null
    }
},
extraReducers: (builder) => {
    // getCountries
    builder
        .addCase(getCountries.pending, (state) => {
            state.status = "loading"
        })
        .addCase(getCountries.fulfilled, (state, action) => {
              state.status = "succeeded"
              state.countries = action.payload.data
        })
        .addCase(getCountries.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        })
        // getTotalCovid
        .addCase(getTotalCovid.pending, (state) => {
            state.status = "loading"
        })
        .addCase(getTotalCovid.fulfilled, (state, action) => {
              state.status = "succeeded"
              state.totalData = action.payload.data
        })
        .addCase(getTotalCovid.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        })
        // getTotalCovidCountry
        .addCase(getTotalCovidCountry.pending, (state) => {
            state.status = "loading"
        })
        .addCase(getTotalCovidCountry.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.totalCountryData = action.payload.data
        })
        .addCase(getTotalCovidCountry.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        })
    }
})

export default covidSlice.reducer