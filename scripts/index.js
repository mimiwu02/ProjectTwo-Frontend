window.onload= function(){
  console.log("happy thoughts");


/***** Part 1 - This is scripting for the homepage*****/

var btnNote = document.getElementById('btn-note');
var quote   = document.getElementById('quote'); //hide the quote on load
quote.style.display = "none";

//hide pages
var actionPage           = document.querySelector(".actions");
actionPage.style.display ="none";
var notePage             = document.querySelector(".notes");
notePage.style.display   ="none";

var quoteBtn= document.getElementById('quote-icon');
quoteBtn.addEventListener('click', function(ev){
  ev.preventDefault();
btnNote.style.display    = "none";
quoteBtn.style.display   = "none";
quote.style.display      = "block";


var endpoint = "http://quotesondesign.com/wp-json/posts"
var query    = endpoint + "?filter[orderby]=rand&filter[posts_per_page]=" + Math.floor(Math.random()*50); // randomizes the amount of post per page so it returns a different quote everytime page refreshes
console.log(query);


$.ajax({
  url: query
}).done(function(data){
  console.log(data);

  var content        = data[0].content + "<p>&mdash; " + data[0].title;
  console.log(content);
  var newQuote       = document.getElementById('quote');
  newQuote.innerHTML = content;
});
}); //end of event listener for quote icon
 // create an event listener for next button to hide homepage and bring up next page that allows user to select a set of actions
 var homepage = document.querySelector('.homepage');
 var nextBtn  = document.getElementById('next-btn');
 nextBtn.addEventListener('click', function(ev){
   ev.preventDefault();
   homepage.style.display   = "none";
   actionPage.style.display ="block";


/***** Part 2 - This is scripting for the actions page*****/
//timeStamp function source: https://gist.github.com/hurjas/2660489

function timeStamp() {
// Create a date object with the current time
  var now = new Date();

// Create an array with the current month, day and time
  var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];

// Create an array with the current hour, minute and second
  var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];

// Determine AM or PM suffix based on the hour
  var suffix = ( time[0] < 12 ) ? "AM" : "PM";

// Convert hour from military time
  time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;

// If hour is 0, set it to 12
  time[0] = time[0] || 12;

// If seconds and minutes are less than 10, add a zero
  for ( var i = 1; i < 3; i++ ) {
    if ( time[i] < 10 ) {
      time[i] = "0" + time[i];
    }
  }

// Return the formatted string
  var currentDate= date.join("/") + " " + time.join(":") + " " + suffix;
  console.log(currentDate);
  document.getElementById('currentDate').innerHTML= currentDate
}
timeStamp();

//grab all element to create navigation
var weatherRoute = document.getElementById('weather');
var newsRoute    = document.getElementById('news');
var notesRoute   = document.getElementById('notes');
//end of part 2

/***** Part 3 - This is scripting for the notes page*****/
var today = Date();
document.getElementById('date').innerHTML= today;
var notesPage    = document.querySelector('.notes');
  notesRoute.addEventListener('click', function(ev){
     ev.preventDefault();
   homepage.style.display   ="none";
   actionPage.style.display ="none";
   notesPage.style.display  ="block";

// the URL of our backend to use in our AJAX calls:
//var url = 'http://localhost:3000';
var url='https://secure-escarpment-71346.herokuapp.com'

//hide all entries
var currentEntries = document.querySelector('.current-entries');
  currentEntries.style.display = "none";

/* see all button */
var seeAll         = document.getElementById('see-all-btn');

  seeAll.addEventListener('click', function(ev){
  ev.preventDefault();
  currentEntries.style.display="block";
  console.log("you want to see all!");

  // get all
      $.ajax({
        url: url + '/entries',
        dataType: 'json'
      }).done(function(response){
        console.log("response: ", response);

        /* Loop & append to DOM: */
        var entriesList = document.getElementById('entries-list');
        // remove existing li's first
        entriesList.innerHTML = '';
        for (var i = 0; i < response.length; i++) {
          var liText     = response[i].note;
          var timeOfPost = response[i].current;
          var theLi      = document.createElement('li');
          var postDate   = document.getElementById('timestamp');
          theLi.appendChild(document.createTextNode(liText));
          entriesList.appendChild(theLi);
          postDate.innerHTML = timeOfPost;
        }
      });
}); //end of event listener for seeAll button

/* save */
var saveButton = document.getElementById('save-btn');
  saveButton.addEventListener('click', function(ev){
    ev.preventDefault();
    console.log("you click save!");
  var note       = document.getElementById('textBox').value;
  var newNote = {
    note: note,
    current: today
  }
    console.log(newNote);

//post
  $.ajax({
     url: url + '/entries/new',
     dataType: 'json',
     method: 'POST',
     data: newNote
   }).done(function(response){
     console.log("response:", response);
   }); // end ajax
}); // end of event listener for save button


}); //end of event listener for notes icon
}); //end of event listener for next button
} //end window load
