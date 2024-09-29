import "./App.css";
import SearchIcon from "./search.svg";
import axios from "axios";
import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

const API_URL = "https://www.omdbapi.com?apikey=3e219e97";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchError, setSearchError] = useState(false);

  const searchMovies = async (title) => {
    try {
      const response = await axios.get(`${API_URL}&s=${title}`); // Use Axios for GET request
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
        setSearchError(false);
      } else {
        setMovies([]);
        setSearchError(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // const searchMovies = async (title) => {
  //   const response = await fetch(`${API_URL}&s=${title}`);
  //   const data = await response.json();
  //   if (data.Response === "True") {
  //     setMovies(data.Search);
  //     setSearchError(false); // Reset search error state if movies are found
  //   } else {
  //     setMovies([]);
  //     setSearchError(true); // Set search error state if no movies are found
  //   }
  // };
  useEffect(() => {
    searchMovies("man");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search for movies:"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              searchMovies(searchTerm);
              e.target.blur();
            }
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {searchError ? (
        <div className="empty">
          <h2>NO MOVIES FOUND</h2>{" "}
        </div>
      ) : (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
