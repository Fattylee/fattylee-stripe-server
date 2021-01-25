"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
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
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    const apolloServer = new apollo_server_express_1.ApolloServer({ typeDefs, resolvers });
    apolloServer.applyMiddleware({ app });
    const port = 4000;
    app.listen(port, () => {
        console.log("Server is up and running", port);
        console.log("GraphQL Server is up and running", port + apolloServer.graphqlPath);
    });
    const conn = yield typeorm_1.createConnection();
    console.log(yield conn.manager.find(User_1.User));
});
bootstrap().catch(console.error);
//# sourceMappingURL=index.js.map