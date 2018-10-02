//movies.js

//ROUTES FOR MOVIES

const app = require('express')()
const Review = require('../models/review');
const MovieDB = require('moviedb-promise')
const moviedb = new MovieDB('b0c175c7611d1447174a792b5c62efdd')


//INDEX/HOME
app.get('/', (req, res) => {
    moviedb.miscNowPlayingMovies().then(response => {
        res.render('movies-index', { movies: response.results });
    }).catch(console.error);
})

//SHOW
app.get('/movies/:id', (req, res) => {
    moviedb.movieInfo({id: req.params.id }).then(movie => {
        Review.find({movieId: req.params.id}).then(reviews => {
            console.log(reviews)
            // if(movie.video) {
            //     moviedb.movieVideos(req.params.id).then(videos => {
            //         movie.trailer_youtube_id = videos.results[0].key
            //         res.render('movies-show', { movie: movie, reviews: reviews });
            // })
            // } else {
            //     res.render('movies-show', { movie: movie, reviews: reviews });
            // }
            res.render('movies-show', { movie: movie, reviews: reviews });
        })
    }).catch(console.error)
})


module.exports = app;
