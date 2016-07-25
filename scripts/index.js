window.onload= function(){
  console.log("happy thoughts");

// the URL of our backend to use in our AJAX calls:
// var url = 'http://localhost:3000';
var url='https://secure-escarpment-71346.herokuapp.com';

/***** Part 1 - This is scripting for the homepage*****/

var btnNote = document.getElementById('btn-note');
var quote   = document.getElementById('quote'); //hide the quote on load
quote.style.display = "none";

//hide pages
var actionPage              = document.querySelector(".actionsPage");
var notePage                = document.querySelector(".notesPage");
var weatherPage             = document.querySelector('.weatherPage');
var newsPage                = document.querySelector('.newsPage');
  actionPage.style.display  ="none";
  notePage.style.display    ="none";
  weatherPage.style.display ="none";
  newsPage.style.display    ="none";

var quoteBtn= document.getElementById('quote-icon');
quoteBtn.addEventListener('click', function(ev){
  ev.preventDefault();
btnNote.style.display    = "none";
quoteBtn.style.display   = "none";
quote.style.display      = "block";




var endpoint = "https://quotesondesign.com/wp-json/posts";
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
}); //end of ajax fxn
}); //end of event listener for quote icon
 // create an event listener for next button to hide homepage and bring up next page that allows user to select a set of actions
 var homepage = document.querySelector('.homepage');
 var nextBtn  = document.getElementById('next-btn');
 nextBtn.addEventListener('click', function(ev){
   ev.preventDefault();
   homepage.style.display    = "none";
   weatherPage.style.display = "none";
   newsPage.style.display    = "none";
   actionPage.style.display  = "block";
}); //end of event listener for next button


/********* Part 2 - This is scripting for the actions page*****/
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
  document.getElementById('currentDate').innerHTML= currentDate;
}
timeStamp();


//end of part 2

