import React, { useState, useEffect } from 'react';

const APILINK = "http://www.omdbapi.com/?i=tt3896198&apikey=77dcdb87";
const SEARCHAPI = "http://www.omdbapi.com/?apikey=77dcdb87&s=";

const FindMovie = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    displayTrendingMovies();
  }, []);

  function displayTrendingMovies() {
    fetch(APILINK + "&s=Multiverse")
      .then((res) => res.json())
      .then(function (data) {
        if (data.Response === "True" && Array.isArray(data.Search)) {
          setMovies(data.Search);
        } else {
          console.log("Error fetching trending movies");
        }
      })
      .catch(function (error) {
        console.error("Error fetching trending movies:", error);
      });
  }

  function returnMovies(url) {
    fetch(url)
      .then((res) => res.json())
      .then(function (data) {
        if (data.Response === "True" && Array.isArray(data.Search)) {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
      })
      .catch(function (error) {
        console.error("Error fetching movie details:", error);
        setMovies([]);
      });
  }

  function createCard(movie) {
    return (
      <div className="card" key={movie.imdbID}>
        <img src={movie.Poster} alt={movie.Title} />
        <div className="card-content">
          <h3>{movie.Title}</h3>
          <button>Watch Now</button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchItem = e.target.query.value.trim();
    if (searchItem) {
      returnMovies(SEARCHAPI + encodeURIComponent(searchItem));
    }
    e.target.query.value = "";
  };

  return (
    <div>
      <div className="topnav">
        <h1>MOVIE LIST</h1>
        <div className="search-container">
          <form role="search" onSubmit={handleSubmit}>
            <input type="text" id="query" placeholder="Search..." />
          </form>
        </div>
      </div>

      <section id="section" className="section">
        {movies.length > 0 ? (
          movies.map((movie) => createCard(movie))
        ) : (
          <p>No movies found or there was an error.</p>
        )}
      </section>
    </div>
  );
};

export default FindMovie;
