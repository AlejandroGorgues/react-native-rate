import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';


const useGetMe = ({includeReviews}) => {
    const { data, loading, error, refetch } = useQuery(GET_ME, {variables:{includeReviews}})

    return { me: data?.me ?? null, // Si no hay datos, devuelve un array vacío
      loading,
      error,
      refetch };
  };

export default useGetMe