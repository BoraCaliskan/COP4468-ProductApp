import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import axios from 'axios';
import BottomNavigationBar from './BottomNavigationBar';
import ProductContext from './ProductContext';

const Dashboard = ({ navigation }: any) => {
  const { addToSelectedProducts } = useContext(ProductContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get('https://northwind.vercel.app/api/products')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  };

  const handleDeleteProduct = (id: number) => {
    axios
      .delete(`https://northwind.vercel.app/api/products/${id}`)
      .then(() => {
        fetchProducts();
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  const navigateToProductDetail = (id: number) => {
    navigation.navigate('Detail', { id });
  };

  const addToOrders = (product: any) => {
    addToSelectedProducts(product);
  };

  const renderProductItem = ({ item }: any) => {
    return (
      <View style={styles.productItem}>
        <Pressable onPress={() => navigateToProductDetail(item.id)}>
          <Text style={styles.productName}>{item.name}</Text>
        </Pressable>
        <View style={styles.buttonsContainer}>
          <Pressable style={styles.addButton} onPress={() => addToOrders(item)}>
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
          <Pressable
            style={styles.deleteButton}
            onPress={() => handleDeleteProduct(item.id)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <BottomNavigationBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  productName: {
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: 'green',
    padding: 5,
    marginRight: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Dashboard;
