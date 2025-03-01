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
  languageItem:{
    backgroundColor:theme.colors.primary,
    color: theme.colors.languageTextPrimary,
    marginTop:5,
    padding:5,
    borderRadius:5,
    alignSelf:'flex-start'
  },
  descriptionItem:{
    marginTop: 5
  }
});

const RepositoryTextMetadata = ({fullName, description, language}) => {
    return (
        <View style={styles.metadataView}>
            <Text style={styles.text}>{fullName}</Text>
            <Text style={styles.descriptionItem}>{description}</Text>
            <Text style={styles.languageItem}>{language}</Text>
        </View>
    );
};

export default RepositoryTextMetadata;