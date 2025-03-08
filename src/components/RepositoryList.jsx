import { FlatList, View, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import RepositoryItem from './RepositoryItem';
import {useRepositories} from '../hooks/useRepositories';
import Text from './Text';
import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native-web';
import { useDebounce } from 'use-debounce';
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  inputs:{
    borderColor: "black",
    borderWidth:1,
    marginTop: 5,
    padding: 5,
    borderRadius: 5
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = (selectedOrder, setSelectedOrder) => <Picker
style={{padding:10}}
selectedValue={selectedOrder}
onValueChange={(itemValue, itemIndex) =>
  setSelectedOrder(itemValue)
}>
  <Picker.Item label="Latest Repositories" value="lr" />
  <Picker.Item label="Highest rated repositories" value="hrr" />
  <Picker.Item label="Lowest rated repositories" value="lrr" />
</Picker>

export class RepositoryListContainer extends React.Component {
  constructor(props){
    super(props)
  }
  renderHeader = () => {
    return (
      <RepositoryListHeader
        selectedOrder={this.props.selectedOrder}
        setSelectedOrder={this.props.setSelectedOrder}
      />
    );
  };

  render() {
    return (
        <FlatList
          data={this.props.repositories.edges}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({item}) => <RepositoryItem item={item.node} />}
          keyExtractor={item => item.node.id}
          ListHeaderComponent={this.renderHeader}
          onEndReached={this.onEndReach}
          onEndReachedThreshold={0.5}
        />
    );
  }
}

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState("lr");
  const [searchKeyword, setSearchKeyword] = useState('');
  const [valueSearchKeyword] = useDebounce(searchKeyword, 500);
  const orderOptions = {
    lr: { orderBy: "CREATED_AT", orderDirection: "DESC" },
    hrr: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" },
    lrr: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
  };

  const repositoryNodes = useRepositories({
    orderBy: orderOptions[selectedOrder]?.orderBy,
    orderDirection: orderOptions[selectedOrder]?.orderDirection,
    searchKeyword: valueSearchKeyword,
    first: 2,
  });


  const onEndReach = () => {
    repositoryNodes.fetchMore;
  };
  if (repositoryNodes?.loading ||repositoryNodes=== null ) {
    return <View>
      <TextInput
        style={styles.inputs}
        placeholder="Repository"
        value={searchKeyword}
        onChangeText={keyword => setSearchKeyword(keyword)}
        />
      <Text>loading...</Text>
    </View>
  }
  return (
  <View>
    <TextInput
      style={styles.inputs}
      placeholder="Repository"
      value={searchKeyword}
      onChangeText={keyword => setSearchKeyword(keyword)}
    />
    <RepositoryListContainer  style={{ flex: 1, height: 400, overflow: 'auto' }}
      repositories={repositoryNodes.repositories}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      onEndReach={onEndReach}
    />
  </View>
  )
};
export default RepositoryList;