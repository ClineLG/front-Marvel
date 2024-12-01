import "./page.css";

const Page = ({ query, setQuery, data }) => {
  return (
    <section className="sectionPage">
      <div className="pages ">
        {query.page > 1 ? (
          <button
            onClick={() => {
              const newQuery = { ...query };
              newQuery.page = newQuery.page - 1;
              setQuery(newQuery);
            }}
          >
            <span className="chevron">＜</span>
          </button>
        ) : (
          <div></div>
        )}
        {query.page === 1 ? (
          <>
            <p className="bold">1</p>
            <p
              onClick={() => {
                const newQuery = { ...query };

                newQuery.page = 2;
                setQuery(newQuery);
              }}
            >
              2
            </p>
            <p
              onClick={() => {
                const newQuery = { ...query };

                newQuery.page = 3;
                setQuery(newQuery);
              }}
            >
              3
            </p>
            <p
              onClick={() => {
                const newQuery = { ...query };

                newQuery.page = Math.ceil(data.count / 100 / 2);
                setQuery(newQuery);
              }}
            >
              ...
            </p>
            <p
              onClick={() => {
                const newQuery = { ...query };

                newQuery.page = Math.ceil(data.count / 100);
                setQuery(newQuery);
              }}
            >
              {Math.ceil(data.count / 100)}
            </p>
          </>
        ) : query.page === Math.ceil(data.count / 100) ? (
          <>
            <p
              onClick={() => {
                const newQuery = { ...query };

                newQuery.page = 1;
                setQuery(newQuery);
              }}
            >
              1
            </p>
            <p
              onClick={() => {
                const newQuery = { ...query };

                newQuery.page = Math.ceil(data.count / 100 / 2);
                setQuery(newQuery);
              }}
            >
              ...
            </p>
            <p
              onClick={() => {
                const newQuery = { ...query };

                newQuery.page = Math.ceil(data.count / 100 - 2);
                setQuery(newQuery);
              }}
            >
              {Math.ceil(data.count / 100 - 2)}
            </p>
            <p
              onClick={() => {
                const newQuery = { ...query };

                newQuery.page = Math.ceil(data.count / 100 - 1);
                setQuery(newQuery);
              }}
            >
              {Math.ceil(data.count / 100 - 1)}
            </p>
            <p className="bold">{Math.ceil(data.count / 100)}</p>
          </>
        ) : query.page === 2 ? (
          <>
            <p
              onClick={() => {
                const newQuery = { ...query };

                newQuery.page = 1;
                setQuery(newQuery);
              }}
            >
              1
            </p>
            <p className="bold">2</p>
            <p
              onClick={() => {
                const newQuery = { ...query };

                newQuery.page = 3;
                setQuery(newQuery);
              }}
            >
              3
            </p>
            <p
              onClick={() => {
                const newQuery = { ...query };

                newQuery.page = Math.ceil(data.count / 100 / 2);
                setQuery(newQuery);
              }}
            >
              ...
            </p>
            <p
              onClick={() => {
                const newQuery = { ...query };

                newQuery.page = Math.ceil(data.count / 100);
                setQuery(newQuery);
              }}
            >
              {Math.ceil(data.count / 100)}
            </p>
          </>
        ) : query.page === 3 ? (
          <>
            <p
              onClick={() => {
                const newQuery = { ...query };

                newQuery.page = 1;
                setQuery(newQuery);
              }}
            >
              1
            </p>
            <p
              onClick={() => {
                const newQuery = { ...query };

                newQuery.page = 2;
                setQuery(newQuery);
              }}
            >
              2
            </p>
            <p className="bold">3</p>
            <p
              onClick={() => {
                const newQuery = { ...query };

                newQuery.page = 4;
                setQuery(newQuery);
              }}
            >
              4
            </p>
            <p
              onClick={() => {
                const newQuery = { ...query };

                newQuery.page = Math.ceil(data.count / 100 / 2);
                setQuery(newQuery);
              }}
            >
              ...
            </p>
            <p
              onClick={() => {
                const newQuery = { ...query };

                newQuery.page = Math.ceil(data.count / 100);
                setQuery(newQuery);
              }}
            >
              {Math.ceil(data.count / 100)}
            </p>
          </>
        ) : query.page === Math.ceil(data.count / 100 - 1) ? (
          <>
            <p
              onClick={() => {
                const newQuery = { ...query };

                newQuery.page = 1;
                setQuery(newQuery);
              }}
            >
              1
            </p>
            <p
              onClick={() => {
                const newQuery = { ...query };

                newQuery.page = Math.ceil(data.count / 100 / 2);
                setQuery(newQuery);
              }}
            >
              ...
            </p>
            <p
              onClick={() => {
                const newQuery = { ...query };

                newQuery.page = Math.ceil(data.count / 100 - 2);
                setQuery(newQuery);
              }}
            >
              {Math.ceil(data.count / 100 - 2)}
            </p>
            <p className="bold">{query.page}</p>
            <p
              onClick={() => {
                const newQuery = { ...query };

                newQuery.page = Math.ceil(data.count / 100);
                setQuery(newQuery);
              }}
            >
              {Math.ceil(data.count / 100)}
            </p>
          </>
        ) : query.page === Math.ceil(data.count / 100 - 2) ? (
          <>
            <p
              onClick={() => {
                const newQuery = { ...query };

                newQuery.page = 1;
                setQuery(newQuery);
              }}
            >
              1
            </p>
            <p
              onClick={() => {
                const newQuery = { ...query };

                newQuery.page = Math.ceil(data.count / 100 / 2);
                setQuery(newQuery);
              }}
            >
              ...
            </p>
            <p className="bold">{query.page}</p>
            <p
              onClick={() => {
                const newQuery = { ...query };

                newQuery.page = Math.ceil(data.count / 100 - 1);
                setQuery(newQuery);
              }}
            >
              {query.page + 1}
            </p>
            <p
              onClick={() => {
                const newQuery = { ...query };

                newQuery.page = Math.ceil(data.count / 100);
                setQuery(newQuery);
              }}
            >
              {Math.ceil(data.count / 100)}
            </p>
          </>
        ) : (
          <>
            <p
              onClick={() => {
                const newQuery = { ...query };

                newQuery.page = 1;
                setQuery(newQuery);
              }}
            >
              1
            </p>
            <p
              onClick={() => {
                const newQuery = { ...query };

                newQuery.page = Math.ceil(query.page / 2);
                setQuery(newQuery);
              }}
            >
              ...
            </p>
            <p
              onClick={() => {
                const newQuery = { ...query };

                newQuery.page = query.page - 1;
                setQuery(newQuery);
              }}
            >
              {query.page - 1}
            </p>
            <p className="bold">{query.page}</p>
            <p
              onClick={() => {
                const newQuery = { ...query };

                newQuery.page = query.page + 1;
                setQuery(newQuery);
              }}
            >
              {query.page + 1}
            </p>
            <p
              onClick={() => {
                const newQuery = { ...query };

                newQuery.page = Math.ceil(
                  (data.count / 100 - query.page) / 2 + query.page
                );
                setQuery(newQuery);
              }}
            >
              ...
            </p>
            <p
              onClick={() => {
                const newQuery = { ...query };

                newQuery.page = Math.ceil(data.count / 100);
                setQuery(newQuery);
              }}
            >
              {" "}
              {Math.ceil(data.count / 100)}
            </p>
          </>
        )}

        {/* {tabPages.map((e) => {
        return 
        {query.page} (
          <p
            onClick={() => {
              const newQuery = { ...query };
              if (newQuery.page !== e) {
                newQuery.page = e;
                setQuery(newQuery);
              }
            }}
            key={e}
            className={query.page === e ? "bold" : ""}
          >
            {e}
          </p>
        );
      })} */}
        {query.page < data.count / 100 ? (
          <button
            onClick={() => {
              const newQuery = { ...query };
              newQuery.page = newQuery.page + 1;
              setQuery(newQuery);
            }}
          >
            <span className="chevron">＞</span>
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </section>
  );
};

export default Page;
