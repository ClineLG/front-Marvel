import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import { TfiTrash } from "react-icons/tfi";
import "./favorites.css";
const Favorites = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [update, setUpdate] = useState({});
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--dm4qbjsg7dww.code.run/user/favories`,
          {
            headers: {
              authorization: "Bearer " + token,
            },
          }
        );

        setData(response.data);
        console.log("data fav", data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [update]);

  const handleClick = async (fav) => {
    try {
      console.log("fav", fav._id);
      const response = await axios.delete(
        `https://site--marvel-backend--dm4qbjsg7dww.code.run/user/favories/${fav._id}`,

        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      setUpdate(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return !isLoading && data.favories.length > 0 ? (
    <section className="sectionFav">
      <div className="container">
        <div className="title">
          <h1>Mes favories</h1>
        </div>

        <div className="contenentCharactersNComics">
          {data.favories.map((fav) => {
            return (
              <div className="firstChild" key={fav._id}>
                <div className="mainFavDiv">
                  <div>
                    <TfiTrash
                      className="trash"
                      onClick={() => {
                        handleClick(fav);
                      }}
                    />
                    <h3>{fav.name || fav.title}</h3>
                  </div>
                  <Link
                    to={
                      fav.name ? `/character/${fav._id}` : `/comic/${fav._id}`
                    }
                  >
                    {" "}
                    <img
                      src={`${fav.thumbnail.path}.${fav.thumbnail.extension}`}
                      alt={fav.name || fav.title}
                    />
                  </Link>{" "}
                  <p>{fav.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  ) : !isLoading && data.favories.length === 0 ? (
    <section>
      <div className="container empty">
        <h2>Sorry you don't have any Favories</h2>
      </div>
    </section>
  ) : (
    isLoading && <div className="loader"></div>
  );
};
export default Favorites;

// // Before with cookies :

// // const Favorites = () => { */}
// {/* //   const [MyFavories, setMyFavories] = useState("");
// //   const [data, setData] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);

// //   useEffect(() => { */}
// {/* //     setData([]);
// //     setMyFavories("");

// //     setMyFavories(Cookies.get("favories"));

// //     const tabFav = MyFavories.split("*");
// //     const favoriesTab = [...tabFav];

// //     favoriesTab.shift();
// //     const comics = [];
// //     const characters = [];
// //     for (let i = 0; i < favoriesTab.length; i++) { */}
// {/* //       if (favoriesTab[0] !== "") { */}
// {/* //         if (favoriesTab[i].slice(0, 6) === "comic-") {
// //           comics.push(favoriesTab[i].slice(6));
// //         } else {
// //           characters.push(favoriesTab[i].slice(10));
// //         }
// //       }
// //     } */}

// //     const fetchData = async () => {
// //       try {
// //         const tabFinal = [];
// //         for (let j = 0; j < comics.length; j++) {
// //           const response1 = await axios.get(
// //             `https://site--marvel-backend--dm4qbjsg7dww.code.run/comic/${comics[j]}`
// //           );

// //           tabFinal.push(response1.data);
// //         }
// //         for (let k = 0; k < characters.length; k++) {
// //           const response2 = await axios.get(
// //             `https://site--marvel-backend--dm4qbjsg7dww.code.run/character/${characters[k]}`
// //           );
// //           tabFinal.push(response2.data);
// //         }

// //         setData(tabFinal);
// //         setIsLoading(false);
// //       } catch (error) {
// //         console.log(error.message);
// //         setData(error.message);
// //       }
// //     };
// //     fetchData();
// //   }, [MyFavories]);

// //   return !isLoading && MyFavories !== "undefined" ? (
// //     <section>
// //       <div className="container">
// //         <div className="contenentCharactersNComics">Favories</div>
// //         {data.map((fav) => {
// //           if (fav.comics) {
// //             return (
// //               <Link key={fav._id} to={`/character/${fav._id}`}>
// //                 <h1>{fav.name}</h1>
// //                 <p>{fav.description}</p>
// //                 <TfiTrash
// //                   onClick={() => {
// //                     let favorites = Cookies.get("favories");

// //                     const newValueCookies = favorites.replace(
// //                       "*character-" + fav._id,
// //                       ""
// //                     );

// //                     Cookies.set("favories", newValueCookies, { expires: 30 });

// //                     setMyFavories(newValueCookies);
// //                   }}
// //                 />

// //                 <img
// //                   src={`${fav.thumbnail.path}/portrait_xlarge.${fav.thumbnail.extension}`}
// //                   alt={fav.name}
// //                 />
// //               </Link>
// //             );
// //           } else {
// //             return (
// //               <Link key={fav._id} to={`/comic/${fav._id}`}>
// //                 <h1>{fav.title}</h1>
// //                 <p>{fav.description}</p>

// //                 <TfiTrash
// //                   onClick={() => {
// //                     let favorites = Cookies.get("favories");

// //                     const newValueCookies = favorites.replace(
// //                       "*comic-" + fav._id,
// //                       ""
// //                     );

// //                     Cookies.set("favories", newValueCookies, { expires: 30 });

// //                     setMyFavories(newValueCookies);
// //                   }}
// //                 />

// //                 <img
// //                   src={`${fav.thumbnail.path}/portrait_xlarge.${fav.thumbnail.extension}`}
// //                   alt={fav.title}
// //                 />
// //               </Link>
// //             );
// //           }
// //         })}
// //       </div>
// //     </section>
// //   ) : !isLoading && MyFavories === "undefined" ? (
// //     <div>
// //       <h1>sorry you don't have any fav for now</h1>
// //     </div>
// //   ) : (
// //     isLoading && <p> "Loading..."</p>
// //   );
// // };
