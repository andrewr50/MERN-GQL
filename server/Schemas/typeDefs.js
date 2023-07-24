const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addBook(
      authors: [String!]
      bookID: String!
      title: String!
      description: String
      image: String
      link: String
    ): Book

    removeBook(bookId: ID!): User

    type User {
      _id: ID
      username: String
      email: String
      password: String
      savedBooks: [Book]
    }  

    type Book {
      bookId: ID
      authors: [String]
      description: String
      title: String
      image: String
      link: String
    }
  
    type Auth {
      token: String
      user: User
    }
  }
`;