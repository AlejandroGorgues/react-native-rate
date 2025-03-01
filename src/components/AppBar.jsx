import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { Link } from 'react-router-native';
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.tabColors.backgroundColor,
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent:'space-between',
  }
});

const AppBar = () => {
  return (
  <View style={styles.container}>
    {/* With contentContainerStyle flexGrow 1 when view is flex, prevents from doing unwanted behaviour */}
    <ScrollView horizontal contentContainerStyle={{ flexGrow: 1 }}>
      <Link to="/">
        <AppBarTab text={"Repositories"}/>
      </Link>
      <Link to="/signIn">
        <AppBarTab text={"Sign In"}/>
      </Link>
    </ScrollView>
  </View>
    )
};

export default AppBar;