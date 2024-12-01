import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./header.css";
import { useEffect, useState } from "react";
import axios from "axios";

import { GiSpiderMask } from "react-icons/gi";

import mainLogo from "../../../public/imgs/logo.png";
import { FaPowerOff } from "react-icons/fa6";

const Header = ({ setSignUp, setLogin, setConnected, connected }) => {
  const [userDetails, setUserDetails] = useState({});
  const [isloading, setIsLoading] = useState(true);
  const token = Cookies.get("token");

  useEffect(() => {
    if (connected) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://site--marvel-backend--dm4qbjsg7dww.code.run/user/details`,
            {
              headers: {
                authorization: "Bearer " + token,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log(response.data);
          setUserDetails(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchData();
    }
  }, [connected]);

  return isloading ? (
    <header>
      <div>
        <div className="container">
          <div>
            <Link to="/">
              <span>PERSONNAGES</span>
            </Link>
            <Link to="/comics">
              <span>COMICS</span>
            </Link>
          </div>
          <Link to="/">
            <img src={mainLogo} alt="" />
          </Link>
          <div id="connectionFeat">
            <Link
              onClick={() => {
                setLogin(true);
                setSignUp(false);
              }}
            >
              <span> SE CONNECTER</span>
            </Link>
            <Link
              onClick={() => {
                setLogin(false);
                setSignUp(true);
              }}
            >
              <span> S'INSCRIRE</span>
            </Link>
          </div>
          {/* <Link to="/favorites">Favories</Link> */}
        </div>
      </div>
    </header>
  ) : !isloading && !connected ? (
    <header>
      {setIsLoading(true)}
      <div>
        <div className="container">
          <div>
            <Link to="/">
              <span>PERSONNAGES</span>
            </Link>
            <Link to="/comics">
              <span>COMICS</span>
            </Link>
          </div>
          <Link to="/">
            <img src={mainLogo} alt="" />
          </Link>
          <div id="connectionFeat">
            <Link
              onClick={() => {
                setLogin(true);
                setSignUp(false);
              }}
            >
              <span> SE CONNECTER</span>
            </Link>
            <Link
              onClick={() => {
                setLogin(false);
                setSignUp(true);
              }}
            >
              <span> S'INSCRIRE</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  ) : (
    !isloading &&
    connected && (
      <header>
        <div>
          <div className="container">
            <Link to="/" className="testA">
              <img src={mainLogo} alt="" />
            </Link>
            <div className="persoComic">
              <Link to="/">
                <span>PERSONNAGES</span>
              </Link>
              <Link to="/comics">
                <span>COMICS</span>
              </Link>
            </div>

            <div className="connectedFeat">
              <Link to="/favorites" className="favoriess">
                <p>FAVORIS</p>
                <GiSpiderMask className="biggerHead" />
              </Link>

              <div
                className="deconnection"
                onClick={() => {
                  Cookies.remove("token");
                  setConnected(false);
                  setUserDetails("");
                }}
              >
                <div>
                  <img src={userDetails.account.avatar} alt="avatar" />
                  <span>{userDetails.account.username}</span>

                  <FaPowerOff />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  );
};
export default Header;
