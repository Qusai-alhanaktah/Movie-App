import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from './src/header';
import Home from './src/home';

const App = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Home />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
