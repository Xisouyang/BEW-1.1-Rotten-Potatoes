const express = require('express')
const app = express()
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));

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
const Review = mongoose.model('Review', {
    title: {type: String, required: true},
    movieTitle: {type: String, required: true},
    description: {type: String, required: true}
});

//index
app.get('/', (req, res) => {
    //look for reviews in the database
    Review.find()
       //if we find reviews we show them to the screen
       //'reviews' is a 'promise' - object whose value is provided in the future
      .then(reviews => {
          res.render('reviews-index', { reviews: reviews })
      })
      .catch(err => {
          console.log(err);
      });
});

app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {})
});

app.post('/reviews', (req, res) => {
    Review.create(req.body).then(( review ) => {
        console.log(review);
        res.redirect('/');
    }).catch((err) => {
        console.log(err.message);
    });
    console.log(req.body);
    //res.render('reviews-new', {})
});

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
