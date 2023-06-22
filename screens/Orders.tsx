import React, { useContext } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomNavigationBar from './BottomNavigationBar';
import ProductContext from './ProductContext';

const Orders = ({ navigation }: any) => {
  const { selectedProducts, removeSelectedProduct } = useContext(ProductContext);
  const { colors } = useTheme();

  const handleDeleteProduct = (id: number) => {
    removeSelectedProduct(id);
  };

  const renderProductItem = ({ item }: any) => {
    return (
      <View style={[styles.orderItem, { borderBottomColor: "lightgray" }]}>
        <Text style={styles.productName}>{item.name}</Text>
        <Pressable
          style={styles.deleteButton}
          onPress={() => handleDeleteProduct(item.id)}
        >
          <Icon name="trash" size={20} color="white" />
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={selectedProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products in orders</Text>
          </View>
        )}
      />
      <BottomNavigationBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  orderItem: {
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
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
  },
});

export default Orders;
