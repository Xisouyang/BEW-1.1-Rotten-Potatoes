//movies.js
const app = require('express')()
const MovieDB = require('moviedb-promise')
const moviedb = new MovieDB('b0c175c7611d1447174a792b5c62efdd')

app.get('/', (req, res) => {
    moviedb.miscNowPlayingMovies().then(response => {
        res.render('movies-index', { movies: response.results });
    }).catch(console.error);
})

app.get('/movies/:id', (req, res) => {
    moviedb.movieInfo({id: req.params.id }).then(movie => {

        const renderTemplate = (movie) => {
            res.render('movies-show', { movie: movie });
        }

        if(movie.video) {
            moviedb.movieVideos(req.params.id).then(videos => {
                movie.trailer_youtube_id = videos.results[0].key
                renderTemplate(movie)
            })
        } else {
            renderTemplate(movie);
        }

    }).catch(console.error)
})


module.exports = app;
