import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook($authors: [String!], $bookID: ID!, $title: String!, $description: String, $image: String, $link: String) {
    addBook($authors: [String!], $bookID: String!, $title: String!, $description: String, $image: String, $link: String) {
      user {
        _id
        savedBooks
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation addBook($bookID: ID!) {
    removeBook($bookID: String!) {
      user {
        _id
        savedBooks
      }
    }
  }
`;
