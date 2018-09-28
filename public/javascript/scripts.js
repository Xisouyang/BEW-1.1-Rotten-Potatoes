//scripts.js

    // alert("hello");

// //request color api
// axios.get('http://www.thecolorapi.com/id?hex=24B1E0')
//   .then(function (response) {
//       console.log("BEER")
//       //handle success
//       alert(response.hex.value);
//   })
//   .catch(function(error) {
//       //handle error
//       console.log(error);
//   });

//listen for form submit event
document.getElementById("newComment").addEventListener("submit", e => {
    //prevent the default form behavior
    e.preventDefault();

    //serialize the form data into an object
    let comment = {};
    const inputs = document.getElementsByClassName('form-control')
    for(var i = 0; i <inputs.length; i++) {
        comment[inputs[i].name] = inputs[i].value;
    }

    //use axios to initialize a post request and send in the form data
    axios.post('/reviews/comments', comment)
    .then(function(response) {
        //wait for success response from the server
        console.log(response)
        //remove the info from the form
        //display the data as a new comment on the page
    })
    .catch(function(error) {
        console.log(error);
        //handle any errors
        alert("Problem with saving comment, please try again.")
    });
});
