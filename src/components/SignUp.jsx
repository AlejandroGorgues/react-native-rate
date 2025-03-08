import { TextInput, Pressable, View } from 'react-native';
import Text from './Text';
import { isString, useFormik } from 'formik';
import { StyleSheet } from 'react-native';
import useSignUp from '../hooks/useSignUp'
import useSignIn from '../hooks/useSignIn'
import * as yup from 'yup';
import { useNavigate } from "react-router";


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
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string().min(5).max(30)
    .required('Username is required'),
  password: yup
    .string().min(5).max(50)
    .required('Password is required'),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirmation is required'),
});

const SignUpForm = ({ onSubmit }) => {
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
      <TextInput
        style={styles.inputs}
        placeholder="Password confirmation"
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange('passwordConfirmation')}
      />
      {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
        <Text style={{ color: theme.colors.formError }}>{formik.errors.passwordConfirmation}</Text>
      )}
      <Pressable style={styles.pressButton} onPress={formik.handleSubmit}>
        <Text style={styles.textPressButton}>Sign In</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate()
  const onSubmit = async values => {
    const user = {
      username: values.username,
      password: values.password
    }
    try {
      const result = await signUp(user);
      if(result){
        const result = await signIn({ username:user.username, password:user.password});
        if(result){
          navigate("/")
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpForm onSubmit={onSubmit} />
};

export default SignUp;