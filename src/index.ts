import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { User } from "./entity/User";

const typeDefs = `
  type Query {
    hello:String!
  }
  type Muatation {
    register(email:String!,password:String!):Boolean!
    login(email:String!,password:String!):User!
  }
  type User{
    id:ID!
    email:String!
    password:String!
  }
`;

const resolvers = {
  Query: {
    hello() {
      return "hello, world";
    },
  },
};

const bootstrap = async () => {
  const app = express();
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  apolloServer.applyMiddleware({ app });
  const port = 4000;
  app.listen(port, () => {
    console.log("Server is up and running", port);
    console.log(
      "GraphQL Server is up and running",
      port + apolloServer.graphqlPath
    );
  });
  const conn = await createConnection();
  console.log(await conn.manager.find(User));
};
bootstrap().catch(console.error);
