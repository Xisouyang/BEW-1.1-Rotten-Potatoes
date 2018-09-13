//reviews.js
const app = require('express')()
const Review = require('../models/review');

    //HOME
    app.get('/', (req, res) => {
        Review.find()
        .then(reviews => {
            res.render('reviews-index', { reviews: reviews });
        })
        .catch(err => {
            console.log(err);
        });
    });

    //NEW FORM
    app.get('/reviews/new', (req, res) => {
        res.render('reviews-new', {})
    });

    //INDIVIDUAL REV HOME
    app.get('/reviews/:id', (req, res) => {
        Review.findById(req.params.id).then((review) => {
            res.render('reviews-show', {review: review})
        }).catch((err) => {
            console.log(err.message);
        })
        // res.send('I\'m a review');
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



module.exports = app
