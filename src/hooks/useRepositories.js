import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES, GET_REPOSITORY } from '../graphql/queries';


export const useRepositories = (variables) => {
  const { data, loading, fetchMore, error, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables
  });
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };


  return { repositories: data?.repositories ?? [], // Si no hay datos, devuelve un array vacío
    loading,
    error,
    fetchMore: handleFetchMore,
    ...result };
};

export const useRepository = (variables) => {
  const { data, loading, fetchMore, error, ...result } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables,
    skip: !variables.repositoryId, // Evita ejecutar la query si no hay ID
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };
  
  return { repository: data?.repository ?? null, // Si no hay datos, devuelve null
    loading,
    error, 
    fetchMore: handleFetchMore,
    ...result };
};