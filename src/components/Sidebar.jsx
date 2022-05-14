import React from "react";
import { SidebarData } from "./Sidebardata";
import { useState } from "react";
import { Icon } from "@iconify/react";

import { Router } from "react-router-dom";
import "../css/Home.css";
import { Navigate, Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  let history = useNavigate();

  return (
    <div className="">
      <div
        className={`h-full md:w-72 w-20 bg-dark-purple p-5 pt-8 duration-300 fixed top-0 `}
      >
        {/* <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
       border-2 rounded-full `}
          onClick={() => setOpen(!open)}
        /> */}
        <div className="flex gap-x-4 items-center">
          <img
            src="https://sv1.picz.in.th/images/2022/05/13/Hc7K39.png"
            className={`cursor-pointer duration-500 w-16`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 md:visible invisible `}
          >
            COSCI EDU
          </h1>
        </div>
        <ul className="pt-6 ">
          {SidebarData.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 active:bg-light-white text-sm items-center gap-x-4 
          ${Menu.gap ? "md:mt-9 mt-2" : "mt-2"} ${
                window.location.pathname == Menu.Link ? "bg-light-white" : ""
              }`}
              onClick={() => {
                history(`${Menu.Link}`);
              }}

              // isActive={pathname === Menu.Link}
              // active={Menu.active}
            >
              <Icon icon={Menu.icon} style={{ fontSize: "22px" }} />

              <span className={`md:visible invisible origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
