import { Image, View, StyleSheet, Text, Pressable } from 'react-native';
import theme from '../theme';
import RepositoryCountItem from './RepositoryCountItem';
import RepositoryTextMetadata from './RepositoryTextMetadata';
import { Route, Routes, Navigate, useNavigate } from 'react-router-native';
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
  }
});

const RepositoryItem = ({item}) => {
  const navigate = useNavigate()
  return (
    <Pressable onPress={()=>navigate(`/repository/${item.id}`)}>
      <View style={styles.itemView}>
          <View style={{flexDirection:'row'}}>
              <Image 
                  style={styles.tinyLogo}
                  source={{uri:item.ownerAvatarUrl,}}
              />
              <RepositoryTextMetadata fullName={item.fullName} description={item.description} language={item.language}/>
          </View>
          <View style={styles.countGeneralView}>
              <RepositoryCountItem text={'Stars'} value={item.stargazersCount}/>
              <RepositoryCountItem text={'Forks'} value={item.forksCount}/>
              <RepositoryCountItem text={'Reviews'} value={item.reviewCount}/>
              <RepositoryCountItem text={'Rating'} value={item.ratingAverage}/>
          </View>
      </View>
    </Pressable>
  );
};

export default RepositoryItem;