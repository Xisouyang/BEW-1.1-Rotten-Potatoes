const express = require('express')
const app = express()
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const reviews = require('./controllers/reviews');
const comments = require('./controllers/comments');
const comment = require('./models/comment.js');
const Review = require('./models/review.js')

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))


//this must be placed under bodyParser, otherwise the program doesn't know how to read the routes.
app.use(reviews)
app.use(comments)




// app.get('/', (req, res) => {
//   res.render('home', { msg: 'Suh Dude'});
// })

//mock array of objects
// let reviews = [
//     { title: "review #1" },
//     { title: "A bitter disappointment -Mom" },
//     { title: "Best guy ever -Me" }
// ]

//model of actual array of objects
// const Review = mongoose.model('Review', {
//     title: {type: String, required: true},
//     movieTitle: {type: String, required: true},
//     description: {type: String, required: true}
// });

//INDEX - HOME
// app.get('/', (req, res) => {
//     //look for reviews in the database
//     Review.find()
//        //if we find reviews we show them to the screen
//        //'reviews' is a 'promise' - object whose value is provided in the future
//       .then(reviews => {
//           res.render('reviews-index', { reviews: reviews })
//       })
//       .catch(err => {
//           console.log(err);
//       });
// });

// app.get('/reviews/new', (req, res) => {
//     res.render('reviews-new', {})
// });

// app.get('/reviews/:id', (req, res) => {
//     Review.findById(req.params.id).then((review) => {
//         res.render('reviews-show', {review: review})
//     }).catch((err) => {
//         console.log(err.message);
//     })
//     // res.send('I\'m a review');
// });

// app.post('/reviews', (req, res) => {
//     Review.create(req.body).then(( review ) => {
//         console.log(review);
//         res.redirect(`/reviews/${review._id}`);
//     }).catch((err) => {
//         console.log(err.message);
//     });
//     // console.log(req.body);
//     //res.render('reviews-new', {})
// });

//EDIT
// app.get('/reviews/:id/edit', (req, res) => {
//     Review.findById(req.params.id)
//     .then(( review )=> {
//         res.render('reviews-edit', {review: review});
//     })
// })

// UPDATE
// app.put('/reviews/:id', (req, res) => {
//   Review.findByIdAndUpdate(req.params.id, req.body)
//     .then(review => {
//       res.redirect(`/reviews/${review._id}`)
//     })
//     .catch(err => {
//       console.log(err.message)
//     })
// })

// DELETE
// app.delete('/reviews/:id', (req, res) => {
//     Review.findByIdAndRemove(req.params.id, req.body)
//     .then(( review ) => {
//         res.redirect('/');
//     }).catch(err => {
//         console.log(err.message);
//     });
// });

app.listen(process.env.PORT || 3000, () => {
  console.log('App listening on port 3000!')
})

module.exports = app
