import React from "react";

const DashBoard = () => {
  console.log("DashBoard loaded");
  return (
    <div>
      <div className="container mt-5">
        <h1>Welcome</h1>
        <p>This is the dashboard, if you can see this you're logged in.</p>
        <button onClick={() => auth.signOut()} class="btn btn-danger">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default DashBoard;
