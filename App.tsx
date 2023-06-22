import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import Dashboard from './screens/Dashboard';
import ProductDetail from './screens/ProductDetail';
import Index from './screens/Index';
import Category from './screens/Category';
import CategoryUpdate from './screens/CategoryUpdate';
import CategoryAdd from './screens/CategoryAdd';
import Orders from './screens/Orders';
import { ProductProvider } from './screens/ProductContext';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
  },
};

const Stack = createNativeStackNavigator();

const App = () => {
  const { colors } = useTheme();

  return (
    <NavigationContainer theme={theme}>
      <ProductProvider>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.primary, // Sets header background color here
            },
            headerTintColor: '#ffffff', // Sets header text color here
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen name="Index" component={Index} options={{ title: 'Home' }} />
          <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'Products' }} />
          <Stack.Screen name="Orders" component={Orders} options={{ title: 'Orders' }} />
          <Stack.Screen name="Detail" component={ProductDetail} options={{ title: 'Product Detail' }} />
          <Stack.Screen name="Category" component={Category} />
          <Stack.Screen name="CategoryUpdate" component={CategoryUpdate} />
          <Stack.Screen name="CategoryAdd" component={CategoryAdd} />
        </Stack.Navigator>
      </ProductProvider>
    </NavigationContainer>
  );
};

export default App;
