const { ApolloServer, gql } = require("apollo-server");

const users = [
  { username: "Adham", age: 21, contact: "998998000334" },
  { username: "Hasan", age: 18, contact: "998931121202" },
  { username: "Ulug", age: 19, contact: "998974420427" },
  { username: "Shoxista", age: 22, contact: "998781502805" },
];

const typeDefs = gql`
  type Query {
    users: [Users]
  }
  type Users {
    username: String
    age: Int
    contact: String
  }
`;

const resolvers = {
  Query: {
    users: () => users,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(() => console.log("Server is running..."));
