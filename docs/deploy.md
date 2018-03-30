## How to deploy to Heroku

### Get MONGODB_URI

```
$ heroku config:get MONGODB_URI
```

### Deployment

```
$ git add .
$ git commit -m 'test API endpoints'
$ git push heroku master
```
