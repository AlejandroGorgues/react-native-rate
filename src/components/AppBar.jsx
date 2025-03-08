import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { Link } from 'react-router-native';
import useGetMe from '../hooks/useMe';
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
  const {me, loading, error} = useGetMe({includeReviews:false});
  return (
    <View style={styles.container}>
      {/* With contentContainerStyle flexGrow 1 when view is flex, prevents from doing unwanted behaviour */}
      <ScrollView horizontal contentContainerStyle={{ flexGrow: 1 }}>
        <Link to="/repositories">
          <AppBarTab text={"Repositories"}/>
        </Link>
        {(me !== null ) ?
            <AppBarTab text={"Sign Out"}/>
          :
          <Link to="/signIn">
            <AppBarTab text={"Sign In"}/>
          </Link> 
        }
        {me === null &&
          <Link to="/signUp">
            <AppBarTab text={"Sign Up"}/>
          </Link> 
        }
        <Link to="/reviewCreation">
          <AppBarTab text={"Create a review"}/>
        </Link>
        {me !== null &&
          <Link to={`/users/${me.id}/reviews`}>
            <AppBarTab text={"My reviews"} />
          </Link>
        }
      </ScrollView>
    </View>
  )
};

export default AppBar;