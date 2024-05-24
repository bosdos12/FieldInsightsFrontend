"use client"
import React from 'react'

const GroupItem = ({name, devicesCount, creationDate, groupID}) => {


  const navigateToGroupPage = () => {
    // Save groupID to localstorage for fetching group data once in the page;
    localStorage.setItem("groupID", groupID);

    window.location.href = "/managegroup";
  }


  return (
    <div className="groupitem" onClick={navigateToGroupPage}>
      <p className="medium__text" style={{
        marginLeft: "26px",
        marginTop: "13px"
      }}>{name}</p>
      <p className="medium__text green__text" style={{
        marginTop: "13px"
      }}>{devicesCount} Devices</p>
      <p className="medium__text" style={{
        marginTop: "13px",
        marginRight: "26px"
      }}>{creationDate}</p>
    </div>
  )
}

export default GroupItem