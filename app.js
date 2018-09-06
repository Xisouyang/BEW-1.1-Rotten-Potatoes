const express = require('express')
const app = express()
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

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
    title: String
});

//index
app.get('/', (req, res) => {
    Review.find()
      .then(reviews => {
          res.render('reviews-index', { reviews: reviews })
      })
      .catch(err => {
          console.log(err);
      });
});

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
