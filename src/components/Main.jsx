import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import ReviewCreation from './ReviewCreation';
import theme from '../theme';
import { Route, Routes, Navigate } from 'react-router-native';

// import Text from './Text';
import AppBar from './AppBar';
import SignIn from './SignIn';
import RepositoryDeepItem from './RepositoryDeepItem';
import SignUp from './SignUp';
import Reviews from './Reviews';
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
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />

        <Route path="/users/:userId/reviews" element={<Reviews />} />

        <Route path="/repository/:repositoryId" element={<RepositoryDeepItem />} />
        <Route path="/reviewCreation" element={<ReviewCreation />} />
        <Route path="/" element={<RepositoryList />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;