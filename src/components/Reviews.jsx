import { View, StyleSheet, Pressable, Alert, FlatList } from 'react-native';
import theme from '../theme';
import ReviewTextMetadata from './ReviewTextMetadata';
import Text from './Text';
import alert from '../utils/alert'
import useGetMe from '../hooks/useMe';
import {useDeleteReview} from '../hooks/useReviews'
import { useNavigate } from "react-router";
import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
  text: {
    fontWeight: theme.fontWeights.bold,
  },
  itemView: {
    display:'flex',
    marginTop:10,
    backgroundColor: theme.colors.itemBackgroundColor,
    padding:10,
  },
  pressButtonRedirect:{
    backgroundColor:theme.colors.primary,
    marginTop: 5,
    padding: 5,
    borderRadius: 5,
    alignSelf:'flex-start'
  },
  pressButtonCancel:{
    backgroundColor:theme.colors.primaryError,
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

const deleteReview= ({reviewId, setDeleteReviewId})=>{
  alert('Delete review', 'Are you sure you want to delete this review', [
    {
      text: 'CANCEL',
      style: 'cancel',
    },
    {
      text: 'DELETE', 
      style:'delete', 
      onPress: () => setDeleteReviewId(reviewId)},
  ]);
}

const ItemSeparator = () => <View style={styles.separator} />;
const ReviewItem = ({ review, setRepositoryId, setDeleteReviewId }) => {
  return (
    <>
      <View style={{flexDirection:'row', alignItems:"center"}}>
        <View>
          <Text style={{borderRadius:50, borderWidth:2, padding: 15,borderColor:theme.colors.primary, color:theme.colors.primary}}>{review.rating}</Text>
        </View>
        <ReviewTextMetadata username={review.user.username} createdAt={review.createdAt} text={review.text}/>
      </View>
      <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
        <Pressable style={styles.pressButtonRedirect} onPress={() => setRepositoryId(review.repositoryId)}>
          <Text style={styles.textPressButton}>View repository</Text>
        </Pressable>
        <Pressable style={styles.pressButtonCancel} onPress={()=>deleteReview({reviewId: review.id, setDeleteReviewId})}>
          <Text style={styles.textPressButton}>Delete review</Text>
        </Pressable>
      </View>
    </>
  )
};

const Reviews = () => {
  const navigate = useNavigate()
  const [repositoryId, setRepositoryId] = useState(null)
  const [deleteReviewId, setDeleteReviewId] = useState(null)
  const [deleteReview] = useDeleteReview()
  const {me, loading, error, refetch} = useGetMe({includeReviews:true});
  useEffect(() => {
    if (repositoryId !== null) {
      navigate(`/repository/${repositoryId}`)
    }
  }, [repositoryId]); 

  useEffect(() => {
    if (deleteReviewId !== null) {
      deleteReview({deleteReviewId})
      refetch()
    }
  }, [deleteReviewId]); 

  if (loading) {
    return <Text>loading...</Text>
  }
  return (
      <View style={styles.itemView}>
          <FlatList
            data={me.reviews.edges}
            renderItem={({ item }) => <ReviewItem review={item.node} setRepositoryId={setRepositoryId} setDeleteReviewId={setDeleteReviewId}/>}
            keyExtractor={item  => item.node.id}
            ItemSeparatorComponent={ItemSeparator}
            // ...
          />
      </View>
  );
};

export default Reviews;