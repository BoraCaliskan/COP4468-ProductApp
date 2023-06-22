import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Title, Paragraph, Provider as PaperProvider } from 'react-native-paper';
import BottomNavigationBar from './BottomNavigationBar';

const Index = ({ navigation }: any) => {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.content}>
          <Title style={styles.title}>Welcome to the Home Page</Title>
          <Paragraph style={styles.paragraph}>This is the content of the Home page.</Paragraph>
          <Button
            mode="contained"
            onPress={() => {
              // Handles button press
            }}
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            Press Me
          </Button>
        </View>
        <BottomNavigationBar navigation={navigation} />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#6200ee',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6200ee',
    marginTop: 20,
    width: 150,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#ffffff',
  },
});

export default Index;
