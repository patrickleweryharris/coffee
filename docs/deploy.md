## How to deploy to Heroku

### Get MONGODB_URI

```
$ heroku config:get MONGODB_URI
```

If you need to access the db locally

### Deployment

```
$ npm run build
$ git add .
$ git commit -m 'your commit message'
$ git push heroku master
```

Any local changes should also be pushed to github using `git push origin master`

Or, if you want to do all these things:

```
$ npm run deploy
```
