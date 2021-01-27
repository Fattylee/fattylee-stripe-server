import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import session from "express-session";
import Stripe from "stripe";
import "dotenv/config";

import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const bootstrap = async () => {
  const app = express();
  const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: "2020-08-27",
  });

  app.use(
    session({
      secret: process.env.COOKIE_SECRET!,
      resave: false,
      saveUninitialized: false,
    })
  );

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, stripe }),
  });

  apolloServer.applyMiddleware({ app });
  const port = 4000;
  app.listen(port, () => {
    console.log("Server is up and running", port);
    console.log(
      "GraphQL Server is up and running",
      port + apolloServer.graphqlPath
    );
  });
  await createConnection();
};

bootstrap().catch(console.error);
