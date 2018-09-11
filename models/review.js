const mongoose = require('mongoose')

const Review = mongoose.model('Review', {
    title: {type: String, required: true},
    movieTitle: {type: String, required: true},
    description: {type: String, required: true}
});

//All code above will be exported into the variable below and returned to whichever file called for it.
module.exports = Review
