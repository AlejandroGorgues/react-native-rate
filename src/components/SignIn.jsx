import { TextInput, Pressable, View } from 'react-native';
import Text from './Text';
import { isString, useFormik } from 'formik';
import { StyleSheet } from 'react-native';
import * as yup from 'yup';

import theme from '../theme';
const styles = StyleSheet.create({
  container:{
    padding:10,
    backgroundColor:theme.colors.itemBackgroundColor,
    alignSelf: 'stretch'
  },
  inputs:{
    borderColor: "black",
    borderWidth:1,
    marginTop: 5,
    padding: 5,
    borderRadius: 5
  },
  pressButton:{
    backgroundColor:theme.colors.primary,
    marginTop: 5,
    padding: 5,
    borderRadius: 5
  },
  textPressButton: {
    textAlign: "center",
    color: theme.colors.languageTextPrimary
  }
})

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputs}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: theme.colors.formError }}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={styles.inputs}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: theme.colors.formError }}>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.pressButton} onPress={formik.handleSubmit}>
        <Text style={styles.textPressButton}>Sign In</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = values => {
    const username = values.username
    const password = values.password
    if (isString(username) && isString(password)) {
      console.log(`Sign in: ${username} ${password}`);
    }
  };

  return <SignInForm onSubmit={onSubmit} />
};

export default SignIn;