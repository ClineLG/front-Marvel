import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import bat from "../../../public/imgs/batman/batman-portait/bat1.jpg";

import { GiSpiderMask } from "react-icons/gi";

import "./comic.css";

const Comic = () => {
  const params = useParams();
  // console.log(params.characterId);
  const comicId = params.comicId;
  const [data, setData] = useState({ comic: {}, characters: {} });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  // const [fav, setFav] = useState([]);
  // let fav = Cookies.get("favories");
  const token = Cookies.get("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--dm4qbjsg7dww.code.run/comic/${comicId}` //search=${query.search}
        );

        const response2 = await axios.get(
          `https://site--marvel-backend--dm4qbjsg7dww.code.run/comic/characters/${comicId}`
        ); //comic/characters/:comicId

        const obj1 = { comic: response.data, characters: response2.data };
        setData(obj1);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const handleClick = async (data) => {
    try {
      console.log(data.comic);
      const response = await axios.put(
        "https://site--marvel-backend--dm4qbjsg7dww.code.run/user/favories",
        data.comic,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return !isLoading ? (
    <section>
      {/* {console.log(data)} */}

      <div className="container comicBook">
        <div className="ComicDetails">
          <div className="comic">
            <GiSpiderMask
              className="favories"
              onClick={() => {
                handleClick(data);

                // if (!fav.includes("*comic-" + data.comic._id)) {
                //   Cookies.set("favories", (fav += "*comic-" + data.comic._id), {
                //     expires: 30,
                //   });
                // }
              }}
            />
            <h1>{data.comic.title}</h1>

            {data.comic.thumbnail.path !==
            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
              <img
                src={`${data.comic.thumbnail.path}.${data.comic.thumbnail.extension}`}
                alt={data.comic.title}
              />
            ) : (
              <img src={bat} alt="DC character" />
            )}

            <p>{data.comic.description}</p>
          </div>
        </div>
        <div className="characterContainer">
          {data.characters.map((character) => {
            return (
              <Link key={character._id} to={`/character/${character._id}`}>
                <div>
                  {character.thumbnail.path !==
                  "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
                    <img
                      className="alt"
                      src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                      alt={character.title}
                    />
                  ) : (
                    <img src={bat} alt="DC character" className="alt" />
                  )}

                  <h3>{character.name}</h3>
                  <p>{character.description}</p>
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

export default Comic;
