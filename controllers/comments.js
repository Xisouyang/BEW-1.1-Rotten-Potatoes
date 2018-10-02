//comments.js

//ROUTES FOR COMMENTS

const app = require('express')()
const Review = require('../models/review.js')
const Comment = require('../models/comment.js')


//ADD NEW COMMENT
app.post('/reviews/comments', (req, res) => {
    // res.send("Comments inputted");
    Comment.create(req.body).then(comment => {
        console.log(req.body);
        // res.redirect(`/movies/${req.body.movieId}/reviews/${req.params.id}`);
        res.status(200).send({ comment: comment })
    }).catch(err => {
        console.log(err.message);
        res.status(400).send({ err: err })
    })
});


//DELETE COMMENT
app.delete('/reviews/comments/:id', (req, res) => {
    Comment.findByIdAndRemove(req.params.id).then((comment) => {
        res.status(200).send({ comment: comment })
    }).catch(err => {
        console.log(err.message)
        res.status(400).send({ err: err })
    })
})

module.exports = app;
