import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
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

  const { colors } = useTheme();

  const renderProductItem = ({ item }: any) => {
    return (
      <View style={[styles.productItem, { borderBottomColor: colors.lightgray }]}>
        <Pressable onPress={() => navigateToProductDetail(item.id)}>
          <Text style={styles.productName}>{item.name}</Text>
        </Pressable>
        <View style={styles.buttonsContainer}>
          <Pressable
            style={[styles.button, styles.addButton]}
            onPress={() => addToOrders(item)}
          >
            <Icon name="plus" size={20} color="white" />
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.deleteButton]}
            onPress={() => handleDeleteProduct(item.id)}
          >
            <Icon name="trash" size={20} color="white" />
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
  },
  productName: {
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: 'blue',
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    fontWeight: 'bold',
    marginLeft: 5,
    color: 'white',
  },
});

export default Dashboard;
