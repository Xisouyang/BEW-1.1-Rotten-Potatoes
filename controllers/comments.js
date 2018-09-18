//comments.js

const app = require('express')()
const Review = require('../models/review.js')
const Comment = require('../models/comment.js')


//NEW COMMENT
app.post('/reviews/:id/comments/new', (req, res) => {
    // res.send("Comments inputted");
    Comment.create(req.body).then(comment => {
        console.log(comment)
        console.log();
        console.log("req=");
        console.log(req.body);
        res.redirect(`/reviews/${req.params.id}`);
    }).catch(err => {
        console.log(err.message);
    })
});

module.exports = app;
