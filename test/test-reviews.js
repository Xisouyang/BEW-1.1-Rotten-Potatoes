// test-reviews.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Review = require('../models/review');

const sampleReview = {
    title: "Super Sweet Review",
    movieTitle: "La La Land",
    description: "A great review of a lovely movie."
}

chai.use(chaiHttp);

//tells mocha you wanna test 'Reviews'
describe('Reviews', () => {

    after(() => {
        Review.deleteMany({title: 'Super Sweet Review'}).exec((err, reviews) => {
            console.log(reviews);
            reviews.remove();
        })
    })

    //INDEX
    it('should index all reviews on /GET', (done) => {

        //use chai-http to request to server
        chai.request(server)

        //send GET request to root route
        .get('/')

        //waits for a response
        .end((err, res) => {

            //200 = success
            res.should.have.status(200);

            //check response is type html
            res.should.be.html;

            //end test
            done();
        });
    });

    //TEST NEW
    it('should display new form on /reviews/new GET', (done) => {
        chai.request(server)
            .get(`/reviews/new`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
    });

    //TEST SHOW
    it('should show a SINGLE review on /reviews/<id> GET', (done) => {
        var review = new Review(sampleReview)
        review.save((err, data) => {
            chai.request(server)
                .get(`/reviews/${ review._id }`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.should.have.html
                    done()
                });
        });
    });


    //TEST EDIT
    it('should edit a single review on /reviews/<id>/edit GET', (done) => {
        var review = new Review(sampleReview);
        // console.log(review)
        review.save((err, data) => {

            chai.request(server)
            .get(`/reviews/${ review._id }/edit`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.have.html;
                done();
            })
        })
    })

    //TEST CREATE
    it('Should create a single review on /reviews POST', (done) => {
        var review = new Review(sampleReview);
        chai.request(server)
            //making new post
            .post('/reviews')
            //sending up
            .send(review)
            .end( (err, res) => {
                // console.log("err.message")

                res.should.have.status(200)
                res.should.have.html
                done();
            })
    })


    //TEST UPDATE
    it('Should update a single review on /reviews/<id> PUT', (done) => {
        var review = new Review(sampleReview);
        review.save((err, data) => {
            chai.request(server)
            //updating the info
            .put(`/reviews/${data._id}?_method=PUT`)
            //sending it up
            .send({'title': 'updating the title'})
            .end((err, res) => {
                res.should.have.status(200)
                res.should.have.html
                done();
            });
        });
    });

    //TEST DELETE
    it('Should delete a single review on /reviews/<id> DELETE', (done) => {
        var review = new Review(sampleReview)
        review.save((err, data) => {
            chai.request(server)
            .delete(`/reviews/${data._id}?_method=DELETE`)
            .end((err, res) => {
                res.should.have.status(200)
                res.should.have.html
                done();
            });
        });
    });

});
