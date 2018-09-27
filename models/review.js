const mongoose = require('mongoose')

const Review = mongoose.model('Review', {
    title: {type: String, required: false},
    movieTitle: {type: String, required: false},
    description: {type: String, required: false},
    movieId: {type: String, required: true}
});

//All code above will be exported into the variable below and returned to whichever file called for it.
module.exports = Review
