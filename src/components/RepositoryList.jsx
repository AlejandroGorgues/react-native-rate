import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useState, useEffect } from 'react';
import useRepositories from '../hooks/useRepositories';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const RepositoryList = () => {

  const repositoryNodes = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    // Other options
  });
  // Get the nodes from the edges array
  // const repositoryNodes = repositories
  //   ? repositories.edges.map(edge => edge.node)
  //   : [];
  if (repositoryNodes.loading) {
    return <div>loading...</div>
  }

  return (
    <FlatList
      data={repositoryNodes.data.repositories.edges}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => <RepositoryItem item={item.node} />}
      keyExtractor={item => item.node.id}
      // other props
    />
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

export default RepositoryList;