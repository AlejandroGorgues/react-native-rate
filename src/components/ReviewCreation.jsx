import { TextInput, Pressable, View } from 'react-native';
import Text from './Text';
import { isString, useFormik } from 'formik';
import { StyleSheet } from 'react-native';
import {useReviews} from '../hooks/useReviews'
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
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: ''

};

const validationSchema = yup.object().shape({

    repositoryName: yup.string().required().lowercase().trim(),
    ownerName: yup.string().required().lowercase().trim(),
    rating: yup.number().integer().min(0).max(100).required(),
    text: yup.string().max(2000).trim(),
});

const ReviewForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputs}
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={{ color: theme.colors.formError }}>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        style={styles.inputs}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={{ color: theme.colors.formError }}>{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        style={styles.inputs}
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: theme.colors.formError }}>{formik.errors.rating}</Text>
      )}
      <TextInput
        style={styles.inputs}
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
      />
      {formik.touched.text && formik.errors.text && (
        <Text style={{ color: theme.colors.formError }}>{formik.errors.text}</Text>
      )}
      <Pressable style={styles.pressButton} onPress={formik.handleSubmit}>
        <Text style={styles.textPressButton}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const ReviewCreation = () => {
  const [createReview] = useReviews();
  const navigate = useNavigate()
  const onSubmit = async (values) => {
    const review = {
      repositoryName: values.repositoryName,
      ownerName: values.ownerName,
      rating: parseInt(values.rating, 10),
      text: values.text,
    };
    try {
      const result = await createReview(review);
      if(result){
        navigate("/")
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewForm onSubmit={onSubmit} />
};

export default ReviewCreation;