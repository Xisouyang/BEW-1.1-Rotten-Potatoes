//comments.js

const app = require('express')()
const Review = require('../models/review.js')
const Comment = require('../models/comment.js')


//NEW COMMENT
app.post('/reviews/:id/comments/new', (req, res) => {
    // res.send("Comments inputted");
    Comment.create(req.body).then(comment => {
        console.log(req.body);
        res.redirect(`/reviews/${req.params.id}`);
    }).catch(err => {
        console.log(err.message);
    })
});

//DELETE COMMENT
app.delete('/reviews/comments/:id', (req, res) => {
    Comment.findByIdAndRemove(req.params.id).then((comment) => {
        res.redirect(`/reviews/${comment.reviewId}`);
    }).catch(err => {
        console.log(err.message);
    })
})

module.exports = app;
