import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <div className="header">
      <div className="header-section">
        <Link href="/" style={{textDecoration: "none"}}>
          <div className="header-button">
            <p className="medium__text white__text">Dashboard</p>
          </div>
        </Link>

        <Link href="/devices" style={{textDecoration: "none"}}>
          <div className="header-button">
            <p className="medium__text white__text">Devices</p>
          </div>
        </Link>
      </div>
  
      <div className="header-section">
        <div className="header-logocontainer">
          <p className="large__text green__text">Field Insights</p>
        </div>
      </div>
    </div>
  )
}

export default Header