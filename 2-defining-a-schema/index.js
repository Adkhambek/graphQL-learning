const { ApolloServer, gql } = require("apollo-server");

const users = [];

const typeDefs = gql`
  "Description for the type"
  type Query {
    users: [Users!]!
  }
  type Mutation {
    addUser(input: UserInput): [Users!]!
  }
  type Users {
    username: String!
    age: Int!
    contact: String!
    isMarried: Boolean!
    gender: Gender!
  }
  input UserInput {
    username: String!
    age: Int!
    contact: String!
    isMarried: Boolean!
    gender: Gender!
  }
  enum Gender {
    MALE
    FEMALE
  }
`;

const resolvers = {
  Query: {
    users: () => users,
  },
  Gender: {
    MALE: "male",
    FEMALE: "female",
  },
  Mutation: {
    addUser: (_, { input }) => {
      console.log(input);
      users.push(input);
      return users;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(() => console.log("Server is running..."));
