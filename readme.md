# ![RealWorld Example App](logo.png)

> ### GraphQL codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld-example-apps) spec and API.


### [Demo]()&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)


This codebase was created to demonstrate a fully fledged fullstack application built with **Graphql with Apollo Server** including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the **Graphql with Apollo Server** community styleguides & best practices.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

## Note
This repo is **under development** yet! **Contributors** are very welcomed!


# Getting started

```bash
$ git clone git@github.com:thebergamo/realworld-graphql.git

$ cd realworld-graphql

## Docker Version
### dev version
$ docker-compose up realworld-graphql

### prod version
$ docker-compose up realworld-graphql-prod

## Without Docker
$ yarn

### dev version
$ yarn run dev

### prod version
$ yarn run build && yarn run start
```

# Code Overview

## Application Structure
* `data/schema.graphql` - Is the file that resolve the Graphql schema.
* `src/server.js` - Entry point of the application. This file define the Hapi.js server and graphql-server-hapi. 
* `src/core` - This folder contains all helper files, like `src/core/config.js` and `src/core/schema.js`.
* `src/resource` - This folder contains the resources folders. Any resource must auto contain itself.
* `src/resource/resolver.js` - This file must load and merge all the resolver files under the resource folder.
* `src/resource/users` - This file contains the `user` resource and have 2 files inside `controller.js` that have an abstraction of the user CRUD and `resolver.js`. 

# Docs
You can easily checkout the queries for the project using [GrahQL IDE](https://github.com/redound/graphql-ide), that's support import and export your saved queries. All queries supported are stored in a JSON exported file in the directory `docs`
