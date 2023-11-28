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

  response = response.filter(x => x.movies.length > 0);

  response.forEach(e => {
    e.movies.sort((a, b) => b.year.toString().localeCompare(a.year.toString()))
  })

  res.status(200);
  res.json(response);
});

app.get('/genre', function (req, res, next) {
  res.status(200);
  const jsonData = readJsonFile(`${__dirname}/movies/index.json`);
  const genrs = getUniqueGenrs(jsonData);
  res.json(genrs);
});

app.get('/movies/like', function (req, res, next) {

  const filePath = `${__dirname}/movies/index.json`;
  const existingData = readJsonFile(filePath);

  const date = req.query.date;
  const title = req.query.title;
  const released = req.query.released;

  let response = [];

  if (date && title && released) {
    response = existingData.map(event => {
      if (event.date === date) {
        const objectToUpdate = event.movies.find(y => y.title === title && y.released === released);
        if (objectToUpdate) {
          const updatedObject = { ...objectToUpdate, like: objectToUpdate.like ? !objectToUpdate.like : true }
          return {
            date: event.date,
            movies: event.movies.map(m => {
              if (m.title === title && m.released === released) {
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
  }

  const updatedJsonString = JSON.stringify(response, null, 2);
  try {
    writeJsonFile(filePath, updatedJsonString);
    res.status(200);
    res.json(true);
  }
  catch {
    res.status(400);
    res.json(false);
  }
});

// Function to read JSON file
function readJsonFile(filename) {
  const rawData = fs.readFileSync(filename);
  return JSON.parse(rawData);
}

// Function to read JSON file
function writeJsonFile(filename, updatedJsonString) {
  fs.writeFile(filename, updatedJsonString, 'utf8', (writeErr) => {
    if (writeErr) {
      console.error('Error writing to JSON file:', writeErr);
    } else {
      console.log('Data has been updated in the JSON file successfully.');
    }
  });
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