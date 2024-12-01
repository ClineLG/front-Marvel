import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import "./modalUserSignUp.css";

const ModalUserSignUp = ({ setSignUp, setLogin, setConnected }) => {
  const [userInfo, setUserInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--dm4qbjsg7dww.code.run/user/avatar?page=${page}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setErrorMessage(error);
      }
    };
    fetchData();
  }, [page]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://site--marvel-backend--dm4qbjsg7dww.code.run/user/signUp", //`https://site--marvel-backend--dm4qbjsg7dww.code.run/user/signUp`, `http://localhost:3000/user/signUp`

        {
          email: userInfo.email,
          password: userInfo.password,
          username: userInfo.username,
          avatar: userInfo.avatar,
        }
      );
      Cookies.set("token", response.data.token, { expires: 30 });
      setConnected(true);
      // console.log(response.data);
      setSignUp(false);
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "Parameters missing") {
        setErrorMessage("Veuillez remplir tous les champs");
      } else if (
        error.response.data.message === "email allready register in DB"
      ) {
        setErrorMessage("Cette adresse email est déjà enregistrée");
      } else {
        setErrorMessage(
          "Une erreur est survenue, veuillez réessayer ultérieurement"
        );
      }
    }
  };

  return (
    <div className="SignUp">
      <div className="mainSign">
        <button
          onClick={() => {
            setSignUp(false);
          }}
          className="closeForm"
        >
          ╳
        </button>
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <h2>S'inscrire</h2>
          <span>Choisi un avatar :</span>
          <div className="bigContainer">
            <div
              className="chevron"
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1);
                }
              }}
            >
              ＜
            </div>
            <div className="avatarContainer">
              {isLoading ? (
                <div>Loading</div>
              ) : (
                data.results.map((character) => {
                  return (
                    character.thumbnail.path !==
                      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" && (
                      <button
                        type="button"
                        className="test"
                        key={character._id}
                      >
                        <img
                          src={`${character.thumbnail.path}/portrait_small.${character.thumbnail.extension}`} //standard_small
                          alt={character.name}
                          onClick={(event) => {
                            const objUser = {
                              ...userInfo,
                              avatar:
                                character.thumbnail.path +
                                "/portrait_small." +
                                character.thumbnail.extension,
                            };
                            setUserInfo(objUser);
                            //   console.log(event.target.style);

                            event.target.style.border = "";
                          }}
                        />
                      </button>
                    )
                  );
                })
              )}
            </div>
            <div
              className="chevron"
              onClick={() => {
                setPage(page + 1);
              }}
            >
              ＞
            </div>
          </div>
          <input
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            onChange={(event) => {
              const objUser = { ...userInfo, username: event.target.value };

              setUserInfo(objUser);
            }}
          />
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
          <button type="submit" className="Submit">
            S'inscrire
          </button>
          {errorMessage && <p className="uWrong">{errorMessage}</p>}
          <p
            className="link"
            onClick={() => {
              setLogin(true);
              setSignUp(false);
            }}
          >
            Déja Inscrit ? Connecte-toi !
          </p>
        </form>
      </div>
    </div>
  );
};
export default ModalUserSignUp;
