"use client";
import React, { useState, useEffect } from 'react';
import LineChart from './LineChart'; // Ensure the correct import path

const SensorItem = ({
  name
}) => {
  const [metricsData, setMetricsData] = useState([]);

  useEffect(() => {
    // Simulate fetching data from API
    const testData = [
      { timestamp: "2024-05-01T10:00:00Z", value: 20 },
      { timestamp: "2024-05-01T11:00:00Z", value: 22 },
      { timestamp: "2024-05-01T12:00:00Z", value: 21 },
      { timestamp: "2024-05-01T13:00:00Z", value: 24 },
      { timestamp: "2024-05-01T14:00:00Z", value: 23 },
      { timestamp: "2024-05-01T15:00:00Z", value: 25 },
      { timestamp: "2024-05-01T16:00:00Z", value: 27 }
    ];

    const formattedData = testData.map((data, index) => {

      const [hours, minutes, seconds] = new Date(data.timestamp).toISOString().substr(11, 8).split(':');

      return ({
        time: `${seconds}:${minutes}:${hours}`,
        value: data.value
      })

    });

    setMetricsData(formattedData);
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
            <p className="medium__text" style={{ marginTop: "16px" }}>12.12.12</p>
          </div>
          <div className="metricarea-livemetric__container">
            <p className="metricarea-livemetric">50C</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorItem;
