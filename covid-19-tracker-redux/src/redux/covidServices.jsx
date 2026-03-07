import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getTotalCovid = createAsyncThunk('covid/getTotalCovid', async () => {
    const res = await axios(`${import.meta.env.VITE_BASE_URL}/reports/total`)
    return res.data
})

export const getCountries = createAsyncThunk('covid/getCountries', async () => {
    const res = await axios(`${import.meta.env.VITE_BASE_URL}/regions`)
    return res.data
})

export const getTotalCovidCountry = createAsyncThunk('covid/getTotalCovidCountry', async (iso) => {
    const res = await axios(`${import.meta.env.VITE_BASE_URL}/reports/total?iso=${iso}`)
    return res.data
})