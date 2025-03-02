import { StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';
import useSignOut from '../hooks/useSignOut'
import { useNavigate } from "react-router";

const styles = StyleSheet.create({
  text:{
    color: theme.tabColors.textPrimary,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10
  },
});

const AppBarTab = ({text}) => {
  const [signOut] = useSignOut();
  const navigate = useNavigate()
  const signOutEvent = ()=>{
    signOut()
    navigate("/signIn")
  }
  return <Text onPress={text === "Sign Out" ? signOutEvent : null} style={styles.text}>{text}</Text>
};

export default AppBarTab;