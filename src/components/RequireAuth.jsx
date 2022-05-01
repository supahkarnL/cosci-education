import React, { Component, useEffect } from "react";
import { useLocation, useNavigate, Outlet, Link } from "react-router-dom";
import axios from "axios";

import Header from "./header";
import Sidebar from "./Sidebar";
const navigate = useNavigate;

export class RequireAuth extends Component {
  state = { username: "", id: 0, status: false };

  componentDidMount() {
    axios
      .get("http://192.168.1.35:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          this.setState({ ...this.state, status: false });
        } else {
          this.setState({
            username: response.data.username,
            id: response.data.uuid,
            status: true,
          });
        }
      });
  }

  render() {
    if (this.state.status) {
      return (
        <>
          <div className="flex h-full">
            <Sidebar />
            <div className="h-screen flex-1 sm:pl-80 pl-24 sm:pr-8 pr-5 py-7 bg-[#F8F9FF]">
              <Header />
              <Outlet context={this.state} />
            </div>
          </div>
        </>
      );
    } else {
      console.log(false);
      return (
        <div>
          failed, you not login{" "}
          <Link to="/login">
            <button>click back</button>
          </Link>
        </div>
      );
      // <Navigate to="/login" />;
    }
  }
}

export default RequireAuth;
