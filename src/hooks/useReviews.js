import { useMutation } from "@apollo/client";
import { REVIEW_CREATION, REVIEW_DELETION } from "../graphql/mutations";


export const useReviews = () => {   
    const [mutate, result] = useMutation(REVIEW_CREATION)

    const createReview = async (review) => {
      const { data } = await mutate({variables: {review}})
      return data
    };
    
    return [createReview, result];
  };

export const useDeleteReview = () =>{
  const [mutate, result] = useMutation(REVIEW_DELETION)

  const deleteReview = async ({deleteReviewId}) => {
    await mutate( {variables: {deleteReviewId}})
  };
  
  return [deleteReview, result];
}