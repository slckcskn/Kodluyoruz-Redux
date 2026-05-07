
import { useState } from "react";
import { useDispatch } from "react-redux";
import { turkishCities } from "../data/turkishCities";
import { setCityName, getWeather, getWaqi} from '../redux/weatherSlice';

function Select() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (turkishCities.includes(value)) {
      dispatch(setCityName(value));
    }
  };

  const handleClearInput = () => {
    setInputValue("");
  };

  return (
    <header className="container-fluid bg-light py-2 border-bottom">
      <div className="row align-items-center">
        <div className="col-3 d-flex align-items-center justify-content-start">
          <span className="fw-bold text-primary" style={{fontSize:'19px'}}>S-Weather</span>
        </div>
        <div className="col-6 d-flex justify-content-center">
            <div className="input-group align-items-center border rounded-3" style={{ maxWidth: '250px', width: '100%' }}>
              <i className="bi bi-search m-2"></i>
              <input
                type="text"
                className="form-control border-0 "
                placeholder="Select City"
                value={inputValue}
                onChange={handleInputChange}
                list="citylist"
                style={{ minWidth: 0 }}
              />
              {inputValue && (
                <button className="btn btn-outline-secondary" onClick={handleClearInput} type="button">
                  <i className="bi bi-x-lg"></i>
                </button>
              )}
              <datalist id="citylist">
                {turkishCities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </datalist>
            </div>

        </div>
        {/* <div className="col text-center d-flex justify-content-center align-items-center">
          <button className="btn btn-outline-primary" type="button">
            <i className="bi bi-geo-alt fs-4"></i>
          </button>
        </div> */}
        <div className="col-3 d-flex align-items-center justify-content-end">
          <a href="https://github.com/slckcskn/Kodluyoruz-Redux" target="_blank">
            <button className="btn btn-outline-secondary" type="button">
              <i className="bi bi-github"></i>
            </button>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Select;
