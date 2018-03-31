# Coffee Gif Browser

## Live [here](https://mysterious-crag-44463.herokuapp.com/#/)

## Table of Contents
- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Deployment](#deployment)
- [Known Bugs](#bugs)
- [Database Schema](#schema)

## Install

```
$ git clone https://github.com/csc309-18s/assignment-2-coffee.git
$ cd assignment-2-coffee
$ npm install
```

## Usage

The app is live [here](https://mysterious-crag-44463.herokuapp.com/#/)

To locally run the client and server, do:
```
$ npm start
```

To run just the server, do:

```
$ npm run server
```
Requests can now be sent to `localhost:8080/api`

To run just the client, do:
```
$ npm run client
```
The client will now run at `localhost:3000/`. Note that if the server is not running
users cannot log in, save gifs, etc...

Please see [Solutions.md](/Solutions.md) for detailed usage instructions.

## API

See [docs/api.md](/docs/api.md)

## Deployment

See [docs/deploy.md](/docs/deploy.md)


## Bugs

1. Sometimes when searching/translating, the state change lags and the default search image
is included in the search result for a second before disappearing.

## Schema

```
{
  "_id": <ObjectId>,
  "name": <string>,
  "password" : <hashed string>,
  "email": <string>,
  "gifs": []
}
```

## To Do List
- [x] Database  
- [x] API endpoints  
    - [x] login (post)  
    - [x] register (post)  
    - [x] save gif (put)  
    - [x] delete saved gif (delete)  
    - [x] delete account (delete)  
    - [x] Get saved gifs for a user (get)
    - [x] Password change (put)
    - [x] Email change (put)
    - [x] Name change (put)
    - [x] Show all users (get)
- [ ] Connect to react ui
  - [x] Session storage
  - [x] Register (once user is logged in, the sign in button should be replaced with 'logged out')
  - [x] Login (once user is logged in, the sign in button should be replaced with 'logged out')
  - [ ] Profile page (needs to link to change password, delete gif, display gifs/user info, and delete account)
  - [ ] Share (needs to link to add gif). Share page needs a button for saving, as well
- [ ] Documentation
  - [x] deploy.md
  - [x] api.md 
  - [ ] solutions.md
  - [ ] instructions.md
  - [x] attribution.md

## Extras

- Save past searches
- Password reset
- Friends?
- Upload
