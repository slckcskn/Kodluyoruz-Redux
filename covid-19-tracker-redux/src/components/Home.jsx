import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  getTotalCovid,
  getTotalCovidCountry,
} from "../redux/covidServices";

import {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryLabel
} from "victory";

function Home() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.covid.countries);
  const totalData = useSelector((state) => state.covid.totalData);
  const totalCountryData = useSelector((state) => state.covid.totalCountryData);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getTotalCovid());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCountry) {
      // Seçilen ülkenin iso kodunu bul
      const selected = countries.find((c) => c.name === selectedCountry);
      if (selected && selected.iso) {
        dispatch(getTotalCovidCountry(selected.iso));
      }
    }
  }, [selectedCountry, countries, dispatch]);

  console.log("Country List:", countries);
  console.log("Total Covid Data:", totalData);
  console.log("Total Country Covid Data:", totalCountryData);

  // Gösterilecek veri: ülke seçiliyse totalCountryData, değilse totalData
  const displayData =
    selectedCountry && totalCountryData ? totalCountryData : totalData;

  const chartData = [
    { label: "Infected", value: displayData.active || 0 },
    { label: "Deaths", value: displayData.deaths || 0 },
    { label: "Recovered", value: displayData.recovered || 0 },
    { label: "Active", value: displayData.confirmed || 0 },
  ];

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <img src="../../public/covidlogo.svg" alt="covidlogo" height={100} />
            <p style={{fontFamily: "Arial, sans-serif", marginTop: "10px"}}>Global and Country Wise Cases of Corona Virus</p>
            <p style={{fontFamily: "Arial, sans-serif"}}>(For a Particular select a Country from below)</p>
          </div>

          <div className="row g-4 mt-3">
            <div className="col-12 col-md-3 rounded-2">
              <div
                className="card h-100"
                style={{ backgroundColor: "lightblue" }}
              >
                <div className="card-body">
                  <h5 className="card-title">Infected</h5>
                  <p
                    className="card-text"
                    style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                  >
                    {displayData.active !== undefined &&
                    displayData.active !== null
                      ? displayData.active.toLocaleString()
                      : ""}
                  </p>
                  <p className="card-text">
                    Last Updated at: {displayData.last_update}
                  </p>
                  <p className="card-text" style={{ fontWeight: "bold" }}>
                    Number of infected cases of COVID-19
                  </p>
                  <p className="card-text" style={{ fontWeight: "bold" }}>
                    {selectedCountry
                      ? `Data for ${selectedCountry}`
                      : "Worldwide"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <div
                className="card h-100"
                style={{ backgroundColor: "lightgreen" }}
              >
                <div className="card-body">
                  <h5 className="card-title">Recovered</h5>
                  <p
                    className="card-text"
                    style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                  >
                    {displayData.recovered !== undefined &&
                    displayData.recovered !== null
                      ? displayData.recovered.toLocaleString()
                      : ""}
                  </p>
                  <p className="card-text">
                    Last Updated at: {displayData.last_update}
                  </p>
                  <p className="card-text" style={{ fontWeight: "bold" }}>
                    Number of recoveries from COVID-19
                  </p>
                  <p className="card-text" style={{ fontWeight: "bold" }}>
                    {selectedCountry
                      ? `Data for ${selectedCountry}`
                      : "Worldwide"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <div
                className="card h-100"
                style={{ backgroundColor: "lightcoral" }}
              >
                <div className="card-body">
                  <h5 className="card-title">Deaths</h5>
                  <p
                    className="card-text"
                    style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                  >
                    {displayData.deaths !== undefined &&
                    displayData.deaths !== null
                      ? displayData.deaths.toLocaleString()
                      : ""}
                  </p>
                  <p className="card-text">
                    Last Updated at: {displayData.last_update}
                  </p>
                  <p className="card-text" style={{ fontWeight: "bold" }}>
                    Number of deaths caused by COVID-19
                  </p>
                  <p className="card-text" style={{ fontWeight: "bold" }}>
                    {selectedCountry
                      ? `Data for ${selectedCountry}`
                      : "Worldwide"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <div
                className="card h-100"
                style={{ backgroundColor: "lightyellow" }}
              >
                <div className="card-body">
                  <h5 className="card-title">Active</h5>
                  <p
                    className="card-text"
                    style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                  >
                    {displayData.confirmed !== undefined &&
                    displayData.confirmed !== null
                      ? displayData.confirmed.toLocaleString()
                      : ""}
                  </p>
                  <p className="card-text">
                    Last Updated at: {displayData.last_update}
                  </p>
                  <p className="card-text" style={{ fontWeight: "bold" }}>
                    Number of active cases of COVID-19
                  </p>
                  <p className="card-text" style={{ fontWeight: "bold" }}>
                    {selectedCountry
                      ? `Data for ${selectedCountry}`
                      : "Worldwide"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{ display: "flex", justifyContent: "center" }}
            className="col-md-12 mt-5"
          >
            <select
              className="form-select country-select w-25"
              aria-label="Default select example"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">Worldwide</option>
              {countries.map((country, index) => (
                <option key={index} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6 text-center mt-2">
            
            <div>
              <VictoryChart theme={VictoryTheme.material} domainPadding={25}>
                <VictoryLabel
                  text={`Current state in ${selectedCountry || "Worldwide"}`}
                  x={175}
                  y={30}
                  textAnchor="middle"
                />

                <VictoryAxis
                  tickValues={[1, 2, 3, 4]}
                  tickFormat={["Cases", "Deaths", "Recovered", "Active"]}
                />
                <VictoryAxis
                  dependentAxis
                  tickFormat={(x) => `${x / 1000000}M`}
                />
                <VictoryBar
                  data={chartData}
                  labelComponent={<VictoryTooltip />}
                  x="label"
                  y="value"
                  style={{
                    data: {
                      fill: ({ datum }) => {
                        if (datum.label === "Infected") return "lightblue";
                        if (datum.label === "Deaths") return "lightcoral";
                        if (datum.label === "Recovered") return "lightgreen";
                        if (datum.label === "Active") return "lightyellow";
                        return "gray";
                      },
                      width: 40,
                    },
                  }}
                />
              </VictoryChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
