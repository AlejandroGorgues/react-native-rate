import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import theme from '../theme';
import { Route, Routes, Navigate } from 'react-router-native';

// import Text from './Text';
import AppBar from './AppBar';
import SignIn from './SignIn';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackgroundColor
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      {/* <Text>Simple text</Text>
      <Text style={{ paddingBottom: 10 }}>Text with custom style</Text>
      <Text fontWeight="bold" fontSize="subheading">
        Bold subheading
      </Text>
      <Text color="textSecondary">Text with secondary color</Text> */}
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/*" element={<Navigate to="/" replace />} />
        <Route path="/signIn" element={<SignIn />} />
      </Routes>
    </View>
  );
};

export default Main;