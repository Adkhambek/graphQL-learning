const { ApolloServer, gql } = require("apollo-server");

const users = [
  {
    username: "Adham",
    age: 21,
    contact: "998998000334",
    isMarried: true,
    gender: "male",
  },
];

const books = [{ name: "Atomic Habits", author: "James Clear" }];

const typeDefs = gql`
  union searchResult = Users | Books
  type Query {
    users: [Users!]!
    books: [Books!]!
    search(contains: String!): [searchResult!]!
  }
  type Users {
    username: String!
    age: Int!
    contact: String!
    isMarried: Boolean!
    gender: Gender!
  }
  type Books {
    name: String!
    author: String!
  }
  enum Gender {
    MALE
    FEMALE
  }
`;

const resolvers = {
  searchResult: {
    __resolveType(obj) {
      if (obj.username) {
        return "Users";
      }
      if (obj.name) {
        return "Books";
      }
    },
  },
  Query: {
    users: () => users,
    books: () => books,
    search: (_, { contains }) => {
      const foundUsers = users.filter(
        (e) =>
          e.username.toLowerCase().includes(contains.toLowerCase()) ||
          e.contact.toLowerCase().includes(contains.toLowerCase()) ||
          e.age.toLowerCase().includes(contains.toLowerCase())
      );
      const foundBooks = books.filter(
        (e) =>
          e.name.toLowerCase().includes(contains.toLowerCase()) ||
          e.author.toLowerCase().includes(contains.toLowerCase())
      );
      return [...foundUsers, ...foundBooks];
    },
  },
  Gender: {
    MALE: "male",
    FEMALE: "female",
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`server is running on ${url}`));

/*
query{
 search(contains: "a"){
    ...on Users{
        __typename
        username
        contact
        age
      }
      ...on Books{
        __typename
        name
        author
      }
 }
}
*/
