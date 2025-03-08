import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS, REPOSITORY_DEEP_DETAILS, USER, REVIEW } from './fragments';
export const GET_REPOSITORIES = gql`
  query Repositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String, $first: Int, $after:String){
    repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword, first: $first, after: $after) {
      edges{
        cursor
        node{
          ...RepositoryDetails
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
${REPOSITORY_DETAILS}
`;

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      ...RepositoryDeepDetails
      reviews (first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
${REPOSITORY_DEEP_DETAILS}
`;

export const GET_ME = gql`
  query getCurrentUser($includeReviews: Boolean = false){
    me {
      ...UserDetails
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewDetails
          }
        }
      }
    }
  }
${USER}
${REVIEW}
`;

// other queries...