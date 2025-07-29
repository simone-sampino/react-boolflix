import { useState, useEffect } from "react";

function App() {
  const [moviesData, setMoviesData] = useState([]);
  const [search, setSearch] = useState("");
  const API_KEY = import.meta.env.VITE_API_KEY;

  function handleClick() {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setMoviesData(data.results);
      });
  }

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <div className="container">
            <a className="navbar-brand" href="#">
              <img src="../public/boolflix-logo.png" alt="boolflix-logo" />
            </a>
            <form className="d-flex my-2 my-lg-0">
              <input
                className="form-control shadow me-sm-2"
                type="text"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn btn-danger shadow my-2 my-sm-0"
                type="submit"
                onClick={handleClick}
              >
                Search
              </button>
            </form>
          </div>
        </nav>
      </header>

      <main></main>
    </>
  );
}

export default App;
