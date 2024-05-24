"use client";
import React, { useState, useEffect } from 'react';
import LineChart from './LineChart'; // Ensure the correct import path

const ActuatorItem = ({
  actuatorID, name
}) => {
  return (
    <div className="actuatoritem">
      <p className="medium__text" style={{ marginTop: "27px" }}>{name}</p>
      <p className="medium__text" style={{ marginTop: "27px" }}>{actuatorID}</p>
      <p className="medium__text" style={{ marginTop: "27px" }}>Actuator</p>
    </div>
  );
};

export default ActuatorItem;
