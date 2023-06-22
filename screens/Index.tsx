import { View, StyleSheet } from 'react-native';
import React from 'react';
import BottomNavigationBar from './BottomNavigationBar';

const Index = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <BottomNavigationBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Index;
