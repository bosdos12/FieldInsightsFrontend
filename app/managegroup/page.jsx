"use client";
import { SensorItem, Header, GroupItem } from "@/Components";
import Image from "next/image";
import { useState, useEffect } from "react";


export default function Home() {

  const [displayedDevices, setDisplayedDevices] = useState([]);
  const [sensorModalVisible, setSensorModalVisible] = useState(false);
  const [actuatorModalVisible, setActuatorModalVisible] = useState(false);

  const [allGroups, setAllGroups] = useState([]);
  
  const [deviceName, setDeviceName] = useState("");
  const [deviceGroup, setDeviceGroup] = useState("");


  useEffect(() => {

    // Check if the group id exists in the localstorage
    const groupID = localStorage.getItem("groupID");
    setDeviceGroup(groupID);

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
    alert("create sensor");
  };


  return (
    <main className="main__container">

      <Header />

      <div className="titleandcreate">
        <p className="medium__text" style={{
          marginLeft: "48px"
        }}>Devices</p>
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

        <div className="horizontal__split-single left">
          {/* <div style={{
            width: "100%",
            height: "fit-content",
            marginBottom: "26px"
          }}>
            <p className="medium__text" style={{marginTop: "26px"}}>Devices</p>
          </div> */}

          {displayedDevices.map(item => (
            <SensorItem key={item._id} name={item.name}/>
          ))}

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

          </div>

        </div>

      </div>



      {actuatorModalVisible && (
        <div className="modal-background">
          <div className="modal">
            <div className="modal-top__container">
              <p className="medium__text" style={{
                marginTop: "26px"
              }}>Create new device.</p>
              <div className="modal-exit" onClick={() => setActuatorModalVisible(false)}>
                <p className="medium__text white__text" style={{
                  fontWeight: "bold"
                }}>x</p>
              </div>
            </div>

            <input style={{
              marginTop: "156px"
            }} value={deviceName} onChange={(e) => setDeviceName(e.target.value)} placeholder="Group Name" type="text" className="modal-input"/>
            
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
