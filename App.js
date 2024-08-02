import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import store from './store';
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { decrement,increment } from './features/counter/counterSlice';
import Product from './Product';
export default function App() {

  return (
    <Provider store={store}>
      <Product/>
    </Provider>
   
  );
}

