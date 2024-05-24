"use client";
import { GroupItem, Header } from "@/Components";
import Image from "next/image";
import { useState, useEffect } from "react";
export default function Home() {

  const [displayedGroups, setDisplayedGroups] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [groupName, setGroupName] = useState("");
  const [groupInfo, setGroupInfo] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/getallgroups").then(async res => {
      const json_res = await res.json();
      console.log(json_res);
      if (res.status === 200) {
        setDisplayedGroups(json_res);  
      };
    }).catch(err => {
      console.log(err);
      alert("Network connectivity issues.");
    })


  }, [])

  const createGroup = async () => {
    console.log(groupName);
    console.log(groupInfo);
    setModalVisible(false)
    try {
      const response = await fetch("http://localhost:3001/api/creategroup", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          name: groupName,
          paragraph: groupInfo
        })
      });
      if (response.status === 200) {
        window.location.reload();
      } else {
        const json_res = await response.json();
        alert(json_res.message);
      };
    } catch (err) {
      console.log(err);
      alert("Network connectivity issues.");
    };


  }


  return (
    <main className="main__container">

      <Header />

      <div className="titleandcreate">
        <p className="medium__text" style={{
          marginLeft: "48px"
        }}>Groups</p>
        <div className="titleandcreate-right">
          <p className="medium__text" style={{
            marginRight: "48px"
          }}>Create Group</p>
          <div
            className="titleandcreate-plus"
            onClick={() => setModalVisible(true)}>
            <p className="medium__text white__text">+</p>
          </div>
        </div>
      </div>


      {displayedGroups.map(item => (
        <GroupItem key={item.groupID}
          name={item.name}
          devicesCount={item.devicesCount}
          creationDate={item.creationDate}
          groupID={item.groupID}
        />
      ))}


      {modalVisible && (
        <div className="modal-background">
          <div className="modal">
            <div className="modal-top__container">
              <p className="medium__text" style={{
                marginTop: "26px"
              }}>Create new Group</p>
              <div className="modal-exit" onClick={() => setModalVisible(false)}>
                <p className="medium__text white__text" style={{
                  fontWeight: "bold"
                }}>x</p>
              </div>
            </div>

            <input style={{
              marginTop: "156px"
            }} value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="Group Name" type="text" className="modal-input"/>
            <input value={groupInfo} onChange={(e) => setGroupInfo(e.target.value)} placeholder="Group Info" type="text" className="modal-input"/>

            <div className="modal-uploadbutton" onClick={createGroup}>
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
