//movies.js
const app = require('express')()
const MovieDB = require('moviedb-promise')
const moviedbKey = new MovieDB('b0c175c7611d1447174a792b5c62efdd')

app.get('/', (req, res) => {
    moviedbKey.miscNowPlayingMovies().then(response => {
        res.render('movies-index', { movies: response.results });
    }).catch(console.error);
})

module.exports = app;
