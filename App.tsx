import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from './screens/Dashboard';
import ProductDetail from './screens/ProductDetail';
import Index from './screens/Index';
import Category from './screens/Category';
import CategoryUpdate from './screens/CategoryUpdate';
import CategoryAdd from './screens/CategoryAdd';
import Orders from './screens/Orders';
import { ProductProvider } from './screens/ProductContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <ProductProvider>
      <Stack.Navigator>
      <Stack.Screen name="Index" component={Index} options={{ title: 'Home' }}/>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'Products' }}/>
        <Stack.Screen name="Orders" component={Orders} options={{ title: 'Orders' }}/>
        <Stack.Screen name="Detail" component={ProductDetail} options={{ title: 'Product Detail' }}/>
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="CategoryUpdate" component={CategoryUpdate} />
        <Stack.Screen name="CategoryAdd" component={CategoryAdd} />

      </Stack.Navigator>
      </ProductProvider>
      
    </NavigationContainer>
  )
}

export default App