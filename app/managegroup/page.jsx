"use client";
import { SensorItem, Header, GroupItem, ActuatorItem } from "@/Components";
import Image from "next/image";
import { useState, useEffect } from "react";


export default function Home() {

  const [displayedDevices, setDisplayedDevices] = useState([]);
  const [sensorModalVisible, setSensorModalVisible] = useState(false);
  const [actuatorModalVisible, setActuatorModalVisible] = useState(false);

  const [allGroups, setAllGroups] = useState([]);
  
  const [deviceName, setDeviceName] = useState("");
  const [deviceGroup, setDeviceGroup] = useState("");

  const [displayedGroupName, setDisplayedGroupName] = useState("");

  useEffect(() => {

    // Check if the group id exists in the localstorage
    const groupID = localStorage.getItem("groupID");
    const nameofgroup = localStorage.getItem("displayedGroupName");
    setDeviceGroup(groupID);
    setDisplayedGroupName(nameofgroup);

    if (!groupID || groupID.length <= 0) {
      alert("No group selected");
      window.location.href = "/";
    };

    fetch(`http://localhost:3001/api/getallgroupdevices/${groupID}`).then(async res => {
      const json_res = await res.json();
      console.log(json_res);
      if (res.status === 200) {
        setDisplayedDevices(json_res);
      };
    }).catch(err => {
      console.log(err);
      alert("Network connectivity issues.");
    })

    // Fetch all groups so we can offer group-selection for the devices
    fetch("http://localhost:3001/api/getallgroups").then(async res => {
      if (res.status === 200) {
        const json_res = await res.json();
        console.log("all groups!");
        console.log(json_res);
        setAllGroups(json_res);
      };
    }).catch(err => {
      console.log(err);
      alert("Network connectivity issues.");
    })

  }, [])

  
  const createActuator = async () => {
    alert("create actuator!");

    try {
      const response = await fetch("http://localhost:3001/api/createactuator", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          name: deviceName,
          groupID: deviceGroup
        })
      });
      if (response.status === 200) {
        alert("nice!");
        window.location.reload();
      } else {
        const json_res = await response.json();
        alert(json_res.message);
      };
    } catch (err) {
      console.log(err);
      alert("Network connectivity issues.");
    }
  };

  const createSensor = async () => {
    const metricIndicatorInput = document.getElementById("metricindicatorinput").value;
    console.log(metricIndicatorInput);
    const metricPeriod = document.getElementById("metricperiodinput").value;
    console.log(metricPeriod);
    try {
      const response = await fetch("http://localhost:3001/api/createsensor", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          name: deviceName,
          groupID: deviceGroup,
          metricIndicator: metricIndicatorInput,
          period: metricPeriod
        })
      });
      if (response.status === 200) {
        alert("nice!");
        window.location.reload();
      } else {
        const json_res = await response.json();
        alert(json_res.message);
      };
    } catch (err) {
      console.log(err);
      alert("Network connectivity issues.");
    }
  };


  return (
    <main className="main__container">

      <Header />

      <div className="titleandcreate">
        <p className="medium__text" style={{
          marginLeft: "48px"
        }}>Devices of {displayedGroupName} group.</p>
        <div className="titleandcreate-right">
          <p className="medium__text" style={{
            marginRight: "48px"
          }}>Create Sensor</p>
          <div
            className="titleandcreate-plus"
            onClick={() => setSensorModalVisible(true)}>
            <p className="medium__text white__text">+</p>
          </div>
        </div>
      </div>
      <div className="titleandcreate">
        <p className="medium__text" style={{
          marginLeft: "48px"
        }}></p>
        <div className="titleandcreate-right">
          <p className="medium__text" style={{
            marginRight: "48px"
          }}>Create Actuator</p>
          <div
            className="titleandcreate-plus"
            onClick={() => setActuatorModalVisible(true)}>
            <p className="medium__text white__text">+</p>
          </div>
        </div>
      </div>

      <div className="horizontal__split">

        <div className="horizontal__split-single left" style={{
          paddingTop: "26px"
        }}>
          {/* <div style={{
            width: "100%",
            height: "fit-content",
            marginBottom: "26px"
          }}>
            <p className="medium__text" style={{marginTop: "26px"}}>Devices</p>
          </div> */}

          {displayedDevices.map(item => 
              typeof item.metricIndicator === "string" ? (
              <SensorItem
                key={item._id}
                sensorID={item._id}
                name={item.name}
                metricIndicator={item.metricIndicator}
              />
            ) : (
              <ActuatorItem
                key={item._id}
                actuatorID={item._id}
                name={item.name}
              />
            )
          )}

        </div>
        
        {/* Spacer */}
        <div style={{width: "100%", height: "100%"}}></div>
        
        <div className="horizontal__split-single">
          {/* <div style={{
            width: "100%",
            height: "fit-content",
            textAlign: "right"
          }}>
            <p className="medium__text" style={{marginTop: "26px"}}>Map Data</p>
          </div> */}

          <div className="hookmanager">
            <div style={{
              width: "100%",
              height: "100px"
            }}>

            </div>
            <div className="hookmanager-single">

              <div className="hookmanager-single-container">
                <p className="small__text">Sensor</p>
                <select name="" id="">
                  <option value="">Sensor</option>
                </select>
              </div>


              <div className="hookmanager-single-container">
                <p className="small__text">Condition</p>
                <select name="" id="">
                  <option value="lessthen">lessthen</option>
                  <option value="morethen">lessthen</option>
                </select>
              </div>


              <div className="hookmanager-single-container">
                <p className="small__text">Conditional</p>
                <input type="number" placeholder="Comparison value" />
              </div>

              <div className="hookmanager-single-container">
                <p className="small__text">Actuator</p>
                <select name="" id="">
                  <option value="">Actuator</option>
                </select>
              </div>

              
              <div className="hookmanager-single-container">
                <p className="small__text">Run Time (s)</p>
                <input type="number" />
              </div>

            </div>
          </div>

        </div>

      </div>


      {sensorModalVisible && (
        <div className="modal-background">
          <div className="modal">
            <div className="modal-top__container">
              <p className="medium__text" style={{
                marginTop: "26px"
              }}>Create new Sensor.</p>
              <div className="modal-exit" onClick={() => setSensorModalVisible(false)}>
                <p className="medium__text white__text" style={{
                  fontWeight: "bold"
                }}>x</p>
              </div>
            </div>

            <input style={{
              marginTop: "156px"
            }} value={deviceName} onChange={(e) => setDeviceName(e.target.value)} placeholder="Sensor Name" type="text" className="modal-input"/>
            
            
            <select name="" id="metricindicatorinput" className="modal-input">
              <option value="°C">Air Temperature (°C)</option>
              <option value="M(%)">Moisture Percentage</option>
              <option value="H(%)">Humidity (%)</option>
              <option value="Lux">Light Intensity (LUX)</option>
              <option value="Co2 PPM">Carbon Dioxide (PPM)</option>
              <option value="PH">Soil PH</option>
              <option value="w(m/s)">Wind (m/s)</option>
              <option value="EC">Electrical Conductivitity`</option>
            </select>

            <input placeholder="Metric Period (Seconds)" type="number" id="metricperiodinput" className="modal-input"/>
            {/* <select id="groupselector" className="modal-input">
              {allGroups.map(item => {
                console.log(item);
                return <option key={item.groupID} value={item.groupID}>{item.name}</option>
              })}
            </select> */}
            <p className="medium__text" style={{
              marginTop: "26px",
              marginLeft: "auto",
              marginRight: "auto"
            }}>{deviceGroup}</p>

            <div className="modal-uploadbutton" onClick={createSensor}>
              <p className="medium__text white__text">
                Upload
              </p>
            </div>

          </div>
        </div>
      )}


      {actuatorModalVisible && (
        <div className="modal-background">
          <div className="modal">
            <div className="modal-top__container">
              <p className="medium__text" style={{
                marginTop: "26px"
              }}>Create new Actuator.</p>
              <div className="modal-exit" onClick={() => setActuatorModalVisible(false)}>
                <p className="medium__text white__text" style={{
                  fontWeight: "bold"
                }}>x</p>
              </div>
            </div>

            <input style={{
              marginTop: "156px"
            }} value={deviceName} onChange={(e) => setDeviceName(e.target.value)} placeholder="Actuator Name" type="text" className="modal-input"/>
            
            {/* <select id="groupselector" className="modal-input">
              {allGroups.map(item => {
                console.log(item);
                return <option key={item.groupID} value={item.groupID}>{item.name}</option>
              })}
            </select> */}
            <p className="medium__text" style={{
              marginTop: "26px",
              marginLeft: "auto",
              marginRight: "auto"
            }}>{deviceGroup}</p>

            <div className="modal-uploadbutton" onClick={createActuator}>
              <p className="medium__text white__text">
                Upload
              </p>
            </div>

          </div>
        </div>
      )}


    </main>
  );
}
