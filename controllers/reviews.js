//reviews.js
const app = require('express')()
const Review = require('../models/review');
const Comment = require('../models/comment')

    //HOME
    // app.get('/', (req, res) => {
    //     Review.find()
    //     .then(reviews => {
    //         res.render('reviews-index', { reviews: reviews });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
    // });

    //NEW FORM
    app.get('/reviews/new', (req, res) => {
        res.render('reviews-new', {})
    });

    app.post('/reviews', (req, res) => {
        Review.create(req.body).then(( review ) => {
            console.log(review);
            res.redirect(`/reviews/${review._id}`);
        }).catch((err) => {
            console.log(err.message);
        });
        // console.log(req.body);
        //res.render('reviews-new', {})
    });

    //EDIT
    app.get('/reviews/:id/edit', (req, res) => {
        Review.findById(req.params.id)
        .then(( review )=> {
            res.render('reviews-edit', {review: review});
        })
    })

    // UPDATE
    app.put('/reviews/:id', (req, res) => {
      Review.findByIdAndUpdate(req.params.id, req.body)
        .then(review => {
          res.redirect(`/reviews/${review._id}`)
        })
        .catch(err => {
          console.log(err.message)
        })
    })

    // DELETE
    app.delete('/reviews/:id', (req, res) => {
        Review.findByIdAndRemove(req.params.id, req.body)
        .then(( review ) => {
            res.redirect('/');
        }).catch(err => {
            console.log(err.message);
        });
    });

    //SHOW
    app.get('/reviews/:id', (req, res) => {
        //find review
        Review.findById(req.params.id).then(review => {
            //fetch its comments
            Comment.find({ reviewId: req.params.id }).then(comments => {
                //respond with the template for both values
                res.render('reviews-show', { review: review, comments: comments })
            })
        }).catch((err) => {
            console.log(err.message);
        })
    })



module.exports = app
