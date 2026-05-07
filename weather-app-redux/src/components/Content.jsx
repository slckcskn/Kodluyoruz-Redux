import { useSelector } from 'react-redux';
import { MapPin, Droplets, Wind, Gauge, Plus, Sun, Cloud, CloudRain, CloudSun } from 'lucide-react';

function Content() {
  const cityName = useSelector((state) => state.weather.cityName);
  const current = useSelector((state) => state.weather.current);
  const minTemp = useSelector((state) => state.weather.minTemp);
  const maxTemp = useSelector((state) => state.weather.maxTemp);
  const humidity = useSelector((state) => state.weather.humidity);
  const averageWindSpeed = useSelector((state) => state.weather.averageWindSpeed);
  const averagePressure = useSelector((state) => state.weather.averagePressure);
  const rain = useSelector((state) => state.weather.rain);
  const commonWeather = useSelector((state) => state.weather.commonWeather);
  const waqiData = useSelector((state) => state.weather.waqiData);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();
  const currentDayIndex = today.getDay();
  const formattedDate = today.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Hava durumu ikonunu seç
  const getWeatherIcon = (weather) => {
    switch (weather) {
      case "Clear":
        return <Sun size={64} className="text-warning mb-1" />;
      case "Clouds":
        return <Cloud size={64} className="text-secondary mb-1" />;
      case "Rain":
        return <CloudRain size={64} className="text-info mb-1" />;
      default:
        return <CloudSun size={64} className="text-info mb-1" />;
    }
  };

  // Yardımcı fonksiyon: geçersiz değerleri '--' olarak göster
  const safeValue = (val, unit = '', isTemp = false) => {
    if (
      val === null ||
      val === undefined ||
      isNaN(Number(val)) ||
      val === Infinity ||
      val === -Infinity
    ) {
      return '--';
    }
    return isTemp ? `${val}°` : `${val}${unit}`;
  };

  // 4 günlük tahmin verisi hazırla (yarından başlasın)
  const forecastData = Array(4).fill(null).map((_, i) => {
    const dayIdx = (currentDayIndex + i + 1) % 7;
    return {
      day: days[dayIdx],
      icon: getWeatherIcon(commonWeather && commonWeather[i + 1] ? commonWeather[i + 1] : undefined),
      high: safeValue(maxTemp && maxTemp[i + 1], '°', true),
      low: safeValue(minTemp && minTemp[i + 1], '°', true),
      weather: commonWeather && commonWeather[i + 1] ? commonWeather[i + 1] : '--',
    };
  });

  // waqiData'ya göre renk belirle (hem kenar hem yazı için)
  const getWaqiColor = (aqi) => {
    if (aqi === null || aqi === undefined) return { color: '#6c757d' };
    if (aqi <= 50) return { color: '#22c55e' };
    if (aqi <= 100) return { color: '#eab308' };
    if (aqi <= 150) return { color: '#f97316' };
    if (aqi <= 200) return { color: '#ef4444' };
    return { color: '#a21caf' };
  };
  const waqiColor = getWaqiColor(waqiData);

  return (
    <main className="container py-4">
      <div className="row g-4 mb-4">
        {/* Current Weather Card */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm h-100 rounded-4">
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-4">
                <MapPin className="text-primary me-2" size={20} />
                <div>
                  <h3 className="h5 fw-bold mb-0">{cityName}</h3>
                  <p className="text-muted small mb-0">{formattedDate}</p>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-md-5 d-flex align-items-center justify-content-center mb-2">
                  <span className="display-5 fw-bold text-dark me-5">{safeValue(current, '°', true)}</span>
                  <div className="text-center">
                    {getWeatherIcon(commonWeather && commonWeather[0] ? commonWeather[0] : undefined)}
                    <p className="text-uppercase small fw-bold text-muted mb-0">{commonWeather && commonWeather[0] ? commonWeather[0] : '--'}</p>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="d-flex justify-content-around bg-light p-3 rounded-4">
                    <div className="text-center">
                      <Droplets size={20} className="text-primary mb-2" />
                      <p className="fw-bold mb-0">{safeValue(humidity && humidity[0], '%')}</p>
                      <p className="text-muted x-small text-uppercase">Humidity</p>
                    </div>
                    <div className="vr opacity-10"></div>
                    <div className="text-center">
                      <Wind size={20} className="text-info mb-2" />
                      <p className="fw-bold mb-0">{safeValue(averageWindSpeed && averageWindSpeed[0], ' km/h')}</p>
                      <p className="text-muted x-small text-uppercase">Wind</p>
                    </div>
                    <div className="vr opacity-10"></div>
                    <div className="text-center">
                      <Gauge size={20} className="text-secondary mb-2" />
                      <p className="fw-bold mb-0">{safeValue(averagePressure && averagePressure[0], ' hPa')}</p>
                      <p className="text-muted x-small text-uppercase">Pressure</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Air Quality */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100 rounded-4 position-relative">
            <div className="card-body p-4">
              <h4 className="h5 fw-bold mb-1">Air Quality</h4>
              <div className="d-flex flex-column justify-content-center align-items-center h-100" style={{ minHeight: '140px' }}>
                <div className="mb-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: '60px',
                      height: '60px',
                      border: `5px solid ${waqiColor.color}`,
                      boxShadow: `0 0 0 4px ${waqiColor.color}33`,
                      backgroundColor: '#fff',
                      transition: 'border-color 0.3s',
                    }}
                  >
                    <span
                      className="fw-bold"
                      style={{ fontSize: '1.5rem', color: waqiColor.color }}
                    >
                      {waqiData !== null && waqiData !== undefined ? waqiData : '--'}
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <p
                    className="fw-bold mb-0"
                    style={{ color: waqiColor.color }}
                  >
                    {waqiData === null || waqiData === undefined
                      ? '--'
                      : waqiData <= 50
                      ? 'Excellent'
                      : waqiData <= 100
                      ? 'Good'
                      : waqiData <= 150
                      ? 'Moderate'
                      : waqiData <= 200
                      ? 'Unhealthy'
                      : 'Very Unhealthy'}
                  </p>
                  <p className="text-muted small mb-0">
                    {waqiData === null || waqiData === undefined
                      ? '--'
                      : waqiData <= 50
                      ? 'Ideal for outdoor activities.'
                      : waqiData <= 100
                      ? 'Air quality is acceptable.'
                      : waqiData <= 150
                      ? 'Sensitive groups should limit outdoor exertion.'
                      : waqiData <= 200
                      ? 'Everyone may begin to experience health effects.'
                      : 'Health warnings of emergency conditions.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 4-Day Forecast */}
      <section>
        <h2 className="h5 fw-bold mb-3">4-Day Forecast</h2>
        <div className="row g-3">
          {forecastData.map((item, idx) => (
            <div key={idx+1} className="col-6 col-md-3">
              <div className="card border-0 shadow-sm rounded-4 text-center p-3 h-100">
                <p className="text-muted small mb-3">{item.day}</p>
                <div className="mb-3">{item.icon}</div>
                <div className="d-flex justify-content-center align-items-baseline">
                  <span className="fw-bold h5 mb-0">{item.high}</span>
                  <span className="text-muted small ms-2">{item.low}</span>
                </div>
                <div className="text-muted small mt-2">{item.weather}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Content