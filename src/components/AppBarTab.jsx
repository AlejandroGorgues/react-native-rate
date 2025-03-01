import { StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  text:{
    color: theme.tabColors.textPrimary,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10
  },
});

const AppBarTab = ({text}) => {
  return <Text style={styles.text}>{text}</Text>
};

export default AppBarTab;