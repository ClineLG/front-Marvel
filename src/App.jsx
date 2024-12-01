import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
//pages import
import Personnages from "./Pages/Personnages/Personnages";
import Character from "./Pages/Character/Character";
import Comics from "./Pages/Comics/Comics";
import Comic from "./Pages/Comic/Comic";
import Favorites from "./Pages/Favorites/Favorites";
//components import
import Header from "./Components/Header/Header";
import ModalUserSignUp from "./Components/ModalsUserSignUp/ModalUserSignUp";
import ModalUserLogin from "./Components/ModalUserLogin/ModalUserLogin";

import "./App.css";

function App() {
  const [signUp, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);
  const [connected, setConnected] = useState(
    Cookies.get("token") ? true : false
  );

  return (
    <div className={signUp || login ? "On" : ""}>
      <Router>
        <Header
          setSignUp={setSignUp}
          setLogin={setLogin}
          signUp={signUp}
          connected={connected}
          setConnected={setConnected}
        />
        <Routes>
          <Route path="/" element={<Personnages />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/comic/:comicId" element={<Comic />} />
          <Route path="/character/:characterId" element={<Character />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        {signUp && (
          <ModalUserSignUp
            setLogin={setLogin}
            setSignUp={setSignUp}
            setConnected={setConnected}
          />
        )}

        {login && (
          <ModalUserLogin
            setSignUp={setSignUp}
            setLogin={setLogin}
            setConnected={setConnected}
          />
        )}
      </Router>
    </div>
  );
}

export default App;
