import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CategoryUpdateScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryId } = route.params;
  const { setCategories } = route.params; // Retrieve the setCategories function from the route params
  const [categoryName, setCategoryName] = useState('');
  const [categoryDetail, setCategoryDetail] = useState('');

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = () => {
    axios
      .get(`https://northwind.vercel.app/api/categories/${categoryId}`)
      .then(res => {
        setCategoryName(res.data.name);
        setCategoryDetail(res.data.description);
      })
      .catch(error => {
        console.error('Error fetching category:', error);
      });
  };

  const handleUpdateCategory = () => {
    const updatedCategory = {
      name: categoryName,
      description: categoryDetail,
    };

    axios
      .put(`https://northwind.vercel.app/api/categories/${categoryId}`, updatedCategory)
      .then(() => {
        setCategories(); // Call the setCategories function to update the categories immediately
        navigation.goBack(); // Navigate back to the Category page
      })
      .catch(error => {
        console.error('Error updating category:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category Name:</Text>
      <TextInput
        style={styles.input}
        value={categoryName}
        onChangeText={text => setCategoryName(text)}
      />
      <Text style={styles.label}>Category Detail:</Text>
      <TextInput
        style={styles.input}
        value={categoryDetail}
        onChangeText={text => setCategoryDetail(text)}
      />
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateCategory}>
        <Icon name="pencil" size={20} color="white" />
        <Text style={styles.buttonText}>Update Category</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  updateButton: {
    backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 5,
  },
});

export default CategoryUpdateScreen;
