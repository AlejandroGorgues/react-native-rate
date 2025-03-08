import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import theme from '../../theme';
import * as yup from 'yup';
import { isString, useFormik } from 'formik';
import Text from '../../components/Text';
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

describe('SignIn', () => {
    describe('SignInContainer', () => {
      it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
        // render the SignInContainer component, fill the text inputs and press the submit button
        const onSubmit = jest.fn();
        render(<SignInForm onSubmit={onSubmit} />);
        fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle');
        fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
        fireEvent.press(screen.getByText('Sign In'));

        await waitFor(() => {
          // expect the onSubmit function to have been called once and with a correct first argument
          expect(onSubmit).toHaveBeenCalledTimes(1);
          expect(onSubmit.mock.calls[0][0]).toEqual({
            username: 'kalle',
            password: 'password',
          });
        });
      });
    });
  });