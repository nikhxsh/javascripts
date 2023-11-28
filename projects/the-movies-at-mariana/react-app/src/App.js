import './App.css';

import {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  ApiFetchMovies,
  ApiFetchGenre
} from "./services/movie-service"

function App() {

  const [movieData, setMovieData] = useState([]);
  const [genre, setGenre] = useState([]);
  const [filters, setFilters] = useState([]);
  const [search, setSearch] = useState({});
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    fetchMovies();
    if (filters.length === 0) {
      setSelectedGenre("");
    }
    else {
      setSelectedGenre(filters[filters.length - 1]?.value ?? "");
    }
  }, [filters, search]);

  useMemo(() => {
    ApiFetchGenre()
      .then((res) => {
        setGenre(res.sort());
      })
      .catch((error) => {
      });
  }, [])

  const fetchMovies = () => {
    ApiFetchMovies(filters, search)
      .then((res) => {
        const records = res.map(data => ({
          date: data.date,
          movies: data.movies.map(movie => ({
            film: movie.title,
            release: movie.released,
            rating: movie.imdb_rating,
            genre: movie.genre
          }))
        }));
        setMovieData(records);
      })
      .catch((error) => {
      });
  }

  const handleOnSelect = (option) => {
    setFilters(state => {
      if (!state.some(x => x.value === option.value)) {
        setSelectedGenre(option.value);
        return [
          ...state,
          option
        ]
      }
      return state;
    });
  }

  const handleOnChange = (value) => {
    setSearch(value);
  }

  const removeFilter = (value) => {
    setFilters(state => {
      let oldstate = [...state];
      return oldstate.filter(x => x.value !== value);
    });
  }

  const getLocalDateTime = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toDateString();
  }

  const getLocalYear = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.getFullYear();
  }

  const getLocalDay = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.getDate();
  }

  return (
    <div className="App">
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">The Movies@Mariana</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
      <main class="container">
        <div class="bg-light p-5 rounded">
          <div class="row">
            <div class="col">
              <select
                class="form-select"
                id="specificSizeSelect"
                onChange={(event) => handleOnSelect({ key: "genre", value: event.target.value })}
                value={selectedGenre}>
                <option value="">Select Genre</option>
                {
                  genre.map((x) => {
                    return <option value={x}>{x}</option>
                  })
                }
              </select>
              {
                filters.map(x => {
                  return <><span class="badge bg-info text-dark">{x.value}&nbsp;
                    <a href='#' onClick={() => removeFilter(x.value)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                      </svg>
                    </a>
                  </span>
                    &nbsp;
                  </>
                })
              }
            </div>
            <div class="col">
              <input type="text" class="form-control" placeholder="Search by title" onChange={(event) => handleOnChange({ key: "title", value: event.target.value })} />
            </div>
          </div>
          <br />
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Event</th>
                <th scope="col">Film</th>
                <th scope="col">Released</th>
                <th scope="col">Rating</th>
                <th scope="col">Genre</th>
              </tr>
            </thead>
            <tbody>
              {
                movieData.length > 0 ?
                  movieData.map((data) => {
                    return <>
                      {
                        data.movies.map((movie, index) => {
                          return <tr>
                            {
                              index == 0 ? <th scope="row" rowSpan={data.movies.length}>{getLocalDateTime(data.date)}</th> : <></>
                            }
                            <td>{movie.film}</td>
                            <td>{getLocalYear(movie.release)}</td>
                            <td>{movie.rating}</td>
                            <td>{movie.genre.join(', ')}</td>
                          </tr>
                        })
                      }
                    </>
                  }) : <tr><td colSpan="5">"No Records found!"</td></tr>
              }
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default App;
