import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Page from "../../Components/Page/Page";

import batPortrait from "../../assets/imgs/batman/batman-portait/batPortrait";
import "./Personnages.css";

import funcRandom from "../../func/funcRandom";
import familly from "../../assets/imgs/familly.jpg";
const Personnages = () => {
  // batmanComics.map(({ id, src }) => <img key={id} src={src} />);
  // console.log(batmanComics[3]);
  // console.log(funcRandom(batmanComics.length));
  // console.log(batmanComics[2].src);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState({ page: 1, search: "" });
  const [characterDetail, setCharacterDetail] = useState({});
  const [result, setResult] = useState(0);

  console.log(result);
  let pixi = "";
  useEffect(() => {
    setResult(funcRandom(batPortrait.length));
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--dm4qbjsg7dww.code.run/characters/?page=${query.page}&search=${query.search}`
        ); //`https://site--marvel-backend--dm4qbjsg7dww.code.run/characters/?page=${query.page}&search=${query.search}`
        // `http://localhost:3000/characters/?page=${query.page}&search=${query.search}`

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [query]);
  const tabPages = [];
  if (!isLoading) {
    const numberPages = Math.ceil(data.count / 100);

    for (let i = 0; i < numberPages; i++) {
      tabPages.push(i + 1);
    }
  }
  return !isLoading ? (
    // ? console.log(data)
    <section>
      <div className="hero">
        <img src={familly} alt="" />{" "}
        <div className="topHero">
          <h1>
            Plongez dans l'univers Marvel, un monde où les personnages
            s'affrontent dans des batailles épiques, où l'aventure ne s'arrête
            jamais. Un univers où tout est possible !
          </h1>
        </div>
      </div>
      <div className="searchHome">
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input
            type="text"
            placeholder="entre le nom du persononage que tu veux trouver !"
            onChange={(event) => {
              const newObj = { page: 1, search: event.target.value };
              // newObj.search = event.target.value;
              setQuery(newObj);
            }}
          />
        </form>
      </div>
      <div className="home container">
        {characterDetail.who ? (
          <div className="characterDetails">
            <div>
              <h3>{characterDetail.who}</h3>
              <img src={characterDetail.pix} />
              <p>{characterDetail.desc}</p>
            </div>{" "}
          </div>
        ) : (
          <div className="characterDetails">
            <div>
              <h3></h3>
              <img src={characterDetail.pix} />
              <p>survol les personnages avec ta souris !</p>
            </div>
          </div>
        )}

        <div className="contenentCharacters">
          {data.results.map((character) => {
            return (
              <Link
                key={character._id}
                to={`/character/${character._id}`}
                onMouseEnter={() => {
                  {
                    character.thumbnail.path !==
                    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
                      ? (pixi =
                          character.thumbnail.path +
                          "." +
                          character.thumbnail.extension)
                      : (pixi = batPortrait[result].src);
                  }
                  setCharacterDetail({
                    who: character.name,
                    pix: pixi,
                    desc: character.description,
                  });
                }}
              >
                <div>
                  <h3>{character.name}</h3>
                  {/* <p>{character.description}</p> */}
                  {character.thumbnail.path !==
                  "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
                    <img
                      src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                      alt={character.name}
                    />
                  ) : (
                    <img
                      className="special"
                      src={batPortrait[result].src}
                      alt=""
                    />
                    //  <img
                    // src={batmanComics[funcRandom(batmanComics.length)].src}
                    //alt="A DC Hero..."
                    ///>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>{" "}
      {console.log(data)}
      <Page setQuery={setQuery} query={query} data={data} />
    </section>
  ) : (
    <div className="loader"></div>
  );
};
export default Personnages;
