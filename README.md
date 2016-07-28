
## **Project Two**
### *Joie de vivre - productivity app*
#### Overview
This an application designed to allow a busy person to wake up in the morning and be able to check the forecast, top headlines on the news, and add notes to self.


#### Technology Used
I used HTML, CSS, JavaScript, MongoDB, node.js, AJAX.

APIs:
https://newsapi.org/ <br>
https://quotesondesign.com/ <br>
http://openweathermap.org/api <br>


HTML was used to build out the skeleton for each page. CSS was used to add background images for each page and design the overall look and feel. JavaScript was used on the front-end to work with the HTML. It hid all of my application pages so no reload needed! JavaScript was also used to call on MongoDB to store and access data and it was used to call on various APIs. AJAX was used to send and retrieve data between backend and the front-end, to be able to access the data I needed from MongoDB and APIs.


#### Any unsolved problems
There are some things I would like to work on:
  * Originally I wanted to use the Aylien API to get a summary of the articles using the URL that was retrieved from the News API. Unfortunately it wasn't clear in the documentation how I could access the JSON data. There was no indication of where to place the API key in the url.

  * I would like to add a navigation to the pages to be more user friendly

  * User doesn't realize that a note has been deleted unless they select the see all button after they hit delete.

  * Need to work on update note functionality

#### Link
[Joie de vivre - A Productivity App](https://mimiwu02.github.io/ProjectTwo-Frontend/)

Backend URL : https://secure-escarpment-71346.herokuapp.com

#### Sources
Citation added within code


#MVP Checklist

1. Quote of the day API functional where quote appears on click
2. CRUD for notes and able to submit new and see all
3. Weather API working and able to see current forecast
4. News API functional to get top headlines and a summary for each headline

#Secondary:
Search capability for the notes to search by keywords
