import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS } from './fragments';
export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges{
        node{
            ...RepositoryDetails
        }
      }
    }
  }
${REPOSITORY_DETAILS}
`;


export const GET_ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

// other queries...