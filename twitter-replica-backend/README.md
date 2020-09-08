# TwitterReplicaBackend

Backend functionality management for the Twitter-replica.

## Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies.
- Create `.env` file with defined:
- - DATABASE_URL - connection to your mongodb.
- - AUTH_SECRET_DEV - secret string for authentication.
- - REDIS_PORT - port for the Redis server.
- The following `.env` properties are required for the object store.
- - AWS_ACCESS_KEY_ID
- - AWS_BUCKET_POLICY
- - AWS_DOMAIN
- - AWS_SECRET_ACCESS_KEY
- - AWS_SESSION_TOKEN
- - S3_BUCKET
- `npm run start:app:dev` to start the local development server.

## Features

- Robust routing.
- Authentication and authorization of the users and their posts.
- Multiple media management with S3 Object Store.
- High performance with paginated requests.

## Application Structure

- `main.js` - The entry point to our application.
- `routes` - This folder contains the route definitions for our API.
- `controllers` - This folder contains the controller impkementation for our API.
- `models` - This folder contains the schema definitions for our Mongoose models.
- `middleware` - This folder contains the media and auth middlewares.
- `configs` - This folder contains configuration for multer (media management) as well as some custom settings for the db and users.
- `test` - set of e2e tests.

## Testing and linting

Testing is executed with [Mocha](https://mochajs.org/) and [SuperTest](https://github.com/visionmedia/supertest).
To run tests execute `npm run test`. You can also run `npm run lint` for the linting report and
`npm run lint:fix` to automatically fix linting problems.

## Deployment

Application is deployed with [Heroku](https://devcenter.heroku.com/articles/deploying-nodejs) on
http://lit-anchorage-81116.herokuapp.com. You can verify [healthcheck](http://lit-anchorage-81116.herokuapp.com/api).

Since our Backend is stored in the same repo as a Frontend, we need to push a subfolder to deploy on heroku:

```bash
git subtree push --prefix twitter-replica-backend heroku master
```

In case of the force-push

```bash
git push heroku 'git subtree split --prefix twitter-replica-backend branch':master --force
```
