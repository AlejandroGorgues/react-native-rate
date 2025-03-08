import { gql } from '@apollo/client';
import { USER, REVIEW } from './fragments';

export const SIGN_IN = gql`
mutation authenticate($username:String!, $password:String!){
  authenticate(credentials: { username: $username, password: $password }) {
    accessToken
  }
}
`;

export const SIGN_UP = gql`
mutation CreateUser($user: CreateUserInput){
  createUser(user: $user) {
    ...UserDetails
  }
}
${USER}
`;

export const REVIEW_CREATION = gql`
mutation CreateReview( $review: CreateReviewInput!) {
  createReview(review: $review) {
    ...ReviewDetails
  }
}
${REVIEW}
`;

export const REVIEW_DELETION = gql`
mutation DeleteReview($deleteReviewId: ID!) {
  deleteReview(id: $deleteReviewId)
}
`;