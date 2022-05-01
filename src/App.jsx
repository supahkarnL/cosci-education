import React, { useContext, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";

import Register from "./components/Register";
import Header from "./components/header";
import Login from "./components/Login";
import Check from "./components/Check";
import ScoreRecord from "./components/ScoreRecord";
import Calculate from "./components/Calculate";
import Information from "./components/information";
import Guide from "./components/guide";
import Notfound from "./components/notfound";
import Summary from "./components/Summary";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";

import Datatest from "./components/GradeCalculateTest/testCalculate";

import axios from "axios";
import useAuth from "./hooks/useAuth";
import InputInfo from "./components/InputInfo";
import CalScoreInfo from "./components/CalScoreInfo";
import StudentGrade from "./components/StudentGrade";

function App() {
  const { authState } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/test/:id" element={<Datatest />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/check" element={<Check />} />
          <Route path="/scorerecord" element={<ScoreRecord />} />
          <Route path="/calculate" element={<Calculate />} />
          <Route path="/calscoreinfo/:id" element={<CalScoreInfo />} />
          <Route path="/InputInfo/:id" element={<InputInfo />} />
          <Route path="/studentgrade/:id" element={<StudentGrade />} />
          <Route path="/summary/:id" element={<Summary />} />
          <Route path="/information" element={<Information />} />
          <Route path="/guide" element={<Guide />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Notfound />} />
      </Route>
    </Routes>
  );
}

export default App;
