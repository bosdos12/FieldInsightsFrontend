"use client";
import React, { useState, useEffect } from 'react';
import LineChart from './LineChart'; // Ensure the correct import path

const SensorItem = ({
  sensorID, name, metricIndicator
}) => {
  const [metricsData, setMetricsData] = useState([]);
  const [testData, setTestData] = useState([]);
  const [singleMetricDisplay, setSingleMetricDisplay] = useState(0);

  useEffect(() => {
    // Simulate fetching data from API


    // const testData = [
      // { timestamp: "2024-05-01T10:00:00Z", value: 20 },
      // { timestamp: "2024-05-01T11:00:00Z", value: 22 },
      // { timestamp: "2024-05-01T12:00:00Z", value: 21 },
      // { timestamp: "2024-05-01T13:00:00Z", value: 24 },
      // { timestamp: "2024-05-01T14:00:00Z", value: 23 },
      // { timestamp: "2024-05-01T15:00:00Z", value: 25 },
      // { timestamp: "2024-05-01T16:00:00Z", value: 27 }
    // ];


    setInterval(() => {
      fetch(`http://localhost:3001/api/getsensorhistory/${sensorID}?pagination=10`).then(async response => {
        const json_res = await response.json();
        console.log(json_res);
        if (response.status === 200) {
          const formattedData = json_res.reverse().map((data, index) => {
            const [hours, minutes, seconds] = new Date(data.metricTime).toISOString().substr(11, 8).split(':');
            return ({
              time: `${seconds}:${minutes}:${hours}`,
              value: data.metricValue
            })
          });
          setMetricsData(formattedData);
          setSingleMetricDisplay(formattedData[formattedData.length-1].value);
        }
      }).catch(err => {
        console.log(err);
        alert("Network connectivity issues.");
      });
    }, 3000)
  }, []);


  return (
    <div className="sensoritem">
      <div className="sensoritem-top">
        <div className="sensoritem-top-chartarea">
          <LineChart metricsData={metricsData} />
        </div>
        <div className="sensoritem-top-metricarea">
          <div className="metricarea-basicdata">
            <p className="medium__text" style={{ marginTop: "16px" }}>{name}</p>
            <p className="medium__text" style={{ marginTop: "16px" }}>Sensor</p>
            {/* <p className="medium__text" style={{ marginTop: "16px" }}>12.12.12</p> */}
          </div>
          <div className="metricarea-livemetric__container">
            <p className="metricarea-livemetric">{singleMetricDisplay} {metricIndicator}</p>
          </div>
          <div className="metricarea-basicdata" style={{
            position: "absolute",   
            right: "5%",
            bottom: "20px",
            left: "auto",
            top: "auto",
            zIndex: 10000,
            textAlign: "center"
          }}>
            <p className="medium__text" style={{
              marginLeft: "auto",
              marginRight: "auto"
            }}>{sensorID}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorItem;
