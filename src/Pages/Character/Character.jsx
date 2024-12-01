import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import { GiSpiderMask } from "react-icons/gi";
import "./character.css";
import bat from "../../../public/imgs/batman/batman-portait/bat1.jpg";

const Character = () => {
  const params = useParams();
  // console.log(params.characterId);
  const characterId = params.characterId;
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [Message, setMessage] = useState("");

  // let fav = Cookies.get("favories");
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--dm4qbjsg7dww.code.run/characterInComics/${characterId}` //search=${query.search}
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const handleClick = async (data) => {
    try {
      console.log("");
      const response = await axios.put(
        "https://site--marvel-backend--dm4qbjsg7dww.code.run/user/favories",
        {
          _id: data._id,
          thumbnail: data.thumbnail,
          name: data.name,
          description: data.description,
        },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      if (response.data) {
        setMessage("Ajouté avec succés à vos favories");
      }
    } catch (error) {
      if (error.response.data.message === "wrong token") {
        setMessage(
          "Vous devez être connecté pour ajouté cette fiche à vos favories !"
        );
      }
      console.log(error);
    }
  };

  return !isLoading ? (
    <section>
      <div className="container comicBook">
        <div className="errorMessage">
          <p>{Message}</p>
        </div>
        <div className="ComicDetails">
          <div>
            <h1>{data.name}</h1>

            <div className="imgToFav">
              {data.thumbnail.path !==
              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
                <img
                  src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
                  alt={data.name}
                />
              ) : (
                <img src={bat} alt="DC character" />
              )}

              <GiSpiderMask
                className="favories"
                onClick={() => {
                  handleClick(data);

                  // if (!fav.includes("*character-" + data._id)) {
                  //   Cookies.set("favories", (fav += "*character-" + data._id), {
                  //     expires: 30,
                  // });
                  // }
                }}
              />
            </div>

            <p>{data.description}</p>
          </div>
        </div>
        <div className="characterContainer">
          {data.comics.map((comic) => {
            return (
              <Link key={comic._id} to={`/comic/${comic._id}`}>
                <div>
                  {comic.thumbnail.path !==
                  "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
                    <img
                      src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                      alt={comic.title}
                    />
                  ) : (
                    <img src={bat} alt="DC character" />
                  )}

                  <h3>{comic.title}</h3>
                  <p>{comic.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  ) : (
    <div className="loader"></div>
  );
};

export default Character;
