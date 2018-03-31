# Coffee Gif Browser

## Getting Started

The application is live [here](https://mysterious-crag-44463.herokuapp.com/#/)

If you want to run the application locally:

```
$ git clone https://github.com/csc309-18s/assignment-3-coffee.git
$ cd assignment-3-coffee
$ npm install
$ npm start
```
Your browser should now open the URL `localhost:3000`; where our app lives. A window may pop up asking you to allow incoming connections.
Please click 'yes'.

## Source Code

Source code for all views is located in [client/src/views](/client/src/views).
Source code for the header and footer is located in [client/src/App.js](/client/src/App.js). The `content` div in `App.js` is
where views are swapped into based on user input. CSS style for all views is located in [/client/src/style](/client/src/style).

Server side code is located in [/server/server.js](/server/server.js). API endpoints are
defined in [docs/api.md](/docs/api.md).

## Using Coffee

Our app has seven views: `Trending`, `Search`, `Translate`, `Share`, `Profile`, `Log In`, and `Register`. Most of these can be accessed through
clicking the link to them in the navigation bar at the top of the app. `Share` is accessed through clicking any gif in the application. `Register` is only available from the `Log In` view.

### Trending
`Trending` is the default view of our application, where a user will start from. It displays the top 25 trending gifs from Giphy. If a user clicks on a gif,
they are directed to the `Share` view.


### Search & Translate

`Search` and `Translate` are very similar. Both can be accessed from the top nav-bar. They allow a user to search for gifs from Giphy (`Search`), or allow a user to translate
their phrases into gif form (`Translate`). `Search` returns 25 gifs to the user, while `Translate` returns a single gif. If a user clicks on a gif,
they are directed to the `Share` view.

### Share

Users can arrive on the `Share` view by clicking a gif in any other view.
The gif they clicked is displayed, along with links
to share the gif on Facebook or Twitter. If a user is logged in, they can save gifs to their profile from this view.

### Profile

The `Profile` view displays the saved gifs of a logged in user, as well as offering links to change
their user information (password, email, name). Users can also unsave gifs from this view.
It can be accessed from the nav-bar. If a user is not logged in, this view redirects to the login page

### Log-in and Register

The `Log In` view is where a user logs in to our application. It can be accessed by clicking the link in the top right of the screen. The `Register` views is accessible from the
`Log In` view. `Register` allows a new user to register for an account.

Once a user is logged in or registered, they are redirected to the main page and their logged in status
is saved in session storage. The profile page and save gif links will become available. The `Log In` link at the top
right will change to `Log Out`. If a user clicks `Log Out`, session storage is cleared and they are sent
to the `Log In` view.
