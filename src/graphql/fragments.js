import { gql } from '@apollo/client';

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    id
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    ownerAvatarUrl
  }
`;

export const PAGE = gql`
fragment PageInfo on PageInfo {
  endCursor
  hasNextPage
  hasPreviousPage
  startCursor
}
`;

export const REPOSITORY_DEEP_DETAILS = gql`
  fragment RepositoryDeepDetails on Repository {
    id
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    ownerAvatarUrl
  }
`;


export const USER = gql`
  fragment UserDetails on User {
    id
    username
  }
`;

export const REVIEW = gql`
  fragment ReviewDetails on Review {
    createdAt
    id
    rating
    text
    userId
    repositoryId
    user {
      id
      username
    }
  }
`;