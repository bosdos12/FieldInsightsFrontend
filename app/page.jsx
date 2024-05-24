"use client";
import { GroupItem, Header } from "@/Components";
import Image from "next/image";
import { useState, useEffect } from "react";
export default function Home() {

  const [displayedGroups, setDisplayedGroups] = useState([]);

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
          <div className="titleandcreate-plus">
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



    </main>
  );
}
