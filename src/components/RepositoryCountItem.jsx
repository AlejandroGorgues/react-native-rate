import { View, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './Text';
const styles = StyleSheet.create({
  text: {
    fontWeight: theme.fontWeights.bold,
  },
  countView: {
    flexDirection: 'column',
    paddingLeft: 10
  }
});

const RepositoryCountItem = ({text, value}) => {
    const formatNumber = (num) => {
        return num >= 1000 ? (num / 1000).toFixed(0) + "k" : num;
    };

    return (
        <View style={styles.countView}>
            <Text style={styles.text}>{formatNumber(value)}</Text>
            <Text >{text}</Text>
        </View>
    );
};

export default RepositoryCountItem;