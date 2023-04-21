import {
  StyleSheet,
  View,
  Image,
  FlatList,
  useWindowDimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import products from "../data/products";
import { Ionicons } from "@expo/vector-icons";

const ProductDetailsScreen = () => {
  const product = products[0];
  const { width } = useWindowDimensions();

  const addToCart = () => {
    console.info("Added to cart");
  };

  const goBack = () => {
    console.warn("Going back");
  };

  return (
    <View>
      <Pressable onPress={goBack} style={styles.icon}>
        <Ionicons name="close" size={24} color="white" />
      </Pressable>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={product.images}
          renderItem={({ item }) => (
            <Image
              source={{
                uri: item,
              }}
              style={{
                width: width,
                aspectRatio: 1,
              }}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />

        <View style={{ padding: 20 }}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={addToCart} style={styles.button}>
        <Text style={styles.buttonText}> Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "500",
    marginVertical: 10,
  },
  price: {
    fontWeight: "500",
    fontSize: 16,
    letterSpacing: 1.5,
  },
  description: {
    marginVertical: 10,
    fontSize: 18,
    lineHeight: 30,
    fontWeight: "300",
  },
  button: {
    position: "absolute",
    backgroundColor: "black",
    bottom: 30,
    width: "90%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  icon: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#000000AA",
    opacity: 0.8,
    borderRadius: 50,
    padding: 5,
    zIndex: 100,
  },
});

export default ProductDetailsScreen;
