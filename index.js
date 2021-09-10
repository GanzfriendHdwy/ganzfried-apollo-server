const { ApolloServer, gql } = require("apollo-server");
const db = require("./models");
const { Link } = db;
const { verifySlug } = require("./helpers");

const typeDefs = gql`
  type Link {
    url: String!
    slug: String!
    modifiedUrl: String!
  }

  type Query {
    links: [Link]
  }

  type Mutation {
    createLink(url: String!, slug: String!, modifiedUrl: String): Link!
  }
`;

const resolvers = {
  Query: {
    links: async () => {
      return await Link.findAll();
    }
  },
  Mutation: {
    async createLink({ url, slug }) {
      console.log("link has been created", url, slug);
      const verifiedSlug = verifySlug(slug);
      // const modifiedUrl = modifyUrl(url, verifiedSlug);
      return Link.create({
        url,
        slug: verifiedSlug,
        modifiedUrl: `https://hdwy.link/${verifiedSlug}`
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
