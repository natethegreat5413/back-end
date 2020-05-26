# back-end
This is ugly, we'll fix it later

# Water-My-Plants-4

# Introduction
Registers new users and securely logs in current users. Allows users to view, add, edit, and delete plants.

# Overview
Each plant is tied to Users ID

# Authentication
What is the preferred way of using the API?

# Error Codes
What errors and status codes can a user expect?

# Rate limit
N/A

POST https://water-my-plants-four.herokuapp.com/auth/register
https://water-my-plants-four.herokuapp.com/auth/register
Create a new user. ALL FIELDS REQUIRED Input: { "username": "user02", "email": "user02@email.com", "password": "pw2" }

Returns: { "data": { "id": 8, "username": "user02", "email": "user02@email.com", "password": "$2a$09$na7Of8PHx92XCpqfLkLBZ.3lVmeUYpOMvHs5aN1ojg3j1fZ6iaeIS" } }



Example Request
Default
var raw = "";

var requestOptions = {
  method: 'POST',
  body: raw,
  redirect: 'follow'
};

fetch("https://water-my-plants-four.herokuapp.com/auth/register", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
POST https://water-my-plants-four.herokuapp.com/auth/login
https://water-my-plants-four.herokuapp.com/auth/login
Allows registered user to log in. Returns token to user to access restricted endpoints. Input: { "username": "user02", "password": "pw2" } Returns: { "message": "Login Successful!", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjgsInVzZXJuYW1lIjoidXNlcjAyIiwiaWF0IjoxNTkwNDI1NzE0LCJleHAiOjE1OTA1MTIxMTR9.rYYiNKCToxmuBpf0JICBqoKv7tQXKi9rNdQ8ULD4Ffo" }



Example Request
Default
var raw = "";

var requestOptions = {
  method: 'POST',
  body: raw,
  redirect: 'follow'
};

fetch("https://water-my-plants-four.herokuapp.com/auth/login", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
POST https://water-my-plants-four.herokuapp.com/plants
https://water-my-plants-four.herokuapp.com/plants
Allows valid user to create new plant to their list. REQUIRED FIELDS INCLUDE user_id, nickname, species, and h2o_frequency. Optional field includes image_url.

INPUT: { "user_id": 8, "nickname": "Carl", "species": "japanese peace lilly", "h2o_frequency": 5, "image_url: '' }



Example Request
Default
var raw = "";

var requestOptions = {
  method: 'POST',
  body: raw,
  redirect: 'follow'
};

fetch("https://water-my-plants-four.herokuapp.com/plants", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
GET https://water-my-plants-four.herokuapp.com/plants
https://water-my-plants-four.herokuapp.com/plants
Retrieve list of plants for given user. Returns: { id: 1, user_id: 1, nickname: "the one by the window", species: "rosebud", h2o_frequency: 3, image_url: '' }, { id: 2, user_id: 1, nickname: "Steve", species: "fern", h2o_frequency: 5, image_url: '' }



Example Request
Default
var raw = "";

var requestOptions = {
  method: 'GET',
  body: raw,
  redirect: 'follow'
};

fetch("https://water-my-plants-four.herokuapp.com/plants", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
GET https://water-my-plants-four.herokuapp.com/plants/:id
https://water-my-plants-four.herokuapp.com/plants/3
Retrieve plant with specific id.

Returns: { id: 1, user_id: 1, nickname: "the one by the window", species: "rosebud", h2o_frequency: 3, image_url: '' }



Example Request
Default
var raw = "";

var requestOptions = {
  method: 'GET',
  body: raw,
  redirect: 'follow'
};

fetch("https://water-my-plants-four.herokuapp.com/plants/3", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
DEL https://water-my-plants-four.herokuapp.com/plants/:id
https://water-my-plants-four.herokuapp.com/plants/3
Removes plant with specified id Returns: { "removed": 1 }



Example Request
Default
var raw = "";

var requestOptions = {
  method: 'DELETE',
  body: raw,
  redirect: 'follow'
};

fetch("https://water-my-plants-four.herokuapp.com/plants/3", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
PUT https://water-my-plants-four.herokuapp.com/plants/:id
https://water-my-plants-four.herokuapp.com/plants/3
Edit a current plant with given id. Input: { "user_id": 8, "nickname": "Gladys", "species": "pirahna plant", "h2o_frequency": 7 }

Returns: { "id": 3, "user_id": 8, "nickname": "Gladys", "species": "pirahna plant", "h2o_frequency": 7, "image_url": null }



Example Request
Default
var raw = "";

var requestOptions = {
  method: 'PUT',
  body: raw,
  redirect: 'follow'
};

fetch("https://water-my-plants-four.herokuapp.com/plants/3", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
