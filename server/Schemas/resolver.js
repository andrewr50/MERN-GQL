const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../Schemas');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, { username }) => {
      return User.findOne({ username });
    }
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email');
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError('Incorrect password');
      }

      const token = signToken(user);

      return { User, Token };
    },
    addBook: async (parent, { user, body }) => {
      return findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: body } },
        { 
          new: true, 
          runValidators: true 
        }
      );
    },
    removeBook: async (parent, { user, params }) => {
      return User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId: params.bookId } } },
        { new: true }
      );

    },
  }
}

module.exports = resolvers;
