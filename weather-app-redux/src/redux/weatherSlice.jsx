import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const unit = "metric";

export const getWeather = createAsyncThunk(
  "weather/getWeather",
  async (_, { getState }) => {
    const currentState = getState();
    const cityName = currentState.weather.cityName;
    const res = await axios(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=${unit}`,
    );

    return res.data;
  },
);

export const getWaqi = createAsyncThunk(
  "weather/getWaqi",
  async (_, { getState }) => {
    const currentState = getState();
    const cityName = currentState.weather.cityName;
    const res = await axios(
    `https://api.waqi.info/feed/${cityName}/?token=${import.meta.env.VITE_WAQI_API_KEY}`,
    );

    return res.data;
  },
);

const d = new Date();
console.log(d);

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    cityName: "İstanbul",
    status: "idle",
    error: null,
    current: [],
    minTemp: [],
    maxTemp: [],
    humidity: [],
    averageWindSpeed: [],
    averagePressure: [],
    rain: [],
    commonWeather: [],
    waqiData: null, 
  },
  reducers: {
    setCityName: (state, action) => {
      state.cityName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWeather.fulfilled, (state, action) => {
      const forecastData = action.payload;
      for (let i = 0; i < 5; i++) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + i);
        const tomorrowStr = tomorrow.toISOString().slice(0, 10);
        const tomorrowWeather = forecastData.list.filter((item) => {
            const dateStr = item.dt_txt.slice(0, 10);
            return dateStr === tomorrowStr;
          })
          .map((item) => ({
            temperature: item.main.temp,
            humidity: item.main.humidity,
            windSpeed: item.wind.speed,
            pressure: item.main.pressure,
            rain: item.rain ? item.rain["3h"] : 0,
            mainWeather: item.weather[0].main,
            weatherDescription: item.weather[0].description,
          }));

        const weatherCounts = {};
        tomorrowWeather.forEach((weather) => {
          if (weatherCounts[weather.mainWeather]) {
            weatherCounts[weather.mainWeather]++;
          } else {
            weatherCounts[weather.mainWeather] = 1;
          }
        });

        let maxCount = 0;
        let commonWeather = "";
        for (const weather in weatherCounts) {
          if (weatherCounts[weather] > maxCount) {
            maxCount = weatherCounts[weather];
            commonWeather = weather;
          }
        }
        state.commonWeather[i] = commonWeather;

        const currentTemp = tomorrowWeather.map((item) => item.temperature);
        state.current = currentTemp[0] !== undefined && currentTemp[0] !== null && !isNaN(currentTemp[0])
          ? Number(currentTemp[0]).toFixed(1)
          : currentTemp[0];

        const minTemp = Math.min(
          ...tomorrowWeather.map((item) => item.temperature)
        );
        const maxTemp = Math.max(
          ...tomorrowWeather.map((item) => item.temperature)
        );

        state.minTemp[i] = minTemp !== undefined && minTemp !== null && !isNaN(minTemp)
          ? Number(minTemp).toFixed(1)
          : minTemp;
        state.maxTemp[i] = maxTemp !== undefined && maxTemp !== null && !isNaN(maxTemp)
          ? Number(maxTemp).toFixed(1)
          : maxTemp;

        const averageHumidity = (
          tomorrowWeather.reduce((sum, item) => sum + item.humidity, 0) /
          tomorrowWeather.length);
        state.humidity[i] = averageHumidity !== undefined && averageHumidity !== null && !isNaN(averageHumidity)
          ? Number(averageHumidity).toFixed(0)
          : averageHumidity;

        const totalRain = 
          tomorrowWeather.reduce((sum, item) => sum + item.rain, 0);
        state.rain[i] = totalRain !== undefined && totalRain !== null && !isNaN(totalRain)
          ? Number(totalRain).toFixed(1)
          : totalRain;

        const averageWindSpeed = (
          tomorrowWeather.reduce((sum, item) => sum + item.windSpeed, 0) /
          tomorrowWeather.length);
        state.averageWindSpeed[i] = averageWindSpeed !== undefined && averageWindSpeed !== null && !isNaN(averageWindSpeed)
          ? Number(averageWindSpeed).toFixed(1)
          : averageWindSpeed;

        const averagePressure = (
          tomorrowWeather.reduce((sum, item) => sum + item.pressure, 0) /
          tomorrowWeather.length);
        state.averagePressure[i] = averagePressure !== undefined && averagePressure !== null && !isNaN(averagePressure)
          ? Number(averagePressure).toFixed(0)
          : averagePressure;
      }
    });
    builder.addCase(getWaqi.fulfilled, (state, action) => {

      if (action.payload && action.payload.data && typeof action.payload.data.aqi !== 'undefined') {
        state.waqiData = action.payload.data.aqi;
      } else {
        state.waqiData = null;
      }
    });
  },
});

export const { setCityName } = weatherSlice.actions;

export default weatherSlice.reducer;
