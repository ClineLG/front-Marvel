import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import batmanComics from "../../../public/imgs/batman/batmanComics/batmanComics";
import funcRandom from "../../func/funcRandom";
import Page from "../../Components/Page/Page";

import "./comics.css";

const Comics = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState({ page: 1, search: "" });
  const [comicsDetail, setComicDetail] = useState({});
  const [result, setResult] = useState(0);
  let pixi = "";
  useEffect(() => {
    const fetchData = async () => {
      setResult(funcRandom(batmanComics.length));
      try {
        const response = await axios.get(
          `https://site--marvel-backend--dm4qbjsg7dww.code.run/comics/?page=${query.page}&search=${query.search}` //search=${query.search}
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [query]);

  return !isLoading ? (
    <section>
      <div className="searchHome Comic">
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input
            type="text"
            placeholder="entre le nom du comics que tu veux trouver"
            onChange={(event) => {
              const newObj = { page: 1, search: event.target.value };
              // newObj.search = event.target.value;
              setQuery(newObj);
            }}
          />
        </form>
      </div>
      <div className="home container">
        {comicsDetail.what ? (
          <div className="characterDetails">
            <div>
              <h3>{comicsDetail.what}</h3>
              <img src={comicsDetail.pix} />
              <p>{comicsDetail.desc}</p>
            </div>
          </div>
        ) : (
          <div className="characterDetails">
            <div>
              <h3></h3>
              <img src={comicsDetail.pix} />
              <p>survol les comics avec ta souris !</p>
            </div>
          </div>
        )}

        <div className="contenentCharacters">
          {data.results.map((comic) => {
            return (
              <Link
                key={comic._id}
                to={`/comic/${comic._id}`}
                onMouseEnter={() => {
                  {
                    comic.thumbnail.path !==
                    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
                      ? (pixi =
                          comic.thumbnail.path +
                          "." +
                          comic.thumbnail.extension)
                      : (pixi = batmanComics[result].src);
                  }
                  setComicDetail({
                    what: comic.title,
                    pix: pixi,
                    desc: comic.description,
                  });
                }}
              >
                <div>
                  <h3>{comic.title}</h3>
                  {/* <p>{comic.description}</p> */}
                  {comic.thumbnail.path !==
                  "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
                    <img
                      src={`${comic.thumbnail.path}/standard_large.${comic.thumbnail.extension}`}
                      alt={comic.title}
                    />
                  ) : (
                    <img
                      className="special"
                      src={batmanComics[result].src}
                      alt="A DC Hero..."
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Page setQuery={setQuery} query={query} data={data} />
    </section>
  ) : (
    <div className="loader"></div>
  );
};
export default Comics;
