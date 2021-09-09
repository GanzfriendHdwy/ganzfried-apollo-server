const { ApolloServer, gql } = require("apollo-server");
const Link = require("./models/link");

const typeDefs = gql`
  type Link {
    url: String
    slug: String
  }

  type Query {
    links: [Link]
  }
`;

const resolvers = {
  Query: {
    // hello: (root, args, context) => "Hello world!"
    links: () => {
      return Link.findAll();
    }
  },
  Mutation: {
    async createLink({ url, slug }) {
      return Link.create({
        url,
        slug
      });
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// const resolvers = {
//   Query: {
//     async user(root, { id }, { models }) {
//       return models.User.findById(id);
//     },
//     async allRecipes(root, args, { models }) {
//       return models.Recipe.findAll();
//     },
//     async recipe(root, { id }, { models }) {
//       return models.Recipe.findById(id);
//     },
//   },
// };
