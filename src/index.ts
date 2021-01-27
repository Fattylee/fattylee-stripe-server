import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import session from "express-session";

import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const bootstrap = async () => {
  const app = express();

  app.use(
    session({
      secret: "xwhuhsuhush",
      resave: false,
      saveUninitialized: false,
    })
  );

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
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
  // console.log(await conn.manager.find(User));
};
bootstrap().catch(console.error);
