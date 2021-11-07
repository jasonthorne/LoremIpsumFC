
//comment object:
class Comment{
    //constructor sets properties:
    constructor(handle, comment, post_date, likes) {
        this.handle = handle;
        this.comment = comment;
        this.post_date = post_date;
        this.likes = likes;
    }
}

var comments = []; //holds comments
var totalComments = 0; //holds total number of comments
var totalLikes = 0; //holds total number of likes

//load comments from db:
function loadComments() {
    comments.push( //add test comments to mimic db pull:
        new Comment("Bob", "Bob comment", Date.now(), 6),
        new Comment("Frank", "Frank comment", Date.now(), 6),
        new Comment("Billy", "Billy comment", Date.now(), 6),
        new Comment("Terry", "Terry comment", Date.now(), 6));

    console.log(comments); //+++++++++++
    totalComments = comments.length; //set totalComments
    showComments(); //show comments on page
}

//show comments on page:
function showComments() {

    totalLikes = 0; //reset totalLikes

    //loop through comments length:
    //////for (let i=0, j=comments.length; i<j; i++){
    for (let i=0, j=1; i<j; i++){

        let currComment = comments[i]; //get current comment

        //create html elements with class names:
        let card = makeElement("div", "card comment"); //card
        let cardBody = makeElement("div", "card-body"); //card body
        let cardTitle = makeElement("div", "card-title"); //card title
        let handle = makeElement("span", "comment-handle"); // handle
        let likesContainer = makeElement("span", "comment-likes-container"); //likes container
        let likesIcon = makeElement("i", "far fa-thumbs-up comment-likes-icon"); //likes icon
        let likes = makeElement("span", "text-muted comment-likes"); //likes
        let comment = makeElement("p", "card-text comment-text"); //comment
        let postDate = makeElement("p", "card-text text-muted comment-post-date"); //post date
        let likeBtn = makeElement("button", "btn btn-sm btn-outline-secondary comment-like-btn"); //like button
        let likeBtnIcon = makeElement("i", "far fa-thumbs-up"); //like button icon

        //build comment from html elements:
        likeBtn.appendChild(likeBtnIcon); //add icon to like button
        likeBtn.appendChild(document.createTextNode(" Like")); //add text to like button
        likeBtn.type = "button"; //give type to button
       

        //build post date:
        //++++++++++++++++++++++++++++++MORE NEEDED HERE (to figure out time from silly number :P)
        postDate.textContent = "Posted 3 mins ago";

        comment.textContent = currComment.comment; //add current comment to comment
        likesContainer.appendChild(likesIcon); //add likes icon to likes container
        likes.textContent = " " + currComment.likes; //add current likes to likes
        likesContainer.appendChild(likes); //add likes to container
        cardTitle.appendChild(likesContainer) //add likes container to card title
        handle.textContent = currComment.handle; //add current handle to handle
        cardTitle.appendChild(handle); //add handle to card title
        cardBody.appendChild(cardTitle); //add card title to card body
        cardBody.appendChild(comment); //add comment to card body
        cardBody.appendChild(postDate); //add post date to card body
        cardBody.appendChild(likeBtn); //add button to card body





        card.appendChild(cardBody); //add card body to card
        document.getElementById("comments").appendChild(card); //add card to comments

    }


    var card = document.createElement("div");
    card.className = "card comment";

    var cardBody = document.createElement("div");
    cardBody.className = "card-body";

    var cardP = document.createElement("p");
    cardP.className = "card-text";
    cardP.textContent = "hullo!";
    
    ///////cardBody.appendChild(document.createTextNode("Yo dawg!"));
    cardBody.appendChild(cardP);

    card.appendChild(cardBody);

    ////////////////////document.getElementById("comments").appendChild(card); 
   












    /*

    https://www.w3schools.com/w3css/w3css_animate.asp


    https://stackoverflow.com/questions/35538057/css-bootstrap-creating-elements-via-javascript/35538121


    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fieldshttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields
    */

    //https://getbootstrap.com/docs/5.0/utilities/sizing/

    /*var test = 
    "<table>\n" +
    "<tr>\n" +
        "<td>Emil</td>\n" +
        "<td>Tobias</td>\n" +
        "<td>Linus</td>\n" +
    "</tr>\n" +
    "</table>";*/

    //document.getElementById("comments").innerHTML = comments[0].post_date;

   /// document.getElementById("comments").innerHTML = test;

}

function addComment() {

    //+++++++++++++++++++++++++++CHeck that both forms have valid data. THEN:
    
    //add new comment to comments:
    comments.unshift(new Comment(
        document.getElementById("handle").value, //get handle from form
        document.getElementById("comment").value, //get comment from form
        Date.now(), //add current date
        0)); //initialize likes as 0
    
    console.log(comments); //+++++++++++

    totalComments++;

    showComments(); //show comments
}

//make a html element with classname:
function makeElement(type, className){ 
    let element = document.createElement(type); //create element
    element.className = className; //give classname
    return element;
}