import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import BottomNavigationBar from './BottomNavigationBar';

interface Category {
  id: number;
  name: string;
  description: string;
}

const Category = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = useCallback(() => {
    axios
      .get('https://northwind.vercel.app/api/categories')
      .then(res => {
        setCategories(res.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []); // Use an empty dependency array to ensure the callback is memoized

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]); // Call fetchCategories when the component mounts and when the fetchCategories function changes

  useFocusEffect(
    useCallback(() => {
      fetchCategories(); // Call fetchCategories when the screen comes into focus
    }, [fetchCategories])
  );

  const handleDeleteCategory = (categoryId: number) => {
    axios
      .delete(`https://northwind.vercel.app/api/categories/${categoryId}`)
      .then(() => {
        fetchCategories();
      })
      .catch(error => {
        console.error('Error deleting category:', error);
      });
  };

  const handleUpdateCategory = (categoryId: number) => {
    navigation.navigate('CategoryUpdate', {
      categoryId,
      setCategories, // Pass the setCategories function to the CategoryUpdate screen
    });
  };

  const handleAddCategory = () => {
    navigation.navigate('CategoryAdd', { setCategories: setCategories }); // Pass setCategories function as a parameter
  };

  const CategoryItem = ({ category }: { category: Category }) => {
    const handleDelete = () => {
      handleDeleteCategory(category.id);
    };

    const handleUpdate = () => {
      handleUpdateCategory(category.id);
    };

    return (
      <View style={styles.categoryItemContainer}>
        <Text style={styles.categoryName}>{category.name}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderCategoryItem = ({ item }: { item: Category }) => {
    return <CategoryItem category={item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.addCategoryButton} onPress={handleAddCategory}>
        <Text style={styles.buttonText}>Add Category</Text>
      </TouchableOpacity>
      <BottomNavigationBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 60
  },
  addCategoryButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  listContainer: {
    flexGrow: 1,
  },
  categoryItemContainer: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: 'lightgray',
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  updateButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  addButton: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
});

export default Category;