/***************  Part 3 - This is scripting for the notes page***********/
var today = Date();
document.getElementById('date').innerHTML = "Today is" + " " + today;
var notesPage    = document.querySelector('.notesPage');
var notesRoute   = document.getElementById('notes'); //grab element to create navigation
  notesRoute.addEventListener('click', function(ev){
     ev.preventDefault();
   homepage.style.display    ="none";
   actionPage.style.display  ="none";
   weatherPage.style.display ="none";
   newsPage.style.display    ="none";
   notesPage.style.display   ="block";


//hide all entries and modal box
var currentEntries = document.querySelector('.current-entries');
  currentEntries.style.display = "none";
var modalBox  = document.querySelector(".modalBox");
  modalBox.style.display="none";

/* grab see all button element */
var seeAll         = document.getElementById('see-all-btn');

  seeAll.addEventListener('click', function(ev){
  ev.preventDefault();
  currentEntries.style.display="block";
  console.log("you want to see all!");

// get all
$.get({
  url: url + '/entries',
  dataType: 'json'
}).done(function(response){
  console.log("response: ", response);

  /* Loop & append to DOM: */
  var entriesList = document.getElementById('entries-list');
  // remove existing li's first
  entriesList.innerHTML = '';
  for (var i = 0; i < response.length; i++) {
    var liText     = response[i].note + " " + " " + response[i].current;
    var theLi      = document.createElement('li');
    theLi.setAttribute("id" , response[i]._id);
    //create a delete button for every new entry
    //create an update button for every new entry
    var btnOne     = document.createElement("button"); //delete
    var btnTwo     = document.createElement("button"); //update
    var id = document.createElement('p');
    id.className ="hidden";
    id.innerHTML = response[i]._id;
    id.style.visibility ="hidden";
    entriesList.appendChild(id);
    theLi.appendChild(document.createTextNode(liText));
    entriesList.appendChild(theLi);
    entriesList.appendChild(btnOne);
    entriesList.appendChild(btnTwo);
    btnOne.setAttribute("class", "deleteBtn");
    btnTwo.setAttribute("class", "updateBtn");
    // btnOne.setAttribute("onclick", "deleteFxn(" + response[i]._id + ")");
    btnOne.setAttribute("id" , response[i]._id + "_delete");
    btnTwo.setAttribute("id" , response[i]._id + "_update");
    console.log(entriesList);
    btnOne.innerHTML = "delete";
    btnTwo.innerHTML = "update";
  } //end for Loop


  /*Delete*/
  var deleteBtn = document.querySelector('.deleteBtn');
  deleteBtn.addEventListener('click', function(ev){
    console.log('deleting');
      var entryList = document.getElementById('entries-list');
      var hidden    = document.querySelector('.hidden');
      var idNum     = hidden.innerHTML;
      console.log(idNum)

      var data = {
        idNum: idNum
      };

      $.ajax({
      url: url + '/entries/' + idNum,
      dataType: 'json',
      data: data,
      method: 'delete'
      }).done(function(response){
      console.log("response:", response);
      }); // end ajax

    }); // end event listener for delete
  }); //end get
});//end of event listener for seeAll button


/* save */
var saveButton = document.getElementById('save-btn');
  saveButton.addEventListener('click', function(ev){
    ev.preventDefault();
    console.log("you click save!");
    var modalBox  = document.querySelector(".modalBox");
      modalBox.style.display="block";
    var okButton = document.getElementById('ok-btn').addEventListener('click',function(ev){
      ev.preventDefault();
      modalBox.style.display="none";
    }); //end of modal box event listener
  var note       = document.getElementById('textBox').value;
  var newNote = {
    note: note,
    current: today
  };
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




  /****************** Weather Page ************************/
  /* Recreated weather app after watching a video on Udemy */
//grab element to create navigation
  var weatherRoute = document.getElementById('weather');
  weatherRoute.addEventListener('click', function(ev){
     ev.preventDefault();
   homepage.style.display    ="none";
   actionPage.style.display  ="none";
   notesPage.style.display   ="none";
   newsPage.style.display    ="none";
   weatherPage.style.display ="block";

   var zipBox       = document.getElementById('zipcode');
   var searchBoxDiv = document.getElementById('search-box-div');
   var goBtn        = document.getElementById('go-btn');
   goBtn.addEventListener('click', function(ev){
     ev.preventDefault();

  var zipcode       = zipBox.value;
  var queryString   = zipcode;

 // *** send data to our BE
  var data = {
     queryString: queryString
   };
   $.ajax({
     url: url + '/forecast/search',
     method: 'POST',
     data: data,
     dataType: 'json'
   }).done(function(response) {
     console.log( "response:", response );

     var temperature  = document.getElementById('temp');
     var location     = document.getElementById('location');
     var icon         = document.getElementById('icon');
     var humidity     = document.getElementById('humidity');
     var wind         = document.getElementById('wind');
     var direction    = document.getElementById('direction');
     var description  = document.getElementById('conditions');



    function update(weather) {
      var weather = {};
      wind.innerHTML        = response.wind.speed + " ";
      direction.innerHTML   = degToDir(response.wind.deg);
      humidity.innerHTML    = "humidity:" + " " + response.main.humidity;
      location.innerHTML    = response.name;
      temperature.innerHTML = KtoC(response.main.temp) + "F";
      icon.src = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
      description.innerHTML = response.weather[0].description;
    } //end of function

//original code from udemy lecture on creating weather app
    function degToDir(degrees){
      if(degrees >= 348.75 && degrees < 11.25)
    	return "N";
        if(degrees >= 11.25 && degrees < 33.75)
    	return "NNE";
        if(degrees >= 33.75  && degrees < 56.25)
    	return "NE";
        if(degrees >= 56.25  && degrees < 78.75)
    	return "ENE";
        if(degrees >= 78.75  && degrees < 101.25)
    	return "E";
        if(degrees >= 101.25  && degrees < 123.75)
    	return "SE";
        if(degrees >= 123.75  && degrees < 146.25)
    	return "SSE";
        if(degrees >= 146.25  && degrees < 168.75)
    	return "S";
        if(degrees >= 191.25  && degrees < 213.75)
    	return "SSW";
        if(degrees >= 213.75 && degrees < 236.25)
    	return "SW";
        if(degrees >= 236.25  && degrees < 258.75)
    	return "WSW";
        if(degrees >= 258.75  && degrees < 281.25)
    	return "W";
        if(degrees >= 281.25  && degrees < 303.75)
    	return "WNW";
        if(degrees >= 303.75  && degrees < 326.25)
    	return "NW";
        if(degrees >= 326.25  && degrees < 348.75)
    	return "NNW";
}


    function KtoC(k) {
      return Math.round(k * (9/5) - 459.67);
    }

    update(weather);

       }); // end ajax
   }); //end of event listener for go button
}); //end of weatherRoute listening function




    /**************** News Page************************/

  //grab element to create navigation
    var newsRoute    = document.getElementById('news');
    newsRoute.addEventListener('click', function(ev){
       ev.preventDefault();
     homepage.style.display    ="none";
     actionPage.style.display  ="none";
     notesPage.style.display   ="none";
     weatherPage.style.display ="none";
     newsPage.style.display    ="block";

     var headlines    = document.querySelector('.headlines');
     headlines.style.display = "none"; //stays hidden until a news source is chosen



     var goButton = document.getElementById('go-button');
     goButton.addEventListener('click', function(ev){
       ev.preventDefault();
       headlines.style.display = "block";
       var selection    = document.querySelector('.selection')
       var queryString = selection.value;
       console.log(queryString);


     // *** send data to our BE
      var newsData = {
         queryString: queryString
       };



       $.ajax({
         url: url + '/news/articles',
         method: 'POST',
         data: newsData,
         dataType: 'json'
       }).done(function(response) {
         console.log( "response:", response);


        var headline1 = document.getElementById('headline1');
        var headline2 = document.getElementById('headline2');
        var headline3 = document.getElementById('headline3');
        var headline4 = document.getElementById('headline4');
        var headline5 = document.getElementById('headline5');

        var summary1  = document.getElementById('summary1');
        var summary2  = document.getElementById('summary2');
        var summary3  = document.getElementById('summary3');
        var summary4  = document.getElementById('summary4');
        var summary5  = document.getElementById('summary5');

        headline1.innerHTML = response.articles[0].title.link(response.articles[0].url);
        headline2.innerHTML = response.articles[1].title.link(response.articles[1].url);
        headline3.innerHTML = response.articles[2].title.link(response.articles[2].url);
        headline4.innerHTML = response.articles[3].title.link(response.articles[3].url);
        headline5.innerHTML = response.articles[4].title.link(response.articles[4].url);

        summary1.innerHTML = response.articles[0].description;
        summary2.innerHTML = response.articles[1].description;
        summary3.innerHTML = response.articles[2].description;
        summary4.innerHTML = response.articles[3].description;
        summary5.innerHTML = response.articles[4].description;


      }); //end of ajax
  }); // end of event listener for go button
}); //end event listener for news route


}; //end window load
