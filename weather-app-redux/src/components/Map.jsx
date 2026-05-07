import React, { useEffect } from 'react'
import TurkeyMap from 'turkey-map-react';
import {Tooltip} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {setCityName, getWeather, getWaqi} from '../redux/weatherSlice';


function Map() {
  const dispatch = useDispatch();
  const cityName = useSelector((state) => state.weather.cityName);

  // İlk açılışta sadece bir kez çalışır
  useEffect(() => {
    if (cityName) {
      dispatch(getWeather());
      dispatch(getWaqi());
    }
  }, [dispatch, cityName]);

  const handleCityClick = (name) => {
    dispatch(setCityName(name));
    // cityName değiştiği için useEffect tetiklenir, burada tekrar çağırmaya gerek yok
  };

  return (
    <div>
      <TurkeyMap
        onClick={({ name }) => handleCityClick(name)}
        cityWrapper={(cityComponent, cityData) => (
          <Tooltip title={`${cityData.name}`} key={cityData.id}>
            {cityComponent}
          </Tooltip>
        )}
      />
    </div>
  );
}

export default Map