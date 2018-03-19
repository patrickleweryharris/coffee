# Coffee Gif Browser

## Table of Contents
- [Install](#install)
- [Usage](#usage)
- [Known Bugs](#bugs)

## Install

```
$ git clone https://github.com/csc309-18s/assignment-2-coffee.git
$ cd assignment-2-coffee
$ npm install
```

## Usage

```
$ npm start
```

Please see [Solutions.md](/Solutions.md) for detailed usage instructions.


## Bugs

1. Sometimes when searching/translating, the state change lags and the default search image
is included in the search result for a second before disappearing.

## Endpoints

`api/login`
Where user logs on to the site. Stores cookie so user remains logged in over different sessions

## Database Schema

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
[] Database
[] Api endpoints
    - login (get?)
    - logout (put?)
    - register (post)
    - save gif (put)
    - delete saved gif (update maybe?)
    - delete account (delete)
    - Display saved gifs on profile page (get)
[] Connect to react ui

## Extras

- Save past searches
- Password reset
- Friends?
- Upload?????
