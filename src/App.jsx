import { useState, useEffect } from "react";
import "flag-icons/css/flag-icons.min.css";

function App() {
  const [moviesData, setMoviesData] = useState([]);
  const [tvShowData, setTvShowData] = useState([]);
  const [search, setSearch] = useState("");
  const API_KEY = import.meta.env.VITE_API_KEY;
  const movieUrl = "https://api.themoviedb.org/3/search/movie";
  const tvShowUrl = "https://api.themoviedb.org/3/search/tv";
  const images = "https://image.tmdb.org/t/p/w342/";

  function handleClick(e) {
    e.preventDefault();

    fetch(`${movieUrl}?api_key=${API_KEY}&query=${search}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setMoviesData(data.results);
      });

    fetch(`${tvShowUrl}?api_key=${API_KEY}&query=${search}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setTvShowData(data.results);
      });
  }

  function renderFlag(flag) {
    if (flag == "en") {
      return "gb";
    }
    if (flag == "ja") {
      return "jp";
    }
    if (flag == "uk") {
      return "ua";
    }
    if (flag == "zh") {
      return "ch";
    }
    if (flag == "ko") {
      return "kr";
    }
    return flag;
  }

  function renderStars(vote_average) {
    const stars = [];
    const fullStars = Math.ceil(vote_average / 2);
    const maxStars = 5;

    for (let i = 0; i < maxStars; i++) {
      if (i < fullStars) {
        stars.push(<i className="bi bi-star-fill text-warning"></i>);
      } else {
        stars.push(<i className="bi bi-star text-warning"></i>);
      }
    }
    return stars;
  }

  return (
    <>
      <header className="pb-5">
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow">
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

      <main>
        <div className="container">
          <section id="movies">
            <h2 className="pt-5 my-5 fw-bold">MOVIES</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 g-3">
              {moviesData.map((movie) => {
                return (
                  <div key={movie.id} className="col">
                    <div className="card d-flex h-100 shadow">
                      <img
                        className="card-img-top max-width"
                        src={`${images}${movie.poster_path}`}
                        alt={movie.title}
                      />
                      {/* info on hover */}
                      <div className="card-body info h-100 bg-dark text-light">
                        <div className="card-text mb-1">
                          <span className="fw-bold">Title: </span>
                          {movie.title}
                        </div>
                        <div className="card-text mb-1">
                          <span className="fw-bold">Original title: </span>
                          {movie.original_title}
                        </div>
                        <span className="fw-bold">Original language: </span>
                        <div
                          className={`card-text mb-1 fi fi-${renderFlag(
                            movie.original_language
                          )}`}
                        ></div>
                        <div className="card-text mb-1">
                          <span className="fw-bold">Vote: </span>
                          {renderStars(movie.vote_average)}
                        </div>
                        <div className="card-text">
                          <span className="fw-bold">Overview: </span>
                          {movie.overview}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="tv-shows" className="mb-5">
            <h2 className="my-5 fw-bold">TV SHOWS</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 g-3">
              {tvShowData.map((tvShow) => {
                return (
                  <div key={tvShow.id} className="col">
                    <div className="card d-flex h-100 shadow">
                      <img
                        className="card-img-top max-width"
                        src={`${images}${tvShow.poster_path}`}
                        alt={tvShow.name}
                      />
                      {/* info on hover */}
                      <div className="card-body info h-100 bg-dark text-light">
                        <div className="card-text mb-1">
                          <span className="fw-bold">Title: </span>
                          {tvShow.name}
                        </div>
                        <div className="card-text mb-1">
                          <span className="fw-bold">Original title: </span>
                          {tvShow.original_name}
                        </div>
                        <span className="fw-bold">Original language: </span>
                        <div
                          className={`card-text mb-1 fi fi-${renderFlag(
                            tvShow.original_language
                          )}`}
                        ></div>
                        <div className="card-text mb-1">
                          <span className="fw-bold">Vote: </span>
                          {renderStars(tvShow.vote_average)}
                        </div>
                        <div className="card-text">
                          <span className="fw-bold">Overview: </span>
                          {tvShow.overview}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
