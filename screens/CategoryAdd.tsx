import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CategoryAddScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { addCallback } = route.params;
  const [categoryName, setCategoryName] = useState('');
  const [categoryDetail, setCategoryDetail] = useState('');
  const { setCategories } = route.params; // Retrieves the setCategories function from the route params


  const handleAddCategory = () => {
    const newCategory = {
      name: categoryName,
      description: categoryDetail,
    };

    axios
      .post('https://northwind.vercel.app/api/categories', newCategory)
      .then(() => {
        setCategories(); // Calls the setCategories function to update the categories immediately
        navigation.goBack(); // Navigates back to the Category page
      })
      .catch(error => {
        console.error('Error adding category:', error);
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
      <TouchableOpacity style={styles.addButton} onPress={handleAddCategory}>
        <Icon name="plus" size={20} color="white" />
        <Text style={styles.buttonText}>Add Category</Text>
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
  addButton: {
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

export default CategoryAddScreen;
