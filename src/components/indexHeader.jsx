import React from "react";
import logo from "../assets/logoCosci.png";

export default function indexHeader() {
  return (
    <div style={{ backgroundColor: "#36609d" }} class="static bottom-0 left-0 ">
      <img
        style={{ width: "160px", height: "auto", marginLeft: "50px" }}
        src={logo}
      />
    </div>
  );
}
