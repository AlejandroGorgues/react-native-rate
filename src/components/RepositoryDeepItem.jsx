import { Image, View, StyleSheet, Pressable, Linking, FlatList } from 'react-native';
import theme from '../theme';
import RepositoryCountItem from './RepositoryCountItem';
import ReviewTextMetadata from './ReviewTextMetadata';
import RepositoryTextMetadata from './RepositoryTextMetadata';
import { useRepository } from '../hooks/useRepositories';
import { useParams } from 'react-router-native';
import Text from './Text';
const styles = StyleSheet.create({
  text: {
    fontWeight: theme.fontWeights.bold,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius:10
  },
  itemView: {
    display:'flex',
    marginTop:10,
    backgroundColor: theme.colors.itemBackgroundColor,
    padding:10,
  },
  countGeneralView: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft:10,
    paddingBottom:10,
  },
  pressButton:{
    backgroundColor:theme.colors.primary,
    marginTop: 5,
    padding: 5,
    borderRadius: 5,
    alignSelf:'flex-start'
  },
  textPressButton: {
    textAlign: "center",
    color: theme.colors.languageTextPrimary
  },
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;
const RepositoryInfo = ({ repository }) => {
  return (
  <>
    <View style={{flexDirection:'row'}}>
        <Image 
            style={styles.tinyLogo}
            source={{uri:repository.ownerAvatarUrl,}}
        />
        <RepositoryTextMetadata fullName={repository.fullName} description={repository.description} language={repository.language}/>
    </View>
    <View style={styles.countGeneralView}>
      <RepositoryCountItem text={'Stars'} value={repository.stargazersCount}/>
      <RepositoryCountItem text={'Forks'} value={repository.forksCount}/>
      <RepositoryCountItem text={'Reviews'} value={repository.reviewCount}/>
      <RepositoryCountItem text={'Rating'} value={repository.ratingAverage}/>
    </View>
    <View style={{flexDirection:'row', justifyContent:"center"}}>
      <Pressable style={styles.pressButton} onPress={()=>Linking.openURL(repository.url)}>
        <Text style={styles.textPressButton}>Open in Github</Text>
      </Pressable>
    </View>
  </>
  )
};
const ReviewItem = ({ review }) => {
  return (
    <>
      <View style={{flexDirection:'row', alignItems:"center"}}>
        <View>
          <Text style={{borderRadius:50, borderWidth:2, padding: 15,borderColor:theme.colors.primary, color:theme.colors.primary}}>{review.rating}</Text>
        </View>
        <ReviewTextMetadata username={review.user.username} createdAt={review.createdAt} text={review.text}/>
      </View>
    </>
  )
};

const RepositoryDeepItem = () => {
  const { repositoryId } = useParams();
  const repositoryNode = useRepository({repositoryId, first:2});
  const onEndReach = () => {
    repositoryNode.fetchMore;
  };

  if (repositoryNode.loading) {
    return <Text>loading...</Text>
  }
  return (
      <View style={styles.itemView}>
          <FlatList
            data={repositoryNode.repository.reviews.edges}
            renderItem={({ item }) => <ReviewItem review={item.node} />}
            keyExtractor={item  => item.node.id}
            ItemSeparatorComponent={ItemSeparator}
            ListHeaderComponent={() => <RepositoryInfo repository={repositoryNode.repository} />}
            onEndReach={onEndReach}
            onEndReachedThreshold={0.5}
          />
      </View>
  );
};

export default RepositoryDeepItem;