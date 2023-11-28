import './App.css';

import {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  ApiFetchMovies,
  ApiFetchGenre,
  ApiLikeMovie
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
            posterUrl: movie.poster,
            release: movie.released,
            rating: movie.imdb_rating,
            genre: movie.genre,
            runtime: movie.runtime,
            like: movie.like
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

  const likeMovie = (date, film, release) => {
    ApiLikeMovie(date, film, release)
      .then((res) => {
        setMovieData(state => {
          const oldstate = [...state]
          return oldstate.map(event => {
            if (event.date === date) {
              const objectToUpdate = event.movies.find(y => y.film === film && y.release === release);
              if (objectToUpdate) {
                const updatedObject = { ...objectToUpdate, like: !objectToUpdate.like }
                return {
                  date: event.date,
                  movies: event.movies.map(m => {
                    if (m.film === film && m.release === release) {
                      return updatedObject;
                    } else {
                      return m;
                    }
                  })
                }
              }
              else {
                return event;
              }
            }
            else {
              return event;
            }
          })
        })
      })
      .catch((error) => {
      });
  }

  const getLocalDateTime = (dateString) => {
    const dateObject = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateObject.toLocaleDateString('en-US', options);
  }

  const getLocalYear = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.getFullYear();
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
              <div style={{ marginTop: "0.5em" }}>
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
            </div>
            <div class="col">
              <input type="text" class="form-control" placeholder="Search by title" onChange={(event) => handleOnChange({ key: "title", value: event.target.value })} />
            </div>
          </div>
          <br />
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Schedule</th>
                <th scope="col" colSpan={2}>Film</th>
                <th scope="col">Released</th>
                <th scope="col">Rating</th>
                <th scope="col">Runtime</th>
                <th scope="col">Genre</th>
                <th scope="col"></th>
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
                            <td><img src={movie.posterUrl} class="thumbnail-image" /></td>
                            <td align='left'>{movie.film}</td>
                            <td>{getLocalYear(movie.release)}</td>
                            <td>{movie.rating}/10</td>
                            <td>{movie.runtime}</td>
                            <td>{movie.genre.join(', ')}</td>
                            <td align='left'>
                              <a href='#' onClick={() => likeMovie(data.date, movie.film, movie.release)}>
                                {
                                  movie.like ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                      <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                                    </svg>
                                }
                              </a>
                            </td>
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
