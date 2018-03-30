# Coffee Gif Browser

## Table of Contents
- [Install](#install)
- [Usage](#usage)
- [Deployment](#deploy)
- [Known Bugs](#bugs)
- [Endpoints](#endpoints)
- [Database Schema](#schema)

## Install

```
$ git clone https://github.com/csc309-18s/assignment-2-coffee.git
$ cd assignment-2-coffee
$ npm install
```

## Usage

To locally run the client and server, do:
```
$ npm start
```

To run just the server, do:

```
$ npm run server
```
Request can now be sent to `localhost:3001/api`

To run just the client, do:

```
$ npm run client
```
The client will now run at `localhost:3000/`

Please see [Solutions.md](/Solutions.md) for detailed usage instructions.

## Deploy

See [docs/deploy.md](/docs/deploy.md)


## Bugs

1. Sometimes when searching/translating, the state change lags and the default search image
is included in the search result for a second before disappearing.

## Endpoints

See [docs/api.md](/docs/api.md)

## Schema

```

{
  "id": <ObjectId>,
  "name": <string>,
  "pw" : <encrypted????>,
  "email": <string>,
  "gifs": []
}

```

## To Do List
[ ] Database  
[ ] Api endpoints  
    - login (get?)  
    - logout (put?)  
    - register (post)  
    - save gif (put)  
    - delete saved gif (update maybe?)  
    - delete account (delete)  
    - Display saved gifs on profile page (get)  
[ ] Connect to react ui  

## Extras

- Save past searches
- Password reset
- Friends?
- Upload?????
