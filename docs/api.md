## API Endpoints

Host:
- https://mysterious-crag-44463.herokuapp.com (if running the production build)
- `localhost:8080` (if running locally)  

### - api/users

Methods:
#### - GET:
  - Path: `/api/users`  
  - Description: Shows all users of the application  
#### - DELETE:  
  - Path: `api/users/:id`  
  - Description: Deletes a user given by id   
  - Parameters:  
    - `id`: A user's unique identifier
#### - PUT:
  - Path: `/api/users/:id/:variable`
  - Description: Update a given user's password, name, or email  
  - Parameters:  
    - `id`: A user's unique identifier
    - `variable`: One of: password, name, or email
  - Required Data:
    - `updater`: New value of password, name, or email

### - /api/register
Methods:
#### - POST
  - Path: `/api/register`
  - Description: Registers a new user
  - Required Data:
    - `name`: User's name
    - `email`: User's email
    - `password`: User's password

### - /api/login
TODO

### - /api/logout
Methods

#### - POST
  - Path: `api/logout`
  - Description: Logout a logged in user

### - /api/gifs
Methods:

#### - GET
  - Path: `/api/gifs/:id`
  - Description: Show gifs saved by a given user
  - Parameters:  
    - `id`: A user's unique identifier

#### - PUT
  - Path: `/api/gifs/:id`
  - Description: Add a new gif to a user's private collection
  - Parameters:  
    - `id`: A user's unique identifier
  - Required Data:
    - `gif`: ID of new gif to add

#### - DELETE
  - Path: `/api/gifs/:id`
  - Description: Remove a gif from a user's private collection
  - Parameters:  
    - `id`: A user's unique identifier
  - Required Data:
    - `gif`: ID of gif to remove
