[![Build Status](https://travis-ci.org/lackadaisicalFoxtrot/betterBus.svg)](https://travis-ci.org/<your Organization name>/<your project name>)

# myBus

MyBus is a mobile application which uses the user's location to display the nearest public transit stations and live 
arrival times for buses and trains at each station. 

## Team

  - __Product Owner__: Xue (Dani) Hu
  - __Scrum Master__: Liam Gallivan
  - __Development Team Members__: Medhir Bhargava, James Robinson

## Table of Contents

1. [Getting Started](#getting-started)
    1. [Install Dependencies](#install-dependencies)
    1. [Transit Data Api](#transit-data-api)
    1. [Server for authentication & other services (optional)](#server-for-authentication--other-services-optional)
1. [Deployment & Continuous Integration](#deployment--continuous-integration)
    1. [Set up deployment environment](#set-up-deployment-environment)
    1. [Set up continuous integration](#set-up-continuous-integration)
1. [Testing](#testing)
    1. [Unit tests - Jasmine / Karma](#unit-tests---jasmine--karma)
    1. [e2e tests - Protractor](#e2e-tests---protractor)
1. [Contributing](#contributing)
1. [Documentation](#documentation)
1. [Technology Stack](#technology-stack)

## Getting Started

### Install Dependencies

First, install the following if you don't already have them installed.

```
npm install -g cordova ionic      // installs ionic framework and cordova dependency
npm install -g bower              // installs bower globally
npm install -g gulp               // installs gulp globally
npm install -g jasmine            // installs jasmine globally
npm install -g jasmine-node       // (if using our server repo) installs jasmine-node globally
```

Next, run the following commands to install all the required dependencies.

```
npm install
bower install
```

### Transit Data Api

For our transit data, we are relying on the nextbus api. Since nextbus only publishes this data as an XML feed, we are
using the [restbus library](http://restbus.info/) (a rest abstraction over the nextbus xml feed). Feel free to [fork
our api](https://github.com/inverted-murmuration/api) server or roll your own using the 
[restbus library](http://restbus.info/). 

### Server for authentication & other services (optional)

We've also set up a node server with a postgres database to use for user authentication and any other services you'd 
like to add in the future. Feel free to [fork it](https://github.com/inverted-murmuration/server). We used the sequelize
ORM to interact with our postgres database. To easily install postgres on your local machine, take a look at the 
[Postgres App](http://postgresapp.com/).

## Deployment & Continuous Integration

### Set up deployment environment

For easy deployment and integration with Travis CI (see below), consider using Heroku for deployment. If you are not
familiar with Heroku, check out their [Getting Started with Node.js] guide.
(https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)

Note: if you are using our server repo and would like to add a postgres database service hosted on heroku, make sure
you add your postgres server as an addon in the resources page of your heroku server. If you try to add a postgres
service from the databases section of your heroku dashboard, heroku will spin up a new server for this postgres service
which won't be accessible from your original server.

### Set up continuous integration

We are using Travis Ci. For this report there is no automated deployment. However, npm test is run on Travis Ci every time a pull request is submitted and when a pull request is merged into the master branch. After you fork a copy of this repo, you will need to setup your own Travis account. 

1. Visit https://travis-ci.org and create an account.
1. Open your Organization inside Travis Ci
  1. Sync your Organization
  1. Turn on your newly forked repository
1. Verify Permissions 
  1. Visit https://github.com/<your Organization name>
    1. Click Organization settings
    1. Click Third-party access
    1. Verify Travis Ci is Approved
  1. Visit https://github.com/<your Organization name>/<your project name>/settings/hooks
    1. Verify Travis Ci is an added Service
1. Update the first line of this document to follow this format

```
[![Build Status](https://travis-ci.org/<your Organization name>/<your project name>.svg)](https://travis-ci.org/<your Organization name>/<your project name>)
```

## Testing

While developing, try using the

```
ionic serve --lab
```

command to test the app in your browser

We've installed a number of testing suites for you to use as you wish. These include:

### Unit tests - Jasmine / Karma 

The unit test spec files can be found at www/spec/unit. To run these tests (as well as jshint), run the following in
your terminal window from the project root directory.

```
npm test
```

### e2e tests - Protractor

The end-to-end test spec files can be found at www/spec/e2e. To run these tests, run the following the the terminal from
the project root directory.

```
gulp protractor
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Documentation

```
gulp jsdoc
open docs/index.html
```

## Technology Stack

We used the following tools and technologies in this project

1. Ionic
1. Angular
1. Node.js
1. Express
1. Postgres
1. Sequelize
1. Bower
1. Gulp
1. Jasmine
1. Karma
1. Protractor
1. Travis CI
1. Waffle.io
1. jsDoc