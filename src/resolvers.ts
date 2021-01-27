import { IResolvers } from "apollo-server-express";
import { compare, hash } from "bcryptjs";
import { User } from "./entity/User";

export const resolvers: IResolvers = {
  Query: {
    async me(_, __, { req }) {
      const { userId } = req.session;
      if (!userId) {
        return null;
      }
      const user = await User.findOne(userId);
      if (!user) return null;

      return { id: user.id, email: user.email };
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
    async login(_, { email, password }, { req }) {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error("User not found.");
      }
      if (!(await compare(password, user.password))) {
        throw new Error("Invalid credentials.");
      }

      req.session.userId = user.id;
      return { id: user.id, email: user.email };
    },
  },
};
