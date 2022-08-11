# LANDMARK-BROWSER
Simple app created mainly with React and MongoDB.

## General information
* The main purpose of this application is to browse the different landmarks that the users have posted.
* The guests (not logged-in users) are only enabled to see the home page, the catalog (All Landmarks) page, 
the details page of every landmark posted, but without the dynamic part, and also to login or register a user.
* The logged-in users are able to see the home page and the catalog (All Landmarks) page, the details page of every 
landmark posted, where all users can see a map of the landmark's location and the other descriptions, the user that is the creator of the post of the 
current landmark can also see an edit and a delete button, which functionality is obvious, the rest of the users can share if they have ever visited
the current landmark. All users can also see a different page with their post only and to logout.

## Technologies
* Client
  * react: 18.2.0,
  * react-router-dom: 6.3.0
* Server
  * bcrypt: 5.0.1,
  * cors: 2.8.5,
  * express: 4.18.1,
  * jsonwebtoken: 8.5.1,
  * mongoose: 6.5.0
  
## Setup
To run this project, in the project directory, you should run:

```
$ cd ./client
$ npm init --y
$ npm start
```
Which opens the app at http://localhost:3000 in your browser.
However it won't work unless the server is listening, so in the project directory, you should also run:

```
$ cd ./server
$ npm init --y
$ npm start
```

And the server will start listening on port 3030.
