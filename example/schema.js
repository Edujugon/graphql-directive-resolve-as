const { makeExecutableSchema } = require('graphql-tools');
const { resolveAs } = require('../src/index');

const typeDefs = `
  type User {
    name: String @resolveAs(name: "firstName")
    lastName: String,
    country: String @resolveAs(name: "country.name")
    city: String @resolveAs(name: "country.city.name")
    neighborhood: String @resolveAs(name: "country.city.neighborhood.name")
    firstFriend: String @resolveAs(name: "friends.0.name")
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
    resolveAs,
  },
});
