import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ButtonAppBar from "./Components/AppBar";
import SignUp from "./Components/signup";
import SignInSide from "./Components/signin";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Appartments from "./Components/appartments"
import Guards from "./Components/guards"
import Form from "./Components/form"
import { Home } from "./Components/Home";

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
            <Route path={"/apartments"} element={<Appartments />} />
            <Route path={"/form"} element={<Form />} />
            <Route path={"/guards"} element={<Guards />} />
            <Route path={"/signup"} element={<SignUp />} />
            <Route path={"/signin"} element={<SignInSide />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
