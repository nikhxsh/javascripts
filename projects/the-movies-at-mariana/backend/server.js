const express = require('express');
const fs = require('fs');
const app = express();
const path = (process.env.CUSTOM_STATICS_PATH || 'movies');

const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};

app.use(allowCrossDomain);

app.get('/movies', function (req, res, next) {

  let response = readJsonFile(`${__dirname}/movies/index.json`);

  const filterQuery = req.query.filter;
  const searchQuery = req.query.search;

  if (filterQuery) {
    const filters = filterQuery.split(',').map(filter => {
      const [key, value] = filter.split(':');
      return { key, value };
    })

    filters.forEach(filter => {
      response = response.map(data => {
        const movies = data.movies.filter(movie => {
          if (Array.isArray(movie[filter.key])) {
            return movie[filter.key].some(x => x.toLowerCase() === filter.value.toLowerCase())
          }
          else {
            return movie[filter.key] === filter.value.toLowerCase()
          }
        });
        return {
          date: data.date,
          movies: movies
        }
      });
    });
  }

  if (searchQuery) {
    response = response.map(data => {
      const movies = data.movies.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()));
      return {
        date: data.date,
        movies: movies
      }
    });
  }

  res.status(200);
  res.json(response.filter(x => x.movies.length > 0));
});

app.get('/genre', function (req, res, next) {
  res.status(200);
  const jsonData = readJsonFile(`${__dirname}/movies/index.json`);
  const genrs = getUniqueGenrs(jsonData);
  res.json(genrs);
});

// Function to read JSON file
function readJsonFile(filename) {
  const rawData = fs.readFileSync(filename);
  return JSON.parse(rawData);
}

// Function to extract unique genre from JSON data
function getUniqueGenrs(data) {
  const uniqueNamesSet = new Set();
  data.forEach(item => {
    item.movies.forEach(movie => {
      movie.genre.forEach(g => uniqueNamesSet.add(g))
    })
  });
  return Array.from(uniqueNamesSet);
}

const port = (process.env.PORT || 3000);
app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});