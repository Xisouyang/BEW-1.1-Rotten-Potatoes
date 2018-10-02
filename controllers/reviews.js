//reviews.js

//ROUTES FOR REVIEWS

const app = require('express')()
const Review = require('../models/review');
const Comment = require('../models/comment')


    //NEW FORM
    app.get('/movies/:id/reviews/new', (req, res) => {
        res.render('reviews-new', { movieId: req.params.id })
    });

    //CREATE
    app.post('/movies/:movieId/reviews', (req, res) => {
        console.log(req.body)
        Review.create(req.body).then(( review ) => {
            res.redirect(`/movies/${req.params.movieId}/reviews/${review._id}`)
        })
    })

    //EDIT
    app.get('/movies/:movieId/reviews/:id/edit', (req, res) => {
        Review.findById(req.params.id)
        .then(( review )=> {
            res.render('reviews-edit', {review: review, movieId: req.params.movieId});
        })
    })

    // UPDATE
    app.put('/movies/:movieId/reviews/:id', (req, res) => {
      Review.findByIdAndUpdate(req.params.id, req.body)
        .then(review => {
            //console.log("yea")
          res.redirect(`/movies/${review.movieId}/reviews/${review._id}`)
          //console.log(res.body)
        })
        .catch(err => {
          console.log(err.message)
        })
    })

    // DELETE
    app.delete('/movies/:movieId/reviews/:id', (req, res) => {
        Review.findByIdAndRemove(req.params.id, req.body)
        .then(( review ) => {
            res.redirect('/');
        }).catch(err => {
            console.log(err.message);
        });
    });

    //SHOW
    app.get('/movies/:movieId/reviews/:id', (req, res) => {
        //find review
        Review.findById(req.params.id).then(review => {
            //fetch its comments
            Comment.find({ reviewId: req.params.id }).then(comments => {
                console.log(comments);
                //respond with the template for both values
                res.render('reviews-show', { review: review, comments: comments.reverse() })
            })
        }).catch((err) => {
            console.log(err.message);
        })
    })


module.exports = app
