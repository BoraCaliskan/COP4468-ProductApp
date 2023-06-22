import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BottomNavigationBar = ({ navigation }) => {
  const goToDashboard = () => {
    navigation.navigate('Dashboard');
  };

  const goToCategory = () => {
    navigation.navigate('Category');
  };

  const goToOrders = () => {
    navigation.navigate('Orders');
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={goToDashboard} style={styles.button}>
        <Icon name="archive" size={20} color="black" />
        <Text style={styles.buttonText}>Products</Text>
      </Pressable>
      <Pressable onPress={goToCategory} style={styles.button}>
        <Icon name="list-alt" size={20} color="black" />
        <Text style={styles.buttonText}>Categories</Text>
      </Pressable>
      <Pressable onPress={goToOrders} style={styles.button}>
        <Icon name="shopping-cart" size={20} color="black" />
        <Text style={styles.buttonText}>Orders</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    marginTop: 5,
    fontSize: 12,
  },
});

export default BottomNavigationBar;
