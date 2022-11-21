
import React from "react"

export default function Die (props) {
  const dieStyles = {
    backgroundColor: `${props.isHeld ? "#59E391" : "#FFFFFF"}`
  };

  return (
    <div className="die" style={dieStyles} onClick={() => props.handleHeld(props.id)}>
      <img
      src={`/assets/dice ${props.value}.png`}
      alt="die image"
      className={props.isHeld ? `die-image-filtered` : `die-image`}/>
      <h1>{props.value}</h1>
    </div>
  )
}
