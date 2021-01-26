import { IResolvers } from "apollo-server-express";
import { compare, hash } from "bcryptjs";
import { User } from "./entity/User";

export const resolvers: IResolvers = {
  Query: {
    hello() {
      return "hello, world";
    },
  },
  Mutation: {
    async register(_, { email, password }) {
      const user = await User.create({
        email,
        password: await hash(password, 10),
      }).save();
      return { id: user.id, email: user.email };
    },
    async login(_, { email, password }) {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error("User not found.");
      }
      if (!(await compare(password, user.password))) {
        throw new Error("Invalid credentials.");
      }

      return { id: user.id, email: user.email };
    },
  },
};
