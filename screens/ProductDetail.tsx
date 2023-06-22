import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import axios from 'axios';
import BottomNavigationBar from './BottomNavigationBar';

const ProductDetail = ({ route, navigation }: any) => {
  const { id } = route.params;
  const [detail, setDetail] = useState<any>({});

  useEffect(() => {
    fetchProductDetail();
  }, []);

  const fetchProductDetail = () => {
    axios
      .get(`https://northwind.vercel.app/api/products/${id}`)
      .then((res) => {
        setDetail(res.data);
      })
      .catch((error) => {
        console.error('Error fetching product detail:', error);
      });
  };

  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.row, { borderBottomColor: "lightgray" }]}>
          <Text style={styles.label}>Product Name:</Text>
          <Text style={styles.value}>{detail.name}</Text>
        </View>
        <View style={[styles.row, { borderBottomColor: "lightgray" }]}>
          <Text style={styles.label}>Quantity Per Unit:</Text>
          <Text style={styles.value}>{detail.quantityPerUnit}</Text>
        </View>
        <View style={[styles.row, { borderBottomColor: "lightgray"}]}>
          <Text style={styles.label}>Unit Price:</Text>
          <Text style={styles.value}>{detail.unitPrice}</Text>
        </View>
        <View style={[styles.row, { borderBottomColor: "lightgray" }]}>
          <Text style={styles.label}>Units In Stock:</Text>
          <Text style={styles.value}>{detail.unitsInStock}</Text>
        </View>
        <View style={[styles.row, { borderBottomColor: "lightgray" }]}>
          <Text style={styles.label}>Units On Order:</Text>
          <Text style={styles.value}>{detail.unitsOnOrder}</Text>
        </View>
      </View>
      <BottomNavigationBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    flex: 2,
    fontSize: 16,
  },
});

export default ProductDetail;
