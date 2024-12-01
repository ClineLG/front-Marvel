import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import "./modalUserLogin.css";

const ModalUserLogin = ({ setLogin, setSignUp, setConnected }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const [userInfo, setUserInfo] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://site--marvel-backend--dm4qbjsg7dww.code.run/user/login",
        userInfo
      );
      Cookies.set("token", response.data, { expires: 30 });
      console.log(response.data);
      setConnected(true);

      setLogin(false);
    } catch (error) {
      console.log(error);
      if (error.response.data) {
        if (error.response.data.message === "details needed") {
          setErrorMessage("Veuillez remplir tous les champs"); //
        } else if (
          error.response.data.message === "address email unknown" ||
          error.response.data.message === "Wrong password"
        ) {
          setErrorMessage("Mauvais mot de passe et/ou email");
        }
      } else {
        setErrorMessage(
          "Une erreur est survenue, veuillez réessayer ultérieurement"
        );
      }
    }
  };

  return (
    <div className="Login">
      <div>
        <button
          onClick={() => {
            setLogin(false);
          }}
          className="closeForm"
        >
          ╳
        </button>
        <form onSubmit={handleSubmit}>
          <h2>Se connecter</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(event) => {
              const objUser = { ...userInfo, email: event.target.value };

              setUserInfo(objUser);
            }}
          />

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            onChange={(event) => {
              const objUser = { ...userInfo, password: event.target.value };

              setUserInfo(objUser);
            }}
          />

          {errorMessage && <p className="alert">{errorMessage}</p>}

          <button type="submit" className="Submit">
            Se connecter
          </button>
          <p
            onClick={() => {
              setLogin(false);
              setSignUp(true);
            }}
            className="link"
          >
            Pas encore de compte ? Inscrit toi !
          </p>
        </form>
      </div>
    </div>
  );
};

export default ModalUserLogin;
