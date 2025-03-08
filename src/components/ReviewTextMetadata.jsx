import { View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';
const styles = StyleSheet.create({
  text: {
    fontWeight: theme.fontWeights.bold,
  },
  metadataView: {
    flexDirection: 'column',
    paddingTop: 5,
    paddingLeft:20,
    paddingBottom:5,
  },
  textItem:{
    marginTop:5,
    padding:5,
    borderRadius:5,
    alignSelf:'flex-start'
  },
  descriptionItem:{
    marginTop: 5
  }
});

const ReviewTextMetadata = ({username, createdAt, text}) => {
    return (
        <View style={styles.metadataView}>
            <Text style={styles.text}>{username}</Text>
            <Text style={styles.descriptionItem}>{createdAt}</Text>
            <Text style={styles.textItem}>{text}</Text>
        </View>
    );
};

export default ReviewTextMetadata;