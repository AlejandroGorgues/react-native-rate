import { gql } from '@apollo/client';
import { USER } from './fragments';

export const SIGN_IN = gql`
mutation authenticate($username:String!, $password:String!){
  authenticate(credentials: { username: $username, password: $password }) {
    accessToken
  }
}
`;

export const SIGN_UP = gql`
mutation {
  createUser(user: { username: $username, password: $password }) {
    id
    username
  }
}
${USER}
`;