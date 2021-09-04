import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from './src/header';

const App = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View>
        <Text>Hello world!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
