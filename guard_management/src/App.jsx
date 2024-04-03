
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import SignUp from "./Components/signup";
import SignInSide from "./Components/signin";


import Appartments from "./Components/appartments";
import Guards from "./Components/guards";
import Form from "./Components/form";
import { Home } from "./Components/Home";

import { ApartmentPage } from "./Components/apartmentPage";
import { MarkAttendancePage } from "./Components/markAttendancePage";
import { ViewAttendancePage } from "./Components/viewAttendancePage";
import { StartPatrol } from "./Components/startPatrol";

import { GuardPage } from "./Components/guardPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import ButtonAppBar from "./Components/AppBar";
import { ViewPatrolHistory } from "./Components/viewPatrolHistory"
import { TestMobile } from "./Components/testMobile";
import { AdminHomePage } from "./Components/adminHomePage";
import { GrantAdvance } from "./Components/grantAdvance";
import { AdminAttendance } from "./Components/adminAttendance";
import { AdminPayroll } from "./Components/adminPayroll";
import { AdminPatrolHistory } from "./Components/adminPatolHistory";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <RecoilRoot>
        <Router>
          <ButtonAppBar />
          <Routes>
            <Route path={"/signin"} element={<SignInSide />} />
            <Route path={"/"} element={<SignUp />} />
          </Routes>
        </Router>
      </RecoilRoot> */}
      <RecoilRoot>
        <ButtonAppBar />
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/apartmentPage"} element={<ApartmentPage />} />
            <Route path={"/apartmentPage/markAttendance"} element={<MarkAttendancePage />} />
            <Route path={"/apartmentPage/viewAttendance"} element={<ViewAttendancePage />} />
            <Route path={"/apartmentPage/startPatrol"} element={<StartPatrol />} />
            <Route path={"/apartments"} element={<Appartments />} />
            <Route path={"/form"} element={<Form />} />
            <Route path={"/guards"} element={<Guards />} />
            <Route path={"/signup"} element={<SignUp />} />
            <Route path={"/signin"} element={<SignInSide />} />
            <Route path={"/testMobile"} element={<TestMobile />} />
            <Route path={"/guardPage"} element={<GuardPage />} />
            <Route path={"/apartmentPage/patrolHistory"} element={<ViewPatrolHistory />} />
            <Route path={"/adminPage/home"} element={<AdminHomePage />} />
            <Route path={"/adminPage/grantAdvance/:apartmentId"} element={<GrantAdvance />} />
            <Route path={"/adminPage/attendance/:apartmentId"} element={<AdminAttendance />} />
            <Route path={"/adminPage/payroll/:apartmentId"} element={<AdminPayroll />} />
            <Route path={"/adminPage/patrolHistory/:apartmentId"} element={<AdminPatrolHistory />} />
            
            <Route path={"/adminPage/home"} element={<AdminHomePage />} />
            <Route path={"/adminPage/home"} element={<AdminHomePage />} />
            <Route path={"/adminPage/home"} element={<AdminHomePage />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
