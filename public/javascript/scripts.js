//scripts.js

// alert("hello");

//ADD COMMENT TO PAGE
function addComment() {
    //serialize the form data into an object
    let comment = {};
    const inputs = document.getElementsByClassName('form-control')
    for(var i = 0; i <inputs.length; i++) {
        comment[inputs[i].name] = inputs[i].value;
    }
    //Need this so we know which comment to delete
    let index = document.getElementsByClassName('card').length
    // console.log(index);

    //automatically refreshes page to show comments
    axios.post('/reviews/comments', comment).then(res => {
        document.getElementById('comments').innerHTML =
        `
        <div class="card" id="comment-${index}" comment-id="${res.data.comment._id}">
            <div class="card-block">
                <h4 class="card-title">
                    ${res.data.comment.title}
                </h4>
                <p class="card-text">
                    ${res.data.comment.content}
                </p>

                <!-- Delete Link -->
                <p><form method="POST" action="" onsubmit="event.preventDefault();deleteComment(${index});">
                    <button class="btn btn-link" type="submit">Delete</button>
                </form></p>
            </div>
        </div>` + document.getElementById('comments').innerHTML
    })
}

//DELETE COMMENT FROM PAGE
function deleteComment(index){
    let comment = document.getElementById(`comment-${index}`)
    let commentId = comment.getAttribute('comment-id')

    axios.delete(`/reviews/comments/${commentId}`).then(res => {
        comment.remove()
    }).catch(err => {
        console.log(err)
    })

}
// window.onload = function() {
//     console.log(document);
//     document.getElementById("new-comment").addEventListener("submit", e => {
//         //prevent the default form behavior
//         e.preventDefault();
//
//         //serialize the form data into an object
//         let comment = {};
//         const inputs = document.getElementsByClassName('form-control')
//         for(var i = 0; i <inputs.length; i++) {
//             comment[inputs[i].name] = inputs[i].value;
//         }
//
//         //use axios to initialize a post request and send in the form data
//         axios.post('/reviews/comments', comment)
//         .then(function(response) {
//             //wait for success response from the server
//             console.log(response)
//             //remove the info from the form
//             //display the data as a new comment on the page
//
//         })
//         .catch(function(error) {
//             console.log(error);
//             //handle any errors
//             alert("Problem with saving comment, please try again.")
//         });
//
//        axios.post('/user', comment)
//       .then(function (response) {
//         // wait for the success response from the server
//         console.log(response);
//         // remove the information from the form
//         this.reset();
//         // display the data as a new comment on the page
//         document.getElementById('comments').prepend(
//           `
//            <div class="card">
//              <div class="card-block">
//                <h4 class="card-title">${response.title}</h4>
//                <p class="card-text">${response.content}</p>
//                <p>
//                   <form method="POST" action="/reviews/comments/${response._id}?_method=DELETE">
//                     <button class="btn btn-link" type="submit">Delete</button>
//                   </form>
//                </p>
//              </div>
//            </div>
//           `
//         );
//       })
//     });
// }
