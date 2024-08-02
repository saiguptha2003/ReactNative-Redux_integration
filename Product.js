import React, { useEffect, useState } from 'react';
import { Text, View, Button, StyleSheet, FlatList, Modal, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity,addToCart} from './features/carts/cartSlice';
import { fetchProducts } from './features/products/productSlice';
function Product() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item)}>
            <View style={styles.product}>
              <Text>{item.title}</Text>
              <Text>${item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {selectedProduct && (
        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Image source={{ uri: selectedProduct.image }} style={styles.productImage} />
            <Text style={styles.modalTitle}>{selectedProduct.title}</Text>
            <Text>{selectedProduct.description}</Text>
            <Text>${selectedProduct.price}</Text>
            <Button title="Add to Cart" onPress={() => { dispatch(addToCart(selectedProduct)); closeModal(); }} />
            <Button title="Close" onPress={closeModal} />
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  product: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  productImage: {
    width: 200,
    height: 200,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  text: {
    fontSize: 24,
    marginVertical: 10,
  },
});

export default Product;
