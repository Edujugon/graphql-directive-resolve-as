# graphql-directive-resolve-as

[![Version][version-badge]][package]
[![downloads][downloads-badge]][npmtrends]
[![PRs Welcome][prs-badge]][prs]
![MIT License][license-badge]

# Introduction

Graphql directive to resolve fields as different prop names of the belonging object.

This directive helps you not to declare resolvers over and over
just because the name you wanna expose is different to the prop name.

It allows resolution for nested objects, converting a string in dot notation into an object reference.

# Table of Contents

* [Introduction](#introduction)
* [Installation](#installation)
* [Usage](#Usage)
* [Parameters](#directive-parameters)

# Installation

```
yarn add graphql-directive-resolve-as
```

# Usage

```js
const { resolveAs } = require('graphql-directive-resolve-as');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    resolve_as: resolveAs,
    ...
  },
});
```

then you can use it in your fields like this:

```js
const typeDefs = `
  type User {
    name: String @resolve_as(name: "firstName")
    lastName: String,
    city: String @resolve_as(name: "country.city.name")
    firstFriend: String @resolve_as(name: "friends.0.name")
  }
  type Query {
    me: User
  }
`;
```

`me` query resolver could be something like this:
```js
const resolvers = {
  Query: {
    me: () => ({
      firstName: 'John',
      lastName: 'Doe',
      friends: [
        {
          name: 'Edu'
        },
        {
          name: 'Natalia'
        }
      ],
      country: {
        name:'Germany',
        city: {
          name:'Berlin',
          neighborhood: {
            name: "Kreuzberg"
          }
        }
      }
    }),
  },
};
```

> if you use [`graphql-import`](https://github.com/prismagraphql/graphql-import) then you need to add this definition on top of the schema:

```graphql
directive @resolve_as(name: String) on FIELD_DEFINITION
```

# Directive Parameters

`name` = Path as string in dot notation to the object property to be resolved.

## Happy coding :tada:

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[build-badge]: https://img.shields.io/travis/edujugon/graphql-directive-resolve-as.svg?style=flat-square
[build]: https://travis-ci.org/edujugon/graphql-directive-resolve-as
[version-badge]: https://img.shields.io/npm/v/graphql-directive-resolve-as.svg?style=flat-square
[package]: https://www.npmjs.com/package/graphql-directive-resolve-as
[downloads-badge]: https://img.shields.io/npm/dm/graphql-directive-resolve-as.svg?style=flat-square
[npmtrends]: http://www.npmtrends.com/graphql-directive-resolve-as
[license-badge]: https://img.shields.io/npm/l/graphql-directive-resolve-as.svg?style=flat-square
[license]: https://github.com/edujugon/graphql-directive-resolve-as/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
