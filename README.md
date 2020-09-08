# Twitter-replica

A miniature content sharing replica of the Twitter appication.

## Installation 📦

Simply `git clone https://github.com/Yarharm/Twitter-replica.git` the source onto your
local developement.

### High level design 🚧

![alt text](https://twitter-replica-images.s3.amazonaws.com/High+Level+Design.png)

### Frontend architecture 🚝

Angular modularity allows creation of containers for a closely related set of capabilities. Which makes it perfect for the [Monorepo architecture](https://github.com/idugalic/digital-restaurant-angular).
The underlying idea of the Monorepo architecture is to create a separate consumable resources that can be easily injected, extracted and shared across multiple applications.

It has the following benefits:

- Consistency of the library version for every app.
- Ease of maintenance: when you update a shared library, you update it for all apps.
- No conflicts between versions.

Angular app contains the following list of consumable resources:

- Core Lib - top level library that contains HTTP services and modals.
- User Lib - user information resources.
- Tweet Lib - tweet information resources.
- Auth Lib - authentication resources.
- Friendship Lib - follow/unfollw and timeline resources.
- Material Lib - set of functionalities imported from [Angular Material](https://material.angular.io/components/categories).

![alt text](https://twitter-replica-images.s3.amazonaws.com/FrontendArchitecture.png)

### Software Requirements 📜

Only NodeJS is required for local development.

- [NodeJS](https://nodejs.org/en/download/)

### Knowledge Requirements 💡

- Angular
- Express
- NodeJS
- TypeScript
- JavaScript ES6

### Installing Packages 🗃️⏳

A simple `npm install` at the root directory should be sufficient to get you started.

### Development server 🖥️

To start a dev server.

- `npm run start`

The frontend is at [http://localhost:4200/](http://localhost:4200/) and the backend is at `localhost:3333`. The app will automatically reload if you make changes to any source files.

### Work in progress

- Background worker for automatic deletion of unused media files
- Integrate a [Husky](https://github.com/typicode/husky) pre-commit hook to run linting, testing and code coverage before the commits.
