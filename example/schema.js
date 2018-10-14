const { makeExecutableSchema } = require('graphql-tools');
const { resolveAs } = require('../src/index');

const typeDefs = `
  type User {
    name: String @resolve_as(name: "firstName")
    lastName: String,
    country: String @resolve_as(name: "country.name")
    city: String @resolve_as(name: "country.city.name")
    neighborhood: String @resolve_as(name: "country.city.neighborhood.name")
    firstFriend: String @resolve_as(name: "friends.0.name")
  }
  type Query {
    me: User
  }
`;

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

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    resolve_as: resolveAs,
  },
});
